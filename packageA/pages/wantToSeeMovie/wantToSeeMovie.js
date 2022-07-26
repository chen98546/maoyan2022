import { fetchMovieDetail } from "../../../api/movie.js";
import { fetchUserWTSMovie } from "../../../api/user.js";

Page({
  // 页面的初始数据
  data: {
    movieList: [],
    isCheckEditBtn: false,
    disabledBtn: true,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this._fetchUserWTSMovie();
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

  // 子传父
  filmCardFn(e) {
    let { disabledBtn } = e.detail.filmCardData;
    this.setData({ disabledBtn });
  },

  // 事件绑定
  // 获取用户想看的电影
  async _fetchUserWTSMovie() {
    let wantToSeemovie = wx.getStorageSync("wantToSeemovie");
    let movieList = wantToSeemovie.map(async (item) => {
      let { detailMovie } = await fetchMovieDetail(item);
      return detailMovie;
    });
    // 并发请求数据
    let res = await Promise.all(movieList);
    this.setData({ movieList: res });
  },

  // 编辑按钮
  isCheckEditBtnFn() {
    this.setData({ isCheckEditBtn: !this.data.isCheckEditBtn });
  },

  // 删除按钮
  deleteBtnFn() {
    wx.showToast({ title: "没有删除接口", icon: "none" });
  },
});
