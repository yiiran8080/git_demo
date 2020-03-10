import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {request} from '../../assets/js/utils/request'
import fetch from 'whatwg-fetch'//兼容IE浏览器
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Index extends React.Component {
    constructor() {
        super();
        this.state={
            username:"",
            password:""
        }
    };
    componentDidMount() {
    // 获取页面是从哪里跳转来的
        //console.log(this.props);
        // if(this.props.location.state){
        //     console.log(this.props.location.state.from.pathname);
        // }
    };

    doLogin(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                request("http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f","post",{"cellphone":values.username,"password":values.password}).then(res=>{
                    if (res.code === 200) {
                        //登录后，将用户名存入redux的store中
                        this.props.dispatch({type: "LOGIN", data: {username: values.username, isLogin: true}});
                        //localStorage也需要存储，在userReducer中进行
                        this.props.history.go(-1);
                    } else {
                        alert(res.data);
                    }
                });
            }
        });

        // if (this.state.username.match(/^\s*$/)) {
        //     alert("用户名不能为空");
        //     return
        // }
        // if (this.state.password.match(/^\s*$/)) {
        //     alert("密码不能为空");
        //     return
        // }

        //对接接口，后台接收x-www-form-urlencoded模式的参数，不是raw模式
        // let params = new URLSearchParams();
        // params.append("cellphone", this.state.username);
        // params.append("password", this.state.password);
        // axios.post("http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f", params).then((res) => {
        //     if (res.data.code === 200) {
        //         //登录后，将用户名存入redux的store中
        //         this.props.dispatch({type: "LOGIN", data: {username: this.state.username, isLogin: true}});
        //         //localStorage也需要存储，在userReducer中进行
        //         this.props.history.go(-1);
        //     } else {
        //         alert(res.data.data);
        //     }
        // });

        //fetch--post
        // fetch("http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f",{
        //     method:"post",
        //     headers:{
        //         'Content-Type':"application/x-www-form-urlencoded"
        //     },
        //     body:"cellphone="+this.state.username+"&password="+this.state.password
        // }).then(res=>res.json()).then(res=>{
        //
        //     if (res.code === 200) {
        //         this.props.dispatch({type: "LOGIN", data: {username: this.state.username, isLogin: true}});
        //         //localStorage也需要存储，在userReducer中进行
        //         this.props.history.go(-1);
        //     } else {
        //         alert(res.data);
        //     }
        // })
    };

    render() {
        //双向绑定不再需要 onChange={(e)=>{this.setState({password:e.target.value})}}
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.doLogin.bind(this)}>
                    <div style={{width:"250px"}}>
                    <Form.Item>
                        {/*高阶函数，（rules）（input）两个参数*/}
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(<Input type="text" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入用户名"/>)}
                    </Form.Item>

                    </div>
                    <div style={{width:"250px"}}>
                        <Form.Item>
                            {/*高阶函数，（rules）（input）两个参数*/}
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(<Input type="text" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入密码"/>)}
                        </Form.Item>
                    </div>
                <button type="submit">登录</button>
                </Form>

            </div>
        )
    }
}
//创建表单，高阶函数，传入自己写的登录组件
const WrappedNormalLoginForm = Form.create({ name: 'login' })(Index);

export default connect()(WrappedNormalLoginForm);