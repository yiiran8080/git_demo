// miniprogram/pages/book-detail/book-detail.js
import {
  BookModel
} from '../../modules/book';
import {LikeModel} from "../../modules/favor";
const likeModel = new LikeModel();
const bookModel = new BookModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    detail:null,
    likeCount:0,
    likeStatus:false,
    posting:false //用户是否点击评论输入框
  },
//点赞时调用的方法
onLike: function(e){
  //console.log(e);
  likeModel.isLike(e.detail.behavior,this.data.detail.id,400)
},
//点击评论输入框
onPost(e){
  this.setData({posting:true});
},
//取消评论
onCancel(e){
  this.setData({posting:false});
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bid = options.bid; //接收从book页面点击得到的id
    const detail = bookModel.getBookDetail(bid);
    const comments  = bookModel.getComment(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    //将三个并行请求合并
    Promise.all([detail,comments,likeStatus]).then(res=>{
      this.setData({//数据顺序与数组顺序一一对应
        detail:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading();
    })
    // detail.then(res=>{
    //   this.setData({detail:res})
    // });
    // comments.then(res=>{
    //   this.setData({comments:res.comments})
    // });
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeCount:res.fav_nums,
    //     likeStatus:res.like_status})
    // });
  },
  // 通过点击标签发布评论
  onComment(e){
    const comment = e.detail.text || e.detail.value;
    if(!comment){return;}
    //const inputComment = e.detail.value;
    if(comment.length>12){
      wx.showToast({
        title: '评论不能超过12个字'
      })
      return;
    }
    bookModel.postComment(this.data.detail.id,comment)
     .then(res=>{
       wx.showToast({
         title: '+1'
       })
       this.data.comments.unshift({
         content:comment,
         nums:1
       })
       this.setData({
         comments:this.data.comments,
         posting:false
        })
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})