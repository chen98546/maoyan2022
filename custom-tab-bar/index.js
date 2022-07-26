// Component({
//   data: {
//     selected: 0,
//     color: "#7A7E83",
//     selectedColor: "#3cc51f",
//     list: [
//       {
//         pagePath: "/pages/index/index",
//         iconPath: "/asset/images/home.png",
//         selectedIconPath: "/asset/images/home-active.png",
//         text: "首页",
//       },
//       {
//         pagePath: "/pages/video/video",
//         iconPath: "/asset/images/video.png",
//         selectedIconPath: "/asset/images/video-active.png",
//         text: "电影/影院",
//       },
//       {
//         pagePath: "/pages/show/show",
//         iconPath: "/asset/images/show.png",
//         selectedIconPath: "/asset/images/show-active.png",
//         text: "演出",
//       },
//       {
//         pagePath: "/pages/event/event",
//         iconPath: "/asset/images/event.png",
//         selectedIconPath: "/asset/images/event-active.png",
//         text: "体育/赛事",
//       },
//       {
//         pagePath: "/pages/user/user",
//         iconPath: "/asset/images/user.png",
//         selectedIconPath: "/asset/images/user-active.png",
//         text: "我的",
//       },
//     ],
//   },
//   attached() {},
//   methods: {
//     switchTab(e) {
//       const data = e.currentTarget.dataset;
//       const url = data.path;
//       wx.switchTab({ url });
//       this.setData({
//         selected: data.index,
//       });
//     },
//   },
// });

// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store.js";

Component({
  options: {
    // 覆盖vant默认样式
    styleIsolation: "shared",
  },

  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/asset/images/home.png",
        selectedIconPath: "/asset/images/home-active.png",
        text: "首页",
      },
      {
        pagePath: "/pages/video/video",
        iconPath: "/asset/images/video.png",
        selectedIconPath: "/asset/images/video-active.png",
        text: "电影/影院",
      },
      {
        pagePath: "/pages/show/show",
        iconPath: "/asset/images/show.png",
        selectedIconPath: "/asset/images/show-active.png",
        text: "演出",
      },
      {
        pagePath: "/pages/event/event",
        iconPath: "/asset/images/event.png",
        selectedIconPath: "/asset/images/event-active.png",
        text: "体育/赛事",
      },
      {
        pagePath: "/pages/user/user",
        iconPath: "/asset/images/user.png",
        selectedIconPath: "/asset/images/user-active.png",
        text: "我的",
      },
    ],
  },

  behaviors: [storeBindingsBehavior],

  // 获取共享的数据
  storeBindings: {
    store,
    fields: {
      tabbarIndex: "tabbarIndex",
    },
    actions: ["activeTabbarIndex"],
  },

  // 监听
  observers: {},

  // 组件的方法列表
  methods: {
    activeFn(event) {
      this.activeTabbarIndex(event.detail);
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      });
    },
  },
});
