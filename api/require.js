module.exports = (options) => {
  let token = wx.getStorageSync("token");
  return new Promise((resolve, reject) => {
    wx.showLoading({
      mask: true,
      title: "数据加载中",
    });

    let data = {
      ...options,
      success(res) {
        if (res.data == "\n") {
          wx.showToast({
            title: "数据请求超时",
            icon: "error",
          });
          return;
        }
        resolve(res.data);
      },
      fail(res) {
        console.log(222, res);
        reject(res);
        if (res.errMsg == "request:fail timeout") {
          wx.showToast({
            title: "网络链接超时",
            icon: "error",
          });
          return;
        }
        if (res.errMsg == "request:fail ") {
          wx.showToast({
            title: "数据请求失败",
            icon: "error",
          });
          return;
        }
      },
      complete(res) {
        _errCode(res);
        wx.hideLoading();
      },
    };
    if (token) {
      data.header = {
        authorization: token,
        // Cookie: [
        //   "uuid_n_v=v1; path=/; expires=Sat 23 Jul 2022 08:26:29 GMT",
        //   "iuuid=2E0B9AE0F2CE11EC974BBD4B322A9887F8A3DA2AA425480C8BF3ED2B6DE335AA; path=/; expires=Sun 20 Jun 2032 08:26:29 GMT",
        //   "webp=; path=/; expires=Thu 01 Jan 1970 00:00:00 GMT",
        //   "selectci=; path=/; expires=Thu 01 Jan 1970 00:00:00 GMT; domain=.maoyan.com",
        //   "selectci=; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=m.maoyan.com",
        //   "selectci=; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=maoyan.com",
        //   "selectci=; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=m.maoyan.com",
        //   "selectci=; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT",
        //   "ci=; path=/; expires=Thu 01 Jan 1970 00:00:00 GMT; domain=.maoyan.com",
        //   "ci=30%2C%E6%B7%B1%E5%9C%B3; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=m.maoyan.com",
        //   "ci=30%2C%E6%B7%B1%E5%9C%B3; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=maoyan.com",
        //   "ci=30%2C%E6%B7%B1%E5%9C%B3; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT; domain=m.maoyan.com",
        //   "ci=30%2C%E6%B7%B1%E5%9C%B3; path=/; expires=Sat 22 Jun 2024 08:26:29 GMT",
        //   "featrues=[object Object]; path=/; domain=.maoyan.com; httponly",
        // ],
      };
    }
    wx.request(data);
  });
};

function _errCode(data) {
  switch (data.errcode) {
    case 200:
      break;
    case 40001:
      wx.showToast({
        title: "请登录后重试",
      });
      break;
    default:
  }
}
