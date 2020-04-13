// miniprogram/pages/classic/classic.js
import {ClassicModel} from "../../modules/classic.js"
import {LikeModel} from "../../modules/favor.js"
let classicModel = new ClassicModel();
let likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求期刊返回的结果res
    classic:null,
    last:true,
    first:false,
    likeCount:0,//点赞数量
    likeStatus:false//点赞状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res=>{
      this.setData({
        classic:res,
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      });//或扩展运算符{...res}
    })
  },
  //点赞时调用的方法
  onLike: function(e){
    //console.log(e);
    likeModel.isLike(e.detail.behavior,this.data.classic.id,this.data.classic.type)
  },
  onPrevious:function(e){
    this._updateClassic("previous");
  },
  onNext:function(e){
    this._updateClassic("next");
  },

  //点击向左/右切换按钮,跳转至上一期/下一期
  _updateClassic:function(nextOrPrevious){
    let index = this.data.classic.index;
    classicModel.getClassic(res=>{
      this.setData({
        classic:res,//更新期刊内容
        first:classicModel.isFirst(res.index),
        last:classicModel.isLast(res.index)
      }) ;
      this._updateLike(res.id,res.type)}//获取点赞状态；
    ,nextOrPrevious,index);
  },
  //更新点赞状态
  _updateLike:function(artID,category){
    likeModel.getLikeStatus(artID,category,res=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
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