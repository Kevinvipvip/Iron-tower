App({
  onLaunch: function () {
  },
  my_config: {
    base_url: 'https://www.caves.vip',
    api: 'https://www.caves.vip/kaifeng/api.',
    default_img: '/images/default.jpg',
    reg: {
      tel: /^1\d{10}$/,
      email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    }
  },
  user_data: {
    token: ''
  },
  toast(title, duration) {
    let dura = duration || 2000;
    wx.showToast({
      title: String(title),
      icon: 'none',
      duration: dura
    })
  },
  modal(content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success() {
        if (callback) {
          callback();
        }
      }
    });
  },
  ajax(path, data, succ, err, complete) {
    let that = this;
    wx.request({
      url: path,
      method: 'POST',
      dataType: 'json',
      data: data,
      success(res) {
        if (res.data.code !== 1) {
          if (err) {
            err(res.data);
          } else {
            switch (res.data.code) {
              case -3:  // token失效
              case -5:  // token未传
                let current_pages = getCurrentPages();
                let current_page = current_pages[current_pages.length - 1];
                wx.redirectTo({ url: '/pages/login/login?route=' + encodeURIComponent(current_page.route + that.obj2query(current_page.options)) });
                break;
              default:
                if (res.data.message) {
                  that.toast(res.data.message);
                } else {
                  that.toast('网络异常');
                }
                break;
            }
          }
        } else {
          if (succ) {
            succ(res.data.data);
          }
        }
      },
      fail: function () {
        that.toast('网络异常');
      },
      complete: function () {
        if (complete) {
          complete();
        }
      }
    });
  },
  // 获取打开的页面
  get_page(page_name) {
    let pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].route === page_name) {
        return pages[i];
      }
    }
    return false;
  },
  // 用户是否授权获取用户信息
  get_auth(callback) {
    wx.getSetting({
      success(res) {
        callback(res.authSetting['scope.userInfo']);
      }
    })
  },
  get_code(callback) {
    wx.login({
      success(login) {
        callback(login.code);
      }
    });
  },
  // 小程序登录获取token
  login(callback) {
    this.get_code((code) => {
      let post = {
        code: code
      };

      this.ajax(this.my_config.api + 'login/login', post, (res) => {
        callback(res.token);
      });
    })
  },
  // 授权获取用户信息
  userAuth(callback) {
    let that = this;
    wx.getUserInfo({
      success(user) {
        let post = {
          token: that.user_data.token,
          iv: user.iv,
          encryptedData: user.encryptedData
        };
        that.ajax(that.my_config.api + 'login/userAuth', post, () => {
          callback(true);
        }, () => {
          callback(false);
        });
      }
    });
  },
  // 用户是否授权（后端）
  checkUserAuth(callback) {
    let post = {
      token: this.user_data.token
    };
    this.ajax(this.my_config.api + 'login/checkUserAuth', post, (res) => {
      callback(res);
    });
  },
  // 公共分享方法
  share_path() {
    let current_pages = getCurrentPages();
    let current_page = current_pages[current_pages.length - 1];
    return '/pages/auth/auth?route=' + encodeURIComponent(current_page.route + this.obj2query(current_page.options));
  },
  /* 内部方法 */
  // 对象转query字符串
  obj2query(obj) {
    let query = '';
    for (let key in obj) {
      query += key + '=' + obj[key] + '&';
    }
    if (!query) {
      return '';
    } else {
      return '?' + query.substr(0, query.length - 1);
    }
  }
})