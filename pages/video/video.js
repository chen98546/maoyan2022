import {
  fetchAllHotMovie,
  fetchHotMovie,
  fetchAllAwaitMovie,
  fetchAwaitMovie,
  fetchExpectMovie,
} from "../../api/movie.js";
import { throttle } from "../../utils/methods.js";
import {
  fetchCinemasList,
  fetchFilterBrandCinemas,
} from "../../api/cinemas.js";

Page({
  // 页面的初始数据
  data: {
    active: 1,
    page: 1,
    n1: 0,
    n2: 12,
    offset: 0,
    limit: 10,
    allHotMovieList: [],
    allAwaitMovieList: [],
    expectMovieList: [],
    tabBgColorIsTrue: false, // tab背景显示
    comingLength: 0,
    cinemas: [],
    option1: [
      { text: "全城", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 },
    ],
    option2: [{ text: "数据加载失败", value: 0 }],
    option3: [
      { text: "筛选", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 },
    ],
    value1: 0,
    value2: 0,
    value3: 0,
    title: "品牌",
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this._fetchCinemasList();
    this._fetchFilterBrandCinemas();
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    // this._fetchAllHotMovie();
    // this._fetchAllAwaitMovie();
    // this._fetchExpectMovie();
  },

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
      page: this.data.page + 1,
      n1: this.data.n2,
      n2: this.data.n2 + 12,
      offset: this.data.offset + 10,
    });

    if (this.data.comingLength == 0) {
      wx.showToast({ title: "没有更多了", icon: "none" });
      return;
    }
    if (this.data.active == 0) {
      this._fetchAllHotMovie();
    } else if (this.data.active == 1) {
      this._fetchCinemasList();
    } else {
      this._fetchAllAwaitMovie();
    }
  },

  // 监听页面滚动
  onPageScroll: throttle(function (e) {
    if (e.scrollTop > 80) {
      this.setData({ tabBgColorIsTrue: true });
    } else {
      this.setData({ tabBgColorIsTrue: false });
    }
  }, 30),

  // 用户点击右上角分享
  onShareAppMessage: function () {},

  // tab栏切换
  activeChangeFn(e) {
    wx.pageScrollTo({
      duration: 0,
      scrollTop: 0,
    });
    this.setData({ active: e.detail.index });
    let allHotMovieList = wx.getStorageSync("allHotMovieList");
    let allAwaitMovieList = wx.getStorageSync("allAwaitMovieList");
    let expectMovieList = wx.getStorageSync("expectMovieList");

    if (e.detail.index == 0) {
      if (allHotMovieList) {
        this.setData({ allHotMovieList });
      } else {
        this._fetchAllHotMovie();
      }
    } else if (e.detail.index == 2) {
      if (allAwaitMovieList) {
        this.setData({ allAwaitMovieList });
      } else {
        this._fetchAllAwaitMovie();
      }
      if (expectMovieList) {
        this.setData({ expectMovieList });
      } else {
        this._fetchExpectMovie();
      }
    }
  },

  // 热映数据请求
  // async _fetchAllHotMovie() {
  //   let res = await fetchAllHotMovie(this.data.page, this.data.pagesizre);
  //   res = res.map((item) => {
  //     item.img = item.img.replace(/\/w.h/, "");
  //     return item;
  //   });
  //   this.setData({ allHotMovieList: [...this.data.allHotMovieList, ...res] });
  // },

  // 热映数据请求
  async _fetchAllHotMovie() {
    let res = await fetchHotMovie();
    if (res.code == 406) {
      wx.showToast({ title: res.msg, icon: "none" });
      return;
    }
    let movieIds = res.movieIds.splice(this.data.n1, this.data.n2).join(",");
    let { coming } = await fetchAllHotMovie(movieIds);
    if (!coming) {
      wx.showToast({
        title: "数据请求失败",
        icon: "error",
      });
      return;
    }
    this.setData({
      allHotMovieList: [...this.data.allHotMovieList, ...coming],
      comingLength: coming.length,
    });
    wx.setStorageSync("allHotMovieList", this.data.allHotMovieList);
  },

  // 待映数据请求
  async _fetchAllAwaitMovie() {
    let res = await fetchAwaitMovie(10);
    if (res.code == 406) {
      wx.showToast({ title: res.msg, icon: "none" });
      return;
    }
    let movieIds = res.movieIds.splice(this.data.n1, this.data.n2).join(",");
    let { coming } = await fetchAllAwaitMovie(movieIds);
    if (!coming) {
      wx.showToast({
        title: "数据请求失败",
        icon: "error",
      });
      return;
    }
    let comingMap = {};
    coming.forEach((item) => {
      if (comingMap[item.comingTitle]) {
        comingMap[item.comingTitle].push(item);
      } else {
        comingMap[item.comingTitle] = [item];
      }
    });

    this.setData({
      allAwaitMovieList: [...this.data.allAwaitMovieList, ...coming],
      comingLength: coming.length,
    });
    wx.setStorageSync("allAwaitMovieList", this.data.allAwaitMovieList);
  },

  // 推荐数据请求
  async _fetchExpectMovie() {
    let res = await fetchExpectMovie(16);
    if (res.code == 406) {
      wx.showToast({ title: res.msg, icon: "none" });
      return;
    }
    this.setData({ expectMovieList: res.coming, paging: res.paging });
    wx.setStorageSync("expectMovieList", this.data.expectMovieList);
  },

  // 查看电影详情
  checkMovieDetailFn(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packageA/pages/movieDetail/movieDetail?id=${id}`,
      type: "navigate",
    });
  },

  // 获取影院列表
  async _fetchCinemasList() {
    let { cinemas } = await fetchCinemasList(this.data.offset, this.data.limit);
    this.setData({
      cinemas: [...this.data.cinemas, ...cinemas],
      comingLength: cinemas.length,
    });
  },

  // 过滤影院
  async _fetchFilterBrandCinemas() {
    let res = await fetchFilterBrandCinemas();
    if (!res.success) return;
    res.brand.subItems.map((item) => {
      item.value = item.text = item.name;
      return item;
    });
    this.setData({
      option2: res.brand.subItems,
      value2: res.brand.subItems[0].id,
    });
  },

  // 查看影院详情
  checkCinemasDetail(e) {
    wx.navigateTo({
      url: `/packageA/pages/cinemasDetail/cinemasDetail?id=${e.target.dataset.cinemasid}`,
    });
  },

  // 影院选择
  dropdownChangEv(e) {
    this.setData({ value2: e.detail, title: e.detail });
  },
});
