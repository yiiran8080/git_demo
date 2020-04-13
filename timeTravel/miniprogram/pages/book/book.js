// miniprogram/pages/book/book.js
import {BookModel} from '../../modules/book'
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more:0 //是否加载更多搜索结果
  },
  //点击搜索框时显示搜索组件
  onSearch(){
    this.setData({searching:true});
  },
  //接收组件取消事件
  onCancel(){
    this.setData({searching:false});
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  //搜索结果显示后，监测已经滑动到了页面底部，通知search组件加载更多数据
  onReachBottom(){
    this.setData({more:Math.random()});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const hotList = await bookModel.getHotBooks();//返回一个promise
    this.setData({books:hotList});
    // hotList.then(res=>{
    //   this.setData({books:res})
    // });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})