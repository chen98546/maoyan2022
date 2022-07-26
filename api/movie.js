const request = require("./require.js");

// 首页热门电影
module.exports.fetchHotMovie = function () {
  return request({
    // url: "https://m.maoyan.com/ajax/topRatedMovies",
    url: "https://m.maoyan.com/ajax/movieOnInfoList",
  });
};
// 首页推荐电影
module.exports.fetchExpectMovie = function (limit) {
  return request({
    url: `https://m.maoyan.com/ajax/mostExpected?ci=30&limit=${limit}&optimus_uuid=0EBC6C50362911EA9BE0C38C17C05E2EEA46F45F99614B618B06BBA29C86C236&optimus_risk_level= 71&optimus_code=10&token=''`,
  });
};
// 首页待映电影
module.exports.fetchAwaitMovie = function (limit) {
  return request({
    url: `https://m.maoyan.com/ajax/comingList?ci=30&limit=${limit}&optimus_uuid=0EBC6C50362911EA9BE0C38C17C05E2EEA46F45F99614B618B06BBA29C86C236&optimus_risk_level= 71&optimus_code=10&token=''`,
  });
};
// 首页精彩演出
module.exports.fetchWonderfulMovie = function () {
  return request({
    url:
      "https://show.maoyan.com/maoyansh/myshow/ajax/performances/0;st=4;p=1;s=20;tft=0?pageSource=1&sellChannel=13&cityId=30&lng=0&lat=0",
  });
};
// 首页沉浸体验
module.exports.fetchTheatreMovie = function () {
  return request({
    url:
      "https://show.maoyan.com/maoyansh/myshow/ajax/performances/calendar/0;pageNo=1;pageSize=40;st=10;timeFilterType=4?uuid=ceabhpih72w93tksuj71nysu3wmc4xl3g1ndi61qh8vsdla787440ljyf4q9oic1&clientType=4&os=2&sellChannel=13&cityId=30&lng=0&lat=0",
  });
};

// 电影页热映电影
module.exports.fetchAllHotMovie = function (movieid) {
  return request({
    url: `https://i.maoyan.com/ajax/moreComingList?token=&movieIds=${movieid}&optimus_uuid=998FABB0EA4711EC94C8BBCA8F5A2BAF24CB5E9CF50241BFA087C081B401718E&optimus_risk_level=71&optimus_code=10`,
  });
};
// 电影页待映电影
module.exports.fetchAllAwaitMovie = function (movieid) {
  return request({
    url: `https://i.maoyan.com/ajax/moreComingList?ci=30&limit=10&movieIds=${movieid}&optimus_uuid=0EBC6C50362911EA9BE0C38C17C05E2EEA46F45F99614B618B06BBA29C86C236&optimus_risk_level=71&optimus_code=10&token=`,
  });
};

// 电影详情
module.exports.fetchMovieDetail = function (id) {
  return request({
    // url:`https://m.maoyan.com/api/mtrade/mmdb/movie/v5/${id}.json`
    url: `https://m.maoyan.com/ajax/detailmovie?movieId=${id}`,
  });
};

// 加入想看电影
module.exports.fetchWantToSeeMovieFn = function (movieid) {
  return request({
    url: `https://maoyanapi.w0824.com/updSeeMovie`,
    method: "post",
    data:{movieid}
  });
};

// 电影页热映电影
// module.exports.fetchAllHotMovie = function (page = 1, pagesize = 10) {
//   return request({
//     url: `http://127.0.0.1:5566/maoyan/comingList?page=${page}&pagesize=${pagesize}`,
//   });
// };
