const request = require("./require.js");
module.exports.fetchFilterBrandCinemas = function () {
  return request({
    url: `https://i.maoyan.com/ajax/filterCinemas?ci=30&optimus_uuid=998FABB0EA4711EC94C8BBCA8F5A2BAF24CB5E9CF50241BFA087C081B401718E&optimus_risk_level=71&optimus_code=10`,
  });
};

// module.exports.fetchCinemasDetail = function (offset, limit) {
//   return request({
//     url: `https://i.maoyan.com/ajax/moreCinemas?movieId=0&day=2022-06-28&offset=${offset}&limit=${limit}&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1656399540187&cityId=30&optimus_uuid=998FABB0EA4711EC94C8BBCA8F5A2BAF24CB5E9CF50241BFA087C081B401718E&optimus_risk_level=71&optimus_code=10`,
//   });
// };

module.exports.fetchCinemasList = function (offset, limit) {
  return request({
    url: `https://m.maoyan.com/ajax/cinemaList?offset=${offset}&limit=${limit}`,
  });
};
module.exports.fetchCinemasDetail = function (cinemaId) {
  return request({
    url: `https://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}`,
  });
};
