import { fetchSearchMovieFn } from "../../../api/search.js";
import { throttle } from "../../../utils/methods.js";
Page({
  // 页面的初始数据
  data: {
    kw: "",
    movies: {},
    cinemas: {},
    setSearchHistory: [],
    getSearchHistory: [],
    showSearchHistory: false,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      getSearchHistory: wx.getStorageSync("setSearchHistory") || [],
      showSearchHistory: true,
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

  getSearchDataFn: async function (e) {
    let res = await fetchSearchMovieFn(e.detail);
    console.log(res);
    this.setData({
      kw: e.detail,
      movies: res.movies,
      cinemas: res.cinemas,
      showSearchHistory: false,
    });
    if (!this.data.getSearchHistory.includes(e.detail)) {
      this.data.getSearchHistory.unshift(e.detail);
    } else {
      let index = this.data.getSearchHistory.findIndex(
        (item) => item == e.detail
      );
      this.data.getSearchHistory.splice(index, 1);
      this.data.getSearchHistory.unshift(e.detail);
    }
    wx.setStorageSync("setSearchHistory", this.data.getSearchHistory);
    this.setData({
      getSearchHistory: wx.getStorageSync("setSearchHistory") || [],
    });
  },

  onSearchChange: async function (e) {
    !e.detail &&
      this.setData({
        kw: e.detail,
        movies: {},
        cinemas: {},
        showSearchHistory: true,
      });
  },
  onSearchCancel() {
    wx.navigateBack({ delta: 1 });
  },

  closeSearchHistoryEv(e) {
    this.data.getSearchHistory.splice(e.currentTarget.dataset.index, 1);
    wx.setStorageSync("setSearchHistory", this.data.getSearchHistory);
    this.setData({
      getSearchHistory: wx.getStorageSync("setSearchHistory") || [],
    });
  },

  async searchHistoryWrapEv(e) {
    let res = await fetchSearchMovieFn(e.target.dataset.item);
    let index = this.data.getSearchHistory.findIndex((item) => {
      return item == e.target.dataset.item;
    });
    this.setData({
      kw: e.target.dataset.item,
      showSearchHistory: false,
      movies: res.movies,
      cinemas: res.cinemas,
    });
    this.data.getSearchHistory.splice(index, 1);
    this.data.getSearchHistory.unshift(e.target.dataset.item);
    wx.setStorageSync("setSearchHistory", this.data.getSearchHistory);

    this.setData({
      getSearchHistory: wx.getStorageSync("setSearchHistory") || [],
    });
  },
});
