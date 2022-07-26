import {
  fetchHotMovie,
  fetchAwaitMovie,
  fetchExpectMovie,
  fetchWonderfulMovie,
  fetchTheatreMovie,
} from "../../api/movie.js";
import { throttle } from "../../utils/methods.js";

import { fetchAddressFn } from "../../api/address.js";

Page({
  // 页面的初始数据
  data: {
    bgColorArr: [
      "#d45436",
      "#525f62",
      "#d45436",
      "#d4ccb6",
      "#a2dffd",
      "#ce3237",
    ],
    swiperData: [
      {
        id: "banner1",
        src: "/asset/images/banner1.png",
      },
      {
        id: "banner2",
        src: "/asset/images/banner2.png",
      },
      {
        id: "banner3",
        src: "/asset/images/banner3.png",
      },
      {
        id: "banner4",
        src: "/asset/images/banner4.png",
      },
      {
        id: "banner5",
        src: "/asset/images/banner5.png",
      },
      {
        id: "banner6",
        src: "/asset/images/banner6.png",
      },
    ],
    detailedAddressData: {},
    city: "未定位",
    value: "", // 搜索
    selectBgcColor: "#d45436", // 轮播图选中背景色
    tabBgColorIsTrue: false, // tab背景显示
    active: 0, // tab选中状态
    // 热门电影
    hotMovieList: [],
    hotMovieTotal: 0, // 总数
    // 最受期待电影
    expectMovieList: [],
    paging: "", // 总数和其他属性
    // 待映
    awaitMovieList: [],
    // 演出
    wonderfulMovieList: [],
    // 剧场
    theatreMovieList: [],
    wantToSeemovieTag: "",
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.getLocation({
      type: "gcj02",
      success: async (res) => {
        let { result } = await fetchAddressFn(res.latitude, res.longitude);
        this.setData({
          detailedAddressData: result,
          city: result.addressComponent.city,
        });
      },
    });
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    this._fetchHotMovie();
    this._fetchAwaitMovie();
    this._fetchExpectMovie();
    this._fetchWonderfulMovie();
    this._fetchTheatreMovie();
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
  onReachBottom: function () {},

  // 用户点击右上角分享
  onShareAppMessage: function () {},

  onPageScroll: throttle(function (e) {
    if (e.scrollTop > 80 && this.data.active == 0) {
      this.setData({tabBgColorIsTrue: true});
    } else {
      this.setData({tabBgColorIsTrue: false});
    }
  }, 30),

  swiperChangeFn(e) {
    this.data.bgColorArr.findIndex((item, index) => {
      if (e.detail.current == index)
        this.setData({
          selectBgcColor: item,
        });
    });
  },

  changIndexFn(e) {
    this.setData({
      active: e.detail.index,
    });

    if (this.data.active != 0) {
      this.setData({
        tabBgColorIsTrue: true,
      });
    } else {
      this.setData({
        tabBgColorIsTrue: false,
      });
    }
  },

  async _fetchHotMovie() {
    let res = await fetchHotMovie();
    let wantToSeemovie = wx.getStorageSync("wantToSeemovie");
    res.movieList
      .filter((item) => {
        wantToSeemovie.indexOf(item.id) !== -1;
      })
      .map((item) => {
        item.wantToSeemovieTag = "已想看";
        return item;
      });
    this.setData({
      hotMovieList: res.movieList,
      hotMovieTotal: res.total,
    });
  },

  async _fetchExpectMovie() {
    let res = await fetchExpectMovie(16);
    if (res.code == 406) {
      wx.showToast({
        title: res.msg,
        icon: "none",
      });
      return;
    }
    this.setData({
      expectMovieList: res.coming,
      paging: res.paging,
    });
  },

  async _fetchAwaitMovie() {
    let res = await fetchAwaitMovie(10);

    if (res.code == 406) {
      wx.showToast({
        title: res.msg,
        icon: "none",
      });
      return;
    }
    this.setData({
      awaitMovieList: res.coming,
    });
  },

  async _fetchWonderfulMovie() {
    let res = await fetchWonderfulMovie();
    this.setData({
      wonderfulMovieList: res.data,
    });
  },

  async _fetchTheatreMovie() {
    let res = await fetchTheatreMovie();
    this.setData({
      theatreMovieList: res.data,
    });
  },

  checkMovieDetailFn(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packageA/pages/movieDetail/movieDetail?id=${id}`,
      type: "navigate",
    });
  },

  checkMoreFn(e) {
    let active = e.target.dataset.active;
    wx.reLaunch({
      url: `/pages/video/video?active=${active}`,
    });
  },

  ticketBtnEv(e) {
    // if (e.target.dataset.state.content == "购票") {
    // }
    console.log(123, e.target.dataset.state.content);
  },
});
