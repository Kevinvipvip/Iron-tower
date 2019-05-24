const app = getApp()

Page({
  data: {
    imgbox: '',
    title: '',
    content: '',
    plat: ''
  },
  onLoad: function (options) {
    let phone = wx.getSystemInfoSync();
    this.setData({plat: phone.platform});
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var picid = e.currentTarget.dataset.pic;
    var that = this;

    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        if (res.tempFiles[0].size > 524288) {
          app.toast('上传的图片不能大于512K');
        } else {
          wx.showLoading({
            title: '上传中',
            mask: true
          });
          wx.uploadFile({
            url: app.my_config.api + 'api/uploadImage',
            filePath: res.tempFiles[0].path,
            name: 'file',
            formData: {
              token: app.user_data.token
            },
            success(res) {
              res = JSON.parse(res.data);

              if (imgbox.length == 0) {
                imgbox = [app.my_config.base_url + '/' + res.data.path];
              } else if (9 > imgbox.length) {
                imgbox = imgbox.concat(app.my_config.base_url + '/' + res.data.path);
              } else {
                imgbox[picid] = app.my_config.base_url + '/' + res.data.path;
              }

              that.setData({
                imgbox: imgbox
              });
            },
            fail: function () {
              app.toast('上传失败');
            },
            complete: function () {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },
  noteRelease() {
    if (!this.data.title.trim()) {
      app.toast('请填写笔记标题');
    } else if (!this.data.content.trim()) {
      app.toast('请填写笔记内容');
    } else if (this.data.imgbox.length == 0) {
      app.toast('请至少上传一张图片');
    } else {
      let user = wx.getStorageSync('USER_INFO');

      let post = {
        title: this.data.title,
        content: this.data.content,
        token: app.user_data.token,
        pics: this.get_img_arr()
      };

      app.ajax(app.my_config.api + 'note/noteRelease', post, (res) => {
        let notes = app.get_page('pages/notes/notes');
        if (notes) {
          notes.refresh();
        }
        wx.redirectTo({ url: '/pages/notes/notes' });
      });
    }
  },
  get_img_arr() {
    var img_arr = [];
    for (let i = 0; i < this.data.imgbox.length; i++) {
      img_arr.push(this.data.imgbox[i].replace(app.my_config.base_url + '/', ''));
    }
    return img_arr;
  },
  // common start
  bind_input: function (e) {
    this.setData({ [e.currentTarget.dataset['name']]: e.detail.value || '' })
  }
})