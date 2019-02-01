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
    seal: 'rightseal'
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
    onShowanswer: function (e) {
      var isright = e.detail;  //e.detail.isright监听器监听到的是否答对的参数，
      if (!isright) {
        this.showanswer();
        this.addseal('wrongseal'); //添加错误印章
        this.triggerEvent('dead', false);  //通知父元素，本题已经完成并且错误，以更新导航面板显示
      }
      else{
        this.data.rightanswerchoosed=this.data.rightanswerchoosed+1;
        if (this.data.rightanswerchoosed==this.data.rightanswercount)
        {
          this.addseal('rightseal');  //添加正确印章
          this.triggerEvent('dead', true);  //通知父元素，本题已经完成并且正确，以更新导航面板显示
          this.unableall();
        }
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
    }
  }

  })
