import React from 'react';
import HeaderComponent from "../../../components/header/subheader";
import Css from "../../../assets/css/home/register/index.css"
import { Switch,Toast } from 'antd-mobile';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/utils/request";

class RegIndex extends React.Component {
    constructor() {
        super();
        this.state={
            checked:false,
            sCellphone:'',
            bCodeSuccess:false,//验证手机号格式是否正确
            sCodeText:'获取短信验证码',
            sCode:'',//短信验证码
            sPassword:'',
            sPwtype:"password"
        };
        this.timer=null;
        this.bSendCode=true;//限制点击获取验证码
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        };
        clearInterval(this.timer);
    };
    //验证手机号,将手机号提交到数据库
    checkCellphone(e){
        //已经点击获取验证码之后，不允许修改手机号
        if(this.bSendCode){
            this.setState({sCellphone:e.target.value},()=>{
                if(this.state.sCellphone.match(/^1[0-9][0-9]{9}/)){
                    this.setState({bCodeSuccess:true});
                }else{this.setState({bCodeSuccess:false})}
            });
        }
    };
    //点击获取验证码
    getCode(){
        if(this.bSendCode&&this.state.bCodeSuccess){
            this.bSendCode=false;
            let iTime=10;
            this.setState({sCodeText:"重新发送（"+iTime+"s)",bCodeSuccess:false});
            this.timer=setInterval(()=>{
                if(iTime>0){
                    iTime--;
                    this.setState({sCodeText:"重新发送（"+iTime+"s)"})
                }else {
                    clearInterval(this.timer);
                    this.bSendCode=true;
                    this.setState({sCodeText:"获取验证码"});
                    this.setState({bCodeSuccess:true});

                }
            },1000)
        }

    };
    //注册提交数据
    submitData(){
      if(this.state.sCellphone.match(/^\s*$/)){
          Toast.info("请输入手机号",2);
          return false;
      }
      if(!this.state.sCellphone.match(/^1[0-9][0-9]{9}/)) {
          Toast.info("手机号格式不正确", 2);
          return false;
      }
        if(this.state.sCode.match(/^\s*$/)){
            Toast.info("请输入验证码",2);
            return false;
        }
        if(this.state.sPassword.match(/^\s*$/)){
            Toast.info("请输入密码",2);
            return false;
        }
        //验证成功，注册
        let sUrl=config.baseURL+"/api/home/user/reg?token="+config.token;
        request(sUrl,"post",{vcode:this.state.sCode,cellphone: this.state.sCellphone,
            password:this.state.sPassword}).then(res=>{
                if(res.code===200){
                    this.props.history.goBack();
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
    render() {
        return (
            <div className={Css['page']}>
                <HeaderComponent title="会员注册"></HeaderComponent>
                <div className={Css["main"]}>
                    <div className={Css["cellphone-wrap"]}>
                        <div className={Css["cellphone"]}><input type="tel" placeholder="请输入手机号"
                            onChange={(e)=>{this.checkCellphone(e)}}/></div>
                        <div className={this.state.bCodeSuccess?Css["code-btn"]+" "+Css['success']:Css["code-btn"]}
                        onClick={this.getCode.bind(this)}>{this.state.sCodeText}</div>
                    </div>
                    <div className={Css["code-wrap"]}><input type="text" placeholder="请输入验证码"
                             onChange={(e)=>{this.setState({sCode:e.target.value})}}/></div>
                    <div className={Css["password-wrap"]}>
                        <div className={Css["password"]}><input type={this.state.sPwtype} placeholder="请输入密码"
                             onChange={(e)=>{this.setState({sPassword:e.target.value})}}/></div>
                        <div className={Css["switch-wrap"]}>
                            <Switch checked={this.state.checked} onClick={this.changePwd.bind(this,!this.state.checked)}></Switch>
                        </div>
                    </div>
                    <div className={Css["sure-btn"]} onClick={this.submitData.bind(this)}>注册</div>
                </div>

            </div>
        )
    }
}

export default RegIndex;