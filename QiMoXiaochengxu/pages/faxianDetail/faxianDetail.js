// pages/faxianDetail/faxianDetail.js
Page({

  data: {
    currentTab: 0,    //默认选中推荐页面，id为0
    swiperHeight: '0px',  //默认高度为0
    images: [           //轮播图片数组
      "/images/lunbo/q1.jpg",
      "/images/lunbo/q2.jpg",
      "/images/lunbo/q3.jpg",
      "/images/lunbo/q4.jpg",
      "/images/lunbo/q5.jpg"
    ],
    paixing: [],  //排行榜数组
    gendan:[],    //热门歌单数组
    gequ:[],  //搜索数组
    jingxuan:[],  //今天社区精选数组
    jxzq:[],  //精选专区数组

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    //加载热门歌单
    this.loadGequ(id);    //取搜索
    this.loadPaixing(id);   //取排行榜
    this.loadJingxuan(id);  //取精选专区
    this.loadJxzq(id);      //取今天社区精选

    var page = this;    //声明了that,将this存在that里面
    var id = options.id;  
    wx.request({    //发出网络请求
      url: 'https://api.apiopen.top/musicRankingsDetails?type=1' ,  //api接口地址
      method:'GET',     //获取数据方法
      header: {
        "Content-Type": "json"    //默认值
      },
      success: function (res) {   //调试函数
      
        var result = res.data.result;   //定义获取返回数据中的属性
        page.setData({  
          gedan:result    //获取返回result的数据
        })
       page.getSwiperHeight("0")    //页面高度为0
        
      }
    })
    

  },
  loadJxzq:function(id){    //加载精选专区
    var that = this;    //声明了that,将this存在that里面
    wx.request({    //发出网络请求
      url: 'http://mobilecdnbj.kugou.com/api/v3/tag/recommend?showtype=3&apiver=2&plat=0',//api接口地址
      method: 'GET',    //获取数据方法
      header:{
        'Content-Type': 'json'    //默认值
      },
      success:function(res){  //调试窗口函数
        var info = res.data.info;     //定义获取返回数据中的属性
        that.setData({
          jxzq: res.data.data.info    //获取返回info的数据
        })
      }
    })
  },
  loadJingxuan: function (id) {     //加载今日社区精选
    var that = this;     //声明了that,将this存在that里面
    wx.request({    //发出网络请求
      url: 'http://baobab.kaiyanapp.com/api/v5/index/tab/feed',   //api接口
      method: 'GET',    //获取数据方法
      header: {
        "Content-Type": "json"     //默认值
      },
      success: function (res) {   //调试窗口函数
    
        var itemList = res.data.itemList;   //定义获取返回数据中的属性
        that.setData({
          jingxuan:res.data,
          jingxuan: res.data.itemList    //获取返回itemList的数据      
        })
      }

    })
  },
  loadPaixing: function (id) {    //加载排行榜
    var that = this;    //声明了that,将this存在that里面
    wx.request({    //发出网络请求
      url: 'http://ksongsearch.kugou.com/ksong_search?tag=em&iscorrection=1&keyword=%E4%BD%A0%E5%A5%BD&userid=0&pagesize=20&page=1',     //api接口
      method: 'GET',     //获取数据方法
      header: {
        'Content-Type': 'application/json'   //默认值
      },
      success: function (res) {    //调试窗口函数
        var lists = res.data.lists;     //定义获取返回数据中的属性
      that.setData({
        paixing: res.data.data.lists  //获取返回lists的数据  
      })
       
      }

    })
  },
  loadGequ:function(id){    //加载热门歌单
    var that = this;    //声明了that,将this存在that里面
    wx.request({    //发出网络请求
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',   //api接口
      method: 'GET',    //获取数据方法
      header:{
        'Content-Type': 'json'   //默认值
      },
      success: function (res) {    //调试窗口函数
        that.setData({
          gequ: res.data,
          gequ: res.data.data.hotkey    //获取返回hotkey的数据 
        })
      }
    })
  },

  swiperChange: function (e) {    //current 改变时会触发 change 事件

    var item_id = e.detail.currentItemId; //声明了item_id,将currentItemId存在item_id里面
    this.setData({
      currentTab: item_id   //获取item_id的值给currentTab
    })
    this.getSwiperHeight(item_id);  //加载item_id的高度
  },
  switchNav: function (e) {   //跳转事件
    var id = e.currentTarget.id;    //声明id去跳转
    this.setData({
      currentTab: id    //根据id跳转
    })
    this.getSwiperHeight(id);   //加载id的高度
  },
  

  getSwiperHeight: function (id) { //动态获取节点高度
    var that = this;
    var query = wx.createSelectorQuery(); //创建节点选择器
    switch (id) {   
      case "0":
        query.select('#tuijian').boundingClientRect();    //id为0跳转推荐页面
        break;
      case "1":
        query.select('#paixingbang').boundingClientRect();  //id为1跳转排行榜页面
        break;
      case "2":
        query.select('#sousuo').boundingClientRect();   //id为2跳转搜索页面
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
  
 