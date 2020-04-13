//封装对点赞、取消点赞的请求，Post方式提交
import {HTTP} from "../utils/http.js";
export class LikeModel extends HTTP{
  isLike(behavior,artId,category){
    //点赞功能不需要使用回调函数，因此未传callback参数
    let url = behavior==='like'?"/like":"/like/cancel";
    this.request({
      url:url,
      method:"post",
      data:{
        art_id:artId,
        type:category
      }
    }
    )
  }
  getLikeStatus(artID,category,callback){
    this.request({
      url:"/classic/"+category+"/"+artID+"/"+"favor",
      success:callback
    })
  }
}