// pages/examnationpage/examnationpage.js
let preIndex = 0;    //记录swiper页面当前的索引
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    status_temp:new Array() ,     //导航面板状态显示
    pages:new Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonData = require('../data/data.js');
    var subjectcount=jsonData.data.length;  //获取数据量，确定添加容器页数
    //var status_temp=new Array();   //构造用于导航页面显示的题目索引数组，这里应该有更简单的方式
    for (var i = 0; i < subjectcount; i++) { this.data.status_temp[i]='gray';}
    this.setData({
      subjects: jsonData.data,    //初始化swiper容器页面
      allpage: subjectcount,
      currentpage:preIndex+1,
      status: this.data.status_temp,
     
    })
    
    for(var i=0;i<subjectcount;i++) //初始化题目页面
    {
    this.data.pages[i]=this.selectComponent('#page'+i);
    this.data.pages[i].init(jsonData.data[i]);
    this.setData({
      hidden:false
    })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
    this.swiper = this.selectComponent("#swiper");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _showdialog:function(){
    this.dialog.showme(); 
  },
 
  /*监听选择的答案是否正确，如果答错，提示显示所有的答案*/ 
  onShowanswer:function(e){
    var isright = e.detail;  //e.detail.isright监听器监听到的是否答对的参数，
  if(!isright)
  {
    this.showanswer();
  }
  },
  /**显示全部选项的答案 */
  showanswer:function()
  {
    for (var i = 0, len = this.data.itemcount; i < len; i++) {
      this.selectComponent('#item'+i).showanswer();
    }
  }
  ,
  /**swiper控件卡死补救措施，记录正确值，当卡死current为0时，即使修正为正确值 */
  swiperchange: function (event) {
    if (event.detail.source == "touch") {
      //防止swiper控件卡死
      if (event.detail.current == 0 && this.data.preIndex > 1) {//卡死时，重置current为正确索引
        this.setData({
           current: preIndex
           });
      }
      else {//正常轮转时，记录正确页码索引
        preIndex = event.detail.current ;
        this.setData({
          currentpage: preIndex+1
        });
      }
    }
  },
  /**处理打开导航面板事件 */
  opennavigationpanel:function(){
    this.selectComponent('#navigationpanel').shownavigationpanel();
  }
  ,
  /**处理跳转事件 */
  onJumpto:function(e){
    this.setData({
      current:e.detail,                          //跳转到指定页
      currentpage:e.detail+1                     //更改页码显示
    });
  
  },
  /**处理题目面板发送过来的完成信息，此处更新导航面板显示 */
  onIsdone:function(e){
   // status_temp[e.target.id];
    var pageid =parseInt(e.target.id.replace('page',''));
    var result=e.detail;
    if(result) this.data.status_temp[pageid]='#047120';  //如果答题正确，导航面板显示绿色
    else this.data.status_temp[pageid] = 'gray';   //否则显示红色
    this.setData({
      status: this.data.status_temp
    });
  },
  /**处理提交点击 */
  upload:function()
  {
    this._showdialog();
  },
  /***用户确认提交试卷 */
  onConfirm: function (e) {
    var len = this.data.pages.length;
    var count=0;
    for (var i=0;i<len;i++)
    {
      count = count + this.data.pages[i].upload();
    }
    console.log('count',count);
  }
})