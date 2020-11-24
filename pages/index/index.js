var i = 1;
var innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.loop = true;
innerAudioContext.src = "http://static.wcip.net/mp3/132.mp3";
Page({
  data: {
    player: "语音播放"
  },
  onLoad: function() {
    wx.showShareMenu({
      withShareTicket: true,
      success: function() {}
    });
  },
  onUnload() {
    i = 1;
    innerAudioContext.stop();
  },
  player: function() {
    if (i == 1) {
      innerAudioContext.play();
      i++;
      this.setData({
        player: "暂停播放"
      })
    } else {
      innerAudioContext.pause();
      this.setData({
        player: "继续播放"
      })
      i = 1
    }
  }
})