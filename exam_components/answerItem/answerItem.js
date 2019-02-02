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
    isselected:false,
    isalive:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
_bechoosed:function(){
  if(this.data.isalive)                 //如果当前选项是活跃的
  {
  if(!this.data.isselected)
  {
  this.setData({
    bgcolor: '#e1fbf2',
    isselected:true
    }); 
    this.triggerEvent('havedone',true);  //告诉导航面板，此题已经做过了
    }                  //在选项底部化绿线，显示我的选择
    else
    {
    this.setData({
      isselected:false,
      bgcolor: 'white'    //如果已经选中了，就取消选择，还原背景色
    }); 
    this.triggerEvent('havedone', false);  //告诉导航面板，此题还没做过了
    }
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
},
getresult:function()
{
  return this.data.isright==this.data.isselected;
}
  }
})
