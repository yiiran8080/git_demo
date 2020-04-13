// components/navs/index.js
Component({
  /**
   * 组件的属性列表，期刊title，是否是第一期/最后一期的标识符
   */
  properties: {
    title:String,
    first:Boolean,
    last:Boolean
  },

  /**
   * 组件的初始数据,三角箭头的图片地址
   */
  data: {
    next:"images/right.png",
    previous:"images/left.png",
    no_next:"images/right2.png",
    no_previous:"images/left2.png"
  },
  // 生命周期
  attached:function(){
    //let behavior = this.properties.first;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    left:function(){
      if(!this.properties.first){//如果不是第一期
        this.triggerEvent("left",{},{});
      }
      
    },
    right:function(){
      if(!this.properties.last){//如果不是最后一期
        this.triggerEvent("right",{},{});
      }
      
    }
  }
})
