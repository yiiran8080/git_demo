// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  //启用slot:
  options:{
    multipleSlots:true
  },
  //外部样式，未使用
  //externalClasses:['tag-class'],
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      this.triggerEvent("tagging",{
        text:this.properties.text
      },{})
    }
  }
})
