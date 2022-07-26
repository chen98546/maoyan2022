// components/filmCard/filmCard.js
Component({
  // 组件的属性列表
  properties: {
    allHotMovieList: { type: Object },
    isCheckEditBtn: { type: Boolean },
  },

  // 组件的初始数据
  data: {
    checkedList: [],
    disabledBtn: false,
  },

  // 组件的方法列表
  methods: {
    checkMovieDetailFn(e) {
      console.log(this.data.allHotMovieList);
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/packageA/pages/movieDetail/movieDetail?id=${id}`,
        type: "navigate",
      });
    },
    onCheckedFn(e) {
      this.setData({ checkedList: e.detail });
      if (this.data.checkedList.length) {
        this.setData({ disabledBtn: false });
      } else {
        this.setData({ disabledBtn: true });
      }
      this.triggerEvent("filmCard", {
        filmCardData: {
          checkedList: this.data.checkedList,
          disabledBtn: this.data.disabledBtn,
        },
      });
    },
  },
});
