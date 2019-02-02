// pages/baseListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 定义多个SLOT
   */
  options:{
    multipleSlots:true
  },
  /**
   * 组件的初始数据
   */
  data: {
    place: 0,
    marginplace: 0,
    startplace: 0,
    isShow:0,
    bgcolor:'#ffffff'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _touchStart: function (e) {
      this.setData({
        startplace: e.changedTouches[0].clientX
      });
    },
    _touchEnd: function (e) {
      var temp=this.data.marginplace;
      if(temp<-50)
      {
        this.setData({
          marginplace: -60,
          isShow:1
        });
      }
      else 
      {
      this.setData({
        marginplace: 0,
        isShow:0
      });
      }
    },
    _touchMove: function (e) {
      var changed = e.changedTouches[0].clientX - this.data.startplace;
      if (changed < 0) {
        if (changed > -60) {
          this.setData({
            marginplace: changed,
          })
        }
        else {
          changed = -60;
          this.setData({
            marginplace: changed,
          });
        }
      }
      else if (changed > 0&&this.data.isShow==1){
        if (changed < 60) {
          this.setData({
            marginplace: -60+changed,
          })
        }
        else {
          this.setData({
            marginplace: 0,
          });
        }
      }
    } ,
     _listTap: function (e) {
       
    },
   
  },
 
})
