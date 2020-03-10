import echo from "../libs/echo"
import config from "../conf/config";
import {request} from "./request";
import action from "../../../actions";
function lazyImg() {
    echo.init({
        offset:100,//可视区域多少像素被加载
        throttle:0//图片延迟加载时间

    })

}
function localParam (search, hash) {
    search = search || window.location.search;
    hash = hash || window.location.hash;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    };
    return {
        search : fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
        hash : fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
    };
}
function setScrollTop(val=0) {
    setTimeout(()=>{
        //解决白屏问题
        document.body.scrollTop=val;
        document.documentElement.scrollTop=val;
        //console.log(val);
    },300);
}
//会员登录安全认证(单点登录)
function safeAuth(props) {
    let sUrl=config.baseURL+"/api/home/user/safe?token="+config.token;
    request(sUrl,"post",{uid:props.state.user.uid,
        auth_token:props.state.user.authToken}).then(res=>{
        //如果没有权限访问，要求退出
        if(res.code!==200){
            props.dispatch(action.user.outLogin());
            props.history.replace(config.path+"login/index");
        }
    })

}
export {
    localParam,
    lazyImg,
    setScrollTop,
    safeAuth
}