const request = require("./require.js");
module.exports.fetchAddressFn = function (latitude, longitude) {
  return request({
    url: `http://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&ak=WEc8RlPXzSifaq9RHxE1WW7lRKgbid6Y`,
  });
};
