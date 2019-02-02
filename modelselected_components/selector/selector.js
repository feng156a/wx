// modelselected_components/selector/selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  start:[1,2,3,4],
  end:[1,2,3,4],
  tips:'您选择了X题到X题',
  hidden:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
  _close:function(){
    this.setData({
      hidden:true
    })
  },
  _goto:function(){
    this._close();
    wx.navigateTo({
      url: '../train_examnationpage/examnationpage',
    });
  },
  show:function(){
    this.setData({
      hidden: false
    }) 
  }
  }
})
