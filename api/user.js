const request = require("./require.js");
module.exports.wxlogin = function (code) {
  return request({
    url: "http://127.0.0.1:5566/maoyan/wxlogin",
    method: "post",
    data: {
      code
    },
  });
};

module.exports.fetchPhoneNumber = function (sessionKey, encryptedData, iv) {
  return request({
    url: "http://127.0.0.1:5566/maoyan/getPhoneNumber",
    method: "post",
    data: {
      sessionKey,
      encryptedData,
      iv
    },
  });
};

module.exports.fetchOpenId = function (code) {
  return request({
    url: "http://127.0.0.1:5566/maoyan/getOpenid",
    method: "post",
    data: {
      code
    },
  });
};

module.exports.fetchUserWTSMovie = function () {
  return request({
    url: "https://maoyanapi.w0824.com/seeMovie",
  });
};

module.exports.fetchUserWxPay = function (movieid, openid) {
  return request({
    url: "https://maoyanapi.w0824.com/wxpay",
    method: "post",
    data: {
      movieid,
      openid,
    },
  });
};