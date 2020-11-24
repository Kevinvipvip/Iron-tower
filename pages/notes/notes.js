const app = getApp();

Page({
  data: {
    full_loading: true,

    left_note_list: [],
    right_note_list: [],
    page: 1,
    nomore: false,
    nodata: false,
    loading: false
  },
  onLoad() {
    this.getNoteList(() => {
      this.setData({
        full_loading: false
      });
    });
  },
  onShow() {},
  bind_input(e) {
    this.setData({
      [e.currentTarget.dataset['name']]: e.detail.value || ''
    })
  },
  getuserinfo() {
    wx.redirectTo({
      url: '/pages/note-publish/note-publish',
    })
  },
  getNoteList(complete) {
    let post = {
      token: app.user_data.token,
      page: this.data.page,
      perPage: 10
    };

    app.ajax(app.my_config.api + 'note/getNoteList', post, (res) => {
      if (res.list.length === 0) {
        if (this.data.page === 1) {
          this.setData({
            nodata: true
          });
        } else {
          app.toast('暂无更多');
          this.setData({
            nomore: true
          });
        }
      } else {
        for (let i = 0; i < res.list.length; i++) {
          if (res.list[i].pics[0]) {
            res.list[i].pics[0] = app.my_config.base_url + '/' + res.list[i].pics[0];
          } else {
            res.list[i].pics[0] = app.my_config.default_img;
          }

          if (i % 2 === 0) {
            this.data.left_note_list.push(res.list[i]);
          } else {
            this.data.right_note_list.push(res.list[i]);
          }
        }

        this.setData({
          left_note_list: this.data.left_note_list,
          right_note_list: this.data.right_note_list
        });
      }

      this.data.page++;
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    if (!this.data.loading) {
      this.data.loading = true;

      this.data.nomore = false;
      this.data.nodata = false;
      this.data.page = 1;
      this.data.left_note_list = [];
      this.data.right_note_list = [];

      wx.showNavigationBarLoading();
      this.getNoteList(() => {
        this.data.loading = false;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      });
    }
  },
  // 上拉加载
  onReachBottom() {
    if (!this.data.nomore && !this.data.nodata) {
      if (!this.data.loading) {
        this.data.loading = true;
        wx.showNavigationBarLoading();
        this.getNoteList(() => {
          wx.hideNavigationBarLoading();
          this.data.loading = false;
        });
      }
    }
  },
  // 发布笔记后刷新列表，区别于下拉刷新（不需要loading等操作）
  refresh() {
    this.data.nomore = false;
    this.data.nodata = false;
    this.data.page = 1;
    this.data.left_note_list = [];
    this.data.right_note_list = [];
    this.getNoteList();
  },
  onShareAppMessage() {
    wx.showShareMenu({
      withShareTicket: true,
      success: function() {}
    });

    return {
      path: app.share_path()
    };
  }
})