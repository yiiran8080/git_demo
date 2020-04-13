// components/favor/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      like:{
        type:Boolean
      },
      count:{
        type:Number
      },
      readOnly:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
      yesSrc:"images/like.png",
      noSrc:"images/dislike.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onlike : function(e){
        //自定义事件
        if(this.properties.readOnly){//如果点赞功能只读
          return;
        }
          let like = this.properties.like;
          let count = this.properties.count;
          count = like?count-1:count+1;
          this.setData({
            count:count,
            like:!like
          })
          let behavior = this.properties.like?"like":"cancel";
          //只要点击就会激活自定义事件，让页面调用时知道状态是like/cancel
          this.triggerEvent("my-like",{
            behavior//自定义属性details
          },{})
      }
  }
})
