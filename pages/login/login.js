const app = getApp();

Page({
  data: {},
  onLoad: function (options) {
    let route = decodeURIComponent(options.route);
    app.login((res) => {
      app.user_data.token = res;

      wx.redirectTo({ url: '/' + route })
    });
  }
})