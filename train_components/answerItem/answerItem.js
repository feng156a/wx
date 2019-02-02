// components/answerItem/answerItem.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  content:{
    type:String,
    value:''
  },
  isright:{
    type:Boolean,
    value:false
  },
  index:{
    type:Number,
    value:0
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:'0',
    bdcolor:'#3eab5a',
    bgcolor:'white',
    isalive:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
_bechoosed:function(){
  
  if(this.data.isalive){         //查验选项当前的活性
  this.showanswer();
  this.triggerEvent('isright',this.data.isright);//设置监听器，监听用户是否选择正确
  this.setData({
    bgcolor: '#e1fbf2'
    });                   //在选项底部化绿线，显示我的选择
  }
},
/**显示答案 */
showanswer:function(){
  if (this.data.isright == true) {
    this.setData({
      index: 7,
      bdcolor: '#047120'
    });
  }
  else {
    this.setData({
      index: 8,
      bdcolor: 'red'
    });
  }
},
unalive:function(){              //如果该题已经判断了对错，则失去活性
  this.data.isalive=false;
}
  }
})
