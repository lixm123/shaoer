// pages/zhibo/zhibo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      zhibo:[]
  },

loadZhibo:function(res){
  var that=this;
  wx.request({
    url: 'http://bjacshow.kugou.com/show7/json/v2/cdn/index/live/list?platform=1&sign=0e2e8fb44383458f&version=9108&pageSize=50&gaodeCode=0371&channel=10&page=1&longitude=113.69&std_plat=5&latitude=34.8',
    method:'GET',
    header:{
      'Content-Type': 'application/json'
    },
    success:function(res){
      console.log(res);
      var list=res.data.list;
      that.setData({
        zhibo:res.data,
        zhibo:res.data.data.list
      
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadZhibo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})