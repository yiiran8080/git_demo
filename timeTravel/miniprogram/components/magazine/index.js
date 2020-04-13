// components/magzine/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      value:0,
      observer:function(newVal,oldVal,changePath){
        let val = newVal <10? "0"+newVal:newVal; //个位数前面以01，02显示 
        this.setData({_index:val});
      }
    }
  },

  /**
   * 组件的初始数据,不能与property初始化方式相同，类型会被当做函数处理
   */
  data: {
    year:0,
    month:"",
    months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    _index:0
  },
//生命周期函数
  attached:function(){
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.setData({
      month:this.data.months[month],
      year:year
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
