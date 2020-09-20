// pages/faxianDetail/faxianDetail.js
Page({

  data: {
    currentTab: 0,
    swiperHeight: '0px',

    paixing: [],

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadPaixing(id);
   

    var page = this;
    var id = options.id;
  
       page.getSwiperHeight("0")
        
   

  },

  loadPaixing: function (id) {  
    var that = this;
    wx.request({
      url: 'http://ksongsearch.kugou.com/ksong_search?tag=em&iscorrection=1&keyword=%E4%BD%A0%E5%A5%BD&userid=0&pagesize=20&page=1',
     method:'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
       var lists=res.data.lists;
      that.setData({
        paixing:res.data.data.lists
      })
       
      }

    })
  },

  
  swiperChange: function (e) {

    var item_id = e.detail.currentItemId;
    this.setData({
      currentTab: item_id
    })
    this.getSwiperHeight(item_id);
  },
  switchNav: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      currentTab: id
    })
    this.getSwiperHeight(id);
  },
  

  getSwiperHeight: function (id) { //动态获取节点高度
    var that = this;
    var query = wx.createSelectorQuery(); //创建节点选择器
    switch (id) {
      case "0":
        query.select('#danqu').boundingClientRect();  //选择jieshao节点
        break;
   
    }
    query.exec(function (res) { //查询节点的信息
      var h = res[0].height;  //取出节点高度
      that.setData({
        swiperHeight: h + 2500 + "px"
      })
    })
  }



})
  
 