// pages/my/my.js
import {BookModel} from "../../modules/book"
import {ClassicModel} from "../../modules/classic"
const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:null
  },
  // getUserInfo(e){
  //   console.log(e);
  // },
  //监听用户初次点击授权按钮
  onGetUserInfo(e){
    const userInfo = e.detail.userInfo;
    if(userInfo){ //如果用户未授权，不会发生变化
      this.setData({
        userInfo,
        authorized:true
      });
    }
    
  },
  //判断用户是否已授权
  userAuthorized(){
    wx.getSetting({
      complete: (res) => {
        if(res.authSetting['scope.userInfo']){//如果用户已授权
          wx.getUserInfo({
          complete: (res) => {
            this.setData({
              authorized:true,
              userInfo:res.userInfo
            })
          },
          })
        }
      },
    })
  },
  // 跳转至其他页面
  onJumpTo(e){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  //我喜欢的期刊
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({classics:res});
    });
  },
  //获取喜欢图书数量
  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({bookCount:res.count})
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
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