import { action, observable } from "mobx-miniprogram";
export const store = observable({
  // 共享的数据
  tabbarIndex: 0,
  // 修改数据
  activeTabbarIndex: action(function (tabbarIndex) {
    this.tabbarIndex = tabbarIndex;
  })
});
