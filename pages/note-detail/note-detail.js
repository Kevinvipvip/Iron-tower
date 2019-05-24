const app = getApp()

Page({
  data: {
    content: '',
    note_id: 0,
    note: {},
    release_focus: false,
    input_bottom: 0,

    // 点赞
    like: false,
    like_loading: false,

    // 收藏
    collect: false,
    collect_loading: false
  },
  onLoad: function (options) {
    this.data.note_id = options.id;
    this.getNoteDetail();
    this.ifLike();
    this.ifCollect();
  },
  getNoteDetail() {
    let post = {
      token: app.user_data.token,
      id: this.data.note_id
    };

    app.ajax(app.my_config.api + 'note/getNoteDetail', post, (res) => {
      for (let i = 0; i < res.pics.length; i++) {
        res.pics[i] = app.my_config.base_url + '/' + res.pics[i];
      }

      this.setData({ note: res });
    });
  },
  bind_focus(e) {
    this.setData({ input_bottom: e.detail.height });
  },
  bind_input: function (e) {
    this.setData({ [e.currentTarget.dataset['name']]: e.detail.value || '' })
  },
  show_input() {
    this.setData({ release_focus: true });
  },
  hide_input() {
    this.setData({ release_focus: false });
  },
  commentAdd() {
    let post = {
      token: app.user_data.token,
      note_id: this.data.note_id,
      content: this.data.content
    };

    app.ajax(app.my_config.api + 'note/commentAdd', post, (res) => {
      app.toast('评论成功');
      this.setData({ content: '' });
      this.getNoteDetail();
    });
  },
  // 判断是否点赞
  ifLike() {
    let post = {
      note_id: this.data.note_id,
      token: app.user_data.token
    };

    app.ajax(app.my_config.api + 'note/ifLike', post, (res) => {
      this.setData({ like: res });
    });
  },
  // 点赞/取消
  iLike() {
    if (!this.data.like_loading) {
      this.data.like_loading = true;

      let post = {
        note_id: this.data.note_id,
        token: app.user_data.token
      };

      app.ajax(app.my_config.api + 'note/iLike', post, (res) => {
        this.setData({
          like: res,
          'note.like': this.data.note.like + (res ? 1 : -1)
        });
      }, null, () => {
        this.data.like_loading = false;
      });
    }
  },
  // 判断是否收藏
  ifCollect() {
    let post = {
      note_id: this.data.note_id,
      token: app.user_data.token
    };

    app.ajax(app.my_config.api + 'note/ifCollect', post, (res) => {
      this.setData({ collect: res });
    });
  },
  // 收藏/取消
  iCollect() {
    if (!this.data.collect_loading) {
      this.data.collect_loading = true;

      let post = {
        note_id: this.data.note_id,
        token: app.user_data.token
      };

      app.ajax(app.my_config.api + 'note/iCollect', post, (res) => {
        this.setData({ collect: res });
      }, null, () => {
        this.data.collect_loading = false;
      });
    }
  },
  onShareAppMessage() {
    wx.showShareMenu({
      withShareTicket: true,
      success: function () {
      }
    });

    return { path: app.share_path() };
  }
})