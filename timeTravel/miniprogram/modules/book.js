import {HTTP} from "../utils/http-pro.js";
export class BookModel extends HTTP{
  //获取精选书籍
  getHotBooks(){
    return this.request({
      url:'/book/hot_list'
      });//返回Promise对象
  }
  //搜索书籍关键字
  searchBook(start,q){
    return this.request({
      url:"/book/search?summary=1",
      data:{
        start,
        q
      }
    })
  }
  //我的喜欢书籍数量
  getMyBookCount(){
    return this.request({
      url:`/book/favor/count`
    })
  }
  //书籍详情
  getBookDetail(bid){
    return this.request({
      url:`/book/${bid}/detail`
    })
  }
  //书籍评论
  getComment(bid){
    return this.request({
      url:`/book/${bid}/short_comment`
    })
  }
  //点赞情况
  getLikeStatus(bid){
    return this.request({
      url:`/book/${bid}/favor`
    })
  }
  //提交评论
  postComment(bid,comment){
    return this.request({
      url:'/book/add/short_comment',
      data:{
        book_id:bid,
        content:comment
      },
      method:'POST'
    })
  }
}