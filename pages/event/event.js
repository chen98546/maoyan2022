// pages/event/event.js
Page({
  // 页面的初始数据
  data: {
    hotSportsData: [
      {
        src: "/asset/images/event-league.png",
        title: "2022中国平安中国足球协会超级联赛(海口赛区)",
        date: "2022.6.25 19:30 周六",
        address: "海口 五源河体育场",
        price: "100元",
        status: true,
      },
      {
        src: "/asset/images/event-racingClub.png",
        title:
          "【5折超值特惠】马语会亲子马术体验活动：马背上的童年<马背骑乘45分钟>",
        date: "2020.12.17-2022.12.31",
        address: "北京 马语汇亲子马术体验活动——好骑士马团",
        price: "338元",
        status: true,
      },
      {
        src: "/asset/images/event-racing.png",
        title:
          "[9.9元超值特惠] 2021马语汇亲子马术体验活动：让孩子做个快乐的小骑士",
        date: "2021.1.1-2023.1.1",
        address: "北京 马语汇亲子马术体验活动——好骑士马团",
        price: "9.90元",
        status: true,
      },
      {
        src: "/asset/images/event-fair.png",
        title: "2022海城万达海韵嘉年华·澄州英雄国际搏击争霸赛",
        date: "2022.6.23 19:00 周四",
        address: "海城市 国际搏击争霸赛-西柳义乌商贸城",
        price: "80-260元",
        status: true,
      },
    ],
    noEvent: false,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 生命周期函数--监听页面隐藏
  onHide: function () {},

  // 生命周期函数--监听页面卸载
  onUnload: function () {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.setData({
      noEvent: true,
    });
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {},
});
