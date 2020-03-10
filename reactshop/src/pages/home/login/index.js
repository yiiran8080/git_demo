import React from 'react';
import HeaderComponent from "../../../components/header/subheader";
import Css from "../../../assets/css/home/register/index.css"
import { Switch,Toast } from 'antd-mobile';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/utils/request";
import {connect} from 'react-redux';
import action from "../../../actions";

class LoginIndex extends React.Component {
    constructor() {
        super();
        this.state={
            checked:false,
            sCellphone:'',
            sPassword:'',
            sPwtype:"password"
        };

    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        };
    };

    //登录提交数据
    submitData(){
        if(this.state.sCellphone.match(/^\s*$/)){
            Toast.info("请输入手机号",2);
            return false;
        }
        if(this.state.sPassword.match(/^\s*$/)){
            Toast.info("请输入密码",2);
            return false;
        }
        //登录
        let sUrl=config.baseURL+"/api/home/user/pwdlogin?token="+config.token;
        request(sUrl,"post",{cellphone: this.state.sCellphone, password:this.state.sPassword}).then(res=>{
            if(res.code===200){
                localStorage['uid']=res.data.uid;
                localStorage['nickname']=res.data.nickname;
                localStorage['authToken']=res.data.auth_token;
                localStorage['isLogin']=true;
                this.props.dispatch(action.user.login({uid:res.data.uid,nickname:res.data.nickname,authToken:res.data.auth_token,isLogin:true}));
                this.props.history.goBack();
            }else{
                Toast.info(res.data,2);
            }
        })
    };
    //显示密码明码/暗码
    changePwd(checked){
        this.setState({checked:checked});
        if(checked){
            this.setState({sPwtype:"text"});
        }else{
            this.setState({sPwtype:"password"});
        }

    };
    //跳转注册页面
    pushPage(url){
        this.props.history.push(config.path+url);
    }
    render() {
        return (
            <div className={Css['page']}>
                <HeaderComponent title="会员登录"></HeaderComponent>
                <div className={Css["main"]}>

                    <div className={Css["code-wrap"]}><input type="text" placeholder="请输入手机号"
                                                             onChange={(e)=>{this.setState({sCellphone:e.target.value})}}/></div>
                    <div className={Css["password-wrap"]}>
                        <div className={Css["password"]}><input type={this.state.sPwtype} placeholder="请输入密码"
                                                                onChange={(e)=>{this.setState({sPassword:e.target.value})}}/></div>
                        <div className={Css["switch-wrap"]}>
                            <Switch color="#eb1625" checked={this.state.checked} onClick={this.changePwd.bind(this,!this.state.checked)}></Switch>
                        </div>
                    </div>
                    <div className={Css["sure-btn"]} onClick={this.submitData.bind(this)}>登录</div>
                    <div className={Css['fastreg-wrap']}>
                        <div><img src={require("../../../assets/images/home/index/forget.png")}/>忘记密码</div>
                        <div onClick={this.pushPage.bind(this,"reg/index")}><img src={require("../../../assets/images/home/index/reg.png")}/>快速注册</div>
                    </div>
                </div>

            </div>
        )
    }
}
export default connect((state)=>{
    return {state:state}
})(LoginIndex);