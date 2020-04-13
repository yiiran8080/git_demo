import {HTTP} from "../utils/http.js";
//封装对期刊内容、背景图片的请求
export class ClassicModel extends HTTP{
  //最新一期内容
  getLatest(callback){
    this.request({
      url:"/classic/latest",
      success:res=>{
        callback(res);
        this._setLastIndex(res.index);//存储期刊号
        //将最新期刊页面存入缓存
        let key = this._getKey(res.index);
        wx.setStorageSync(key,res);
      }
    })
  }
  getClassic(callback,nextOrPrevious,index){
  //获取上一期，下一期内容
  //获取期刊key值，查找缓存
  let key = nextOrPrevious==='next'? this._getKey(index+1):this._getKey(index-1);
  let classic = wx.getStorageSync(key);
  if(classic){//缓存中找到目标页面
    callback(classic);
  }else{//缓存没有，需要向api重新请求
    this.request({
      url:"/classic/"+index+"/"+nextOrPrevious,
      success:res=>{
        callback(res);
        //将页面写入缓存
        wx.setStorageSync(this._getKey(res.index), res);
      }
    })
  }
    
  }
  //获取我喜欢的期刊
  getMyFavor(success){
    const params={
      url:"/classic/favor",
      success
    };
    this.request(params)
  }

  //判断是否是第一期
  isFirst(index){
    return index===1?true:false;
  }
  //判断是否是最后一期
  isLast(currentIndex){
    let lastIndex = this._getLastIndex();
    return currentIndex===lastIndex?true:false;
  }
  //存储最新期刊的号码
  _setLastIndex(index){
    wx.setStorageSync('lastIndex', index);
  }
  //获取最新期刊号码
  _getLastIndex(){
    let index = wx.getStorageSync('lastIndex');
    return index;
  }
  //为每一期期刊确定一个key，以便使用缓存
  _getKey(index){
    let key = "classic-" + index;
    return key;
  }
}