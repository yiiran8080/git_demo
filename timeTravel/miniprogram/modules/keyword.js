//搜索组件：生成历史搜索关键字、热门搜索
import {HTTP} from "../utils/http-pro.js";
class KeywordModel extends HTTP{
  key = 'kwArr';
  maxLength = '10';
  //获取历史数组
  getHistory(){
    let kws = wx.getStorageSync(this.key)
    return kws?kws:[];
  }
  getHot(){
    return this.request({
      url:"/book/hot_keyword"
    })
  }
  //加入历史数组。关键字写入缓存,是一个数组
  addHistory(keyword){
    let kws = this.getHistory();
    const has = kws.includes(keyword);
    if(!has){
      if(kws && kws.length>=this.maxLength){
        kws.pop();
      }
      kws.unshift(keyword);
      wx.setStorageSync(this.key, kws);
    }
  }
}
export {KeywordModel};