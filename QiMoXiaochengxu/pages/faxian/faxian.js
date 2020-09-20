// pages/faxian/faxian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[   //定义轮播图片数组
      "/images/lunbo/a.jpg",
      "/images/lunbo/b.jpg",
      "/images/lunbo/c.jpg",
      "/images/lunbo/d.jpg",
      "/images/lunbo/e.jpg"
     
    ],
    gedan:[]  //定义榜单数组
  },
  loadGedan:function(){     //加载榜单
    var that=this;        
    wx.request({    //发起网络请求
      url: 'https://api.apiopen.top/musicRankings',   //api接口
      method:'GET',       //请求方法
      header:{
        'Content-Type':'json'  //默认值
      },
      success:function(res){  
        console.log(res);   //弹出调试窗口
        var result=res.data.result; //定义获取返回数据中的属性
        that.setData({
          gedan:result  //返回的属性存入gedan数组里面
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGedan();   //取加载榜单的数据
  },
  loadDetail:function(e){    //转到faxianDetail页面
    var id=e.currentTarget,id;
    wx.navigateTo({
      url: '../faxianDetail/faxianDetail?id='+id,
    })
  },

 
})