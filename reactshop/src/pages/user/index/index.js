import React from 'react';
import {connect} from 'react-redux';
import action from "../../../actions";
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import {safeAuth} from "../../../assets/js/utils/util";
import {Upload,Icon} from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class UserIndex extends React.Component {
    
    constructor(props) {
        super(props);
        //单点登录
        safeAuth(props);

        this.state={
            imgSrc:"",
            percentVal:0,
            loading:false
        };
        //console.log(props);
        // if(!localStorage["isLogin"]){
        //     this.props.history.replace("/login");
        //}
    };
    goPage(url){
        this.props.history.push(config.path+url);
    };
    goBack(){
        this.props.history.goBack();
    }
    outLogin(){
        //使用安全退出接口,每次authtoken都变化
        let sUrl=config.baseURL+"/api/home/user/safeout?token="+config.token;
        request(sUrl,"post",{uid:this.props.state.user.uid}).then(res=>{
            if(res.code===200){
                //将退出功能封装到redux中，以供多处使用
                this.props.dispatch(action.user.outLogin());
                this.props.history.replace(config.path+"login/index");
            }
        });

    };
    //上传头像
    uploadHead(e) {
        //获取图片信息
        //this.refs["head-file"].files[0];
        let headFile = e.target.files[0];
        //后台以form-data形式接收参数
        // let data=new FormData();
        // data.append("headfile",headFile);
        //进度条
        var config = {
            onUploadProgress: (progressEvent) => {
                var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                console.log(percentCompleted);
                this.setState({percentVal: percentCompleted})
            }
        };
        // axios.post("http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f",data,config).then((res)=>{
        //     if(res.data.code===200){
        //         this.setState({imgSrc:"http://vueshop.glbuys.com/userfiles/head/"+res.data.data.msbox})
        //
        //     }
        // })
        request("http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f", "file", {"headfile": headFile}, config).then(res => {
            console.log(res);
            if (res.code === 200) {
                this.setState({imgSrc: "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox});
            }
        });
        //fetch上传头像
        // let data=new FormData();
        // // data.append("headfile",headFile);
        // fetch("http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f", {
        //     method: "post",
        //     body: data
        // }).then(res=>res.json()).then(res=>{
        //     if (res.code === 200) {
        //         this.setState({imgSrc: "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox});
        //     }
        // })
    };
    //上传头像之后的操作/状态
    handleChange(info){
        if(info.file.status==='uploading'){
            this.setState({loading:true});
            return;
        }
        if (info.file.status === 'done') {
            // 如果后台没给图片预览地址，用base64
            // getBase64(info.file.originFileObj, imageUrl =>
            //     this.setState({
            //         imgSrc:imageUrl,
            //         loading: false
            //     }),
            // );
            let res=info.file.response;
            this.setState({imgSrc:"http://vueshop.glbuys.com/userfiles/head/"+ res.data.msbox,
            loading:false})
        }

    };

    render() {

        return (
            <div>
                昵称：{this.props.state.user.nickname}<br/>
                <span onClick={this.goPage.bind(this,"myorder/order?status=0")}>我的订单</span><br/>
                <span onClick={this.goBack.bind(this)}>返回</span><br/>
                <button type="button" onClick={this.outLogin.bind(this)}>安全退出</button>
            </div>
        )
    }
}
export default connect((state)=>{
    return {state:state}
})(UserIndex);