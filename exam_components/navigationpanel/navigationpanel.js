// components/navigationpanel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number:{
      type:Number,
      value:0
    },
    status:{
      type:Array,
      value:[]
    }

  },
  /**
   * 组件的初始数据
   */
  data: {
  ishide:'true',
  bgcolor:'lightgray'
  },

  /**
   * 组件的方法列表
   */
  methods: {
  _close:function(){
    this.setData({
      ishide:true
    });
  },
  shownavigationpanel:function(){
    this.setData({
      ishide: false
    });
  },
  goto:function(e)
  {
    var number = e.currentTarget.dataset.number;
    this.triggerEvent('jumpto',number);
    this._close();
  },
  setbgcolor:function(color){
    this.setData({
      bgcolor:color
    })
  }
  
  }
})
