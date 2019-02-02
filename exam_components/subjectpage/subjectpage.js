// components/subjectpage/subjectpage.js

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
    datalist: {},
    itemcount: 0,
    rightanswercount:0,
    rightanswerchoosed : 0,
    answeritems: [],
    sealhidden: true,
    seal: 'rightseal',
    chooseitemnumber:0  //选项被选择计数器
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init:function(jsonData){
      this.setData({
        //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
        datalist: jsonData,
        subject: jsonData.content,
        answers: jsonData.answers,
        itemcount: jsonData.itemcount,
        rightanswercount: jsonData.rightanswercount
      });
      for (var i = 0, count = this.data.itemcount;i<count;i++)
      {
       this.data.answeritems[i]=this.selectComponent('#item' + i);
      }
    },
    _showdialog: function () {
      this.dialog.showme();
    },
    onConfirm: function (e) {
      console.log('number', this.data.itemcount);
      this.showanswer();
    },
    /*监听选择的答案是否正确，如果答错，提示显示所有的答案*/
    onDone: function (e) {
      var choosed = e.detail;  //e.detail.isright监听器监听到的是否已选的参数，
      if (choosed) this.data.chooseitemnumber=this.data.chooseitemnumber+1;  //计数器+1
      else this.data.chooseitemnumber=this.data.chooseitemnumber - 1; //计数器-1
      if (this.data.chooseitemnumber==0) {
        this.triggerEvent('isdone', false);  //通知父元素，本题没有完成，以更新导航面板显示
      }
      else{
          this.triggerEvent('isdone', true);  //通知父元素，本题已经完成，以更新导航面板显示
          
        }
      },
   
    /**便利显示所有答案 */
    showanswer: function () {
      for (var i = 0, len = this.data.itemcount; i < len; i++) {
        this.data.answeritems[i].showanswer();
      }
      this.unableall();
    },
    /**取消所有选项的活性 */
    unableall:function(){
      for (var i = 0, len = this.data.itemcount; i < len; i++) 
        {this.data.answeritems[i].unalive();}
      } ,
    
   /**添加正确或错误印章 */
   addseal:function(sealkinds){
   this.setData({
     sealhidden:false,
     seal: sealkinds
   });
    },
    /**提交时显示结果 */
    upload:function(){
      for (var i = 0, len = this.data.itemcount; i < len; i++) 
      {     
        if(!this.data.answeritems[i].getresult())   //选项中如果有一个选错代表此题错误
        {
          this.showanswer();
          this.addseal('wrongseal');  //添加正确印章
          this.unableall();
          return 0;     
        }
       }
       /**所有选项判断都正确，代表此题正确 */
      this.addseal('rightseal');  //添加正确印章
      this.unableall();
      return 1;
    }
  }

  })
