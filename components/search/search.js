Component({
  options: {
    styleIsolation: "shared",
  },
  // 组件的属性列表
  properties: {
    tabBgColorIsTrue: {
      type: Boolean,
    },
    city: {
      type: String,
    },
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {
    focusToSearchPage() {
      wx.navigateTo({
        url: "/packageA/pages/searchDetail/searchDetail",
      });
    },
  },
});
