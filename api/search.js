const request = require("./require.js");
module.exports.fetchSearchMovieFn = function (kw) {
  return request({
    // url: `https://www.maoyan.com/ajax/suggest?kw=${kw}&timeStamp=1656596441846&index=4&signKey=f3869d8f41bd2c8a787249214db49758&channelId=40011&sVersion=1&webdriver=false`,
    url: `https://i.maoyan.com/apollo/ajax/search?kw=${kw}&cityId=30&stype=-1`,
  });
};
