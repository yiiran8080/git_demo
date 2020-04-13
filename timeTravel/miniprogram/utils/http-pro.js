//封装请求接口的类与方法
import {config} from "../config.js"
//错误提示信息：
const tips = {
  1:"有一个未知错误",
  1005:"appkey无效",
  3000:"期刊不存在",
  1002:"找不到资源",
  1003:"未知错误",
  1004:"禁止访问",
  1005:"不正确的开发者key",
  1006:"服务器内部错误",
  1007:"网络错误"
}
class HTTP{
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method);
    })
  }
  _request(url,resolve,reject,data={},method='GET'){
    wx.request({
      url:config.api_base_url + url,
      header:{
        "content-type":"application/json",
        "appkey":config.appkey
      },
      method:method,
      data:data,
      success:res=>{
        let code = res.statusCode.toString();
        if (code.startsWith('2')){
          resolve(res.data); 
        }else{
          reject();
          this._show_error(res.data.error_code);
        }
      },
      fail:err=>{
        reject();
        this._show_error(1007);
      }
    })
  }
  _show_error(error_code){
    wx.showToast({
      title:tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}
export {HTTP};