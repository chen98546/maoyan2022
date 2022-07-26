// 节流
module.exports.throttle = function (fn, delay) {
  var lastTime = 0;
  return function () {
    var nowTime = Date.now();
    var context = this;
    if (nowTime - lastTime > delay) {
      fn.apply(context, arguments);
      lastTime = nowTime;
    }
  };
};
