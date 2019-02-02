// components/Dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message:{
      type:String,
      value:'消息'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
showshade:0,
isshow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showme:function(){
      this.setData({
        
        isshow:false
      });
    },
    hideme:function(){
      this.setData({
        
        isshow:true
      });
    },
    confirm(){
      this.hideme();
      this.triggerEvent('confirm', "clicked confirm")
    },
    cancel:function(){
      this.hideme();
    }
  }
})
