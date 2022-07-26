import {
  fetchMovieDetail,
  fetchWantToSeeMovieFn
} from "../../../api/movie.js";
import {
  fetchUserWxPay
} from "../../../api/user.js";
Page({
  // 页面的初始数据
  data: {
    movieDetail: {},
    isShowInfo: false,
    wantToseeMovie: false,
    timer: null,
    countdown: 5
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    let {
      detailMovie
    } = await fetchMovieDetail(options.id);
    if (!detailMovie) {
      wx.showToast({
        title: "数据请求失败",
        icon: "error",
      });
      return;
    }
    this.setData({
      movieDetail: detailMovie
    });
  },

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
  onReachBottom: function () {},

  // 用户点击右上角分享
  onShareAppMessage: function () {},

  detailAbstractUnfoldFn() {
    this.setData({
      isShowInfo: !this.data.isShowInfo,
    });
  },

  async seeMovieFn(e) {
    this.setData({
      wantToseeMovie: !this.data.wantToseeMovie
    });
    if (this.data.wantToseeMovie) {
      let res = await fetchWantToSeeMovieFn(this.options.id);
      if (res.errcode == 200) {
        this.setData({
          wantToseeMovie: true
        });
      }
    }
  },

  async buyTicketEv(e) {
    let openid = wx.getStorageSync("openid");
    let res = await fetchUserWxPay(this.options.id, openid);
    if (res.errcode == 200) {
      this.data.timer = setInterval(() => {
        this.setData({
          countdown: this.data.countdown - 1
        });
        if (this.data.countdown <= 0) {
          clearInterval(this.data.timer);
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }, 1000);
      wx.showModal({
        title: '订单状态',
        content: '支付成功，' + this.data.countdown + '秒返回首页',
        showCancel: false,
        confirmText: "返回首页",
        success: () => {
          clearInterval(this.data.timer);
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }
  },
});