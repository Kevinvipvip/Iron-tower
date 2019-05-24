// pages/main/main.js
var getData = require('../../data/data.js');
var flag = true;
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "",
    viewHeight: 0,
    viewWidth: 0,
    point: 0,
    num: 0,
    pointNum: 0,
    markList: [],
    bottomList: []
  },
  choicePoint: function(e) {
    var name = e.target.dataset.name;
    var point = getData.data[name];
    console.log(name)
    this.setData({
      markList: point,
      num: '0',
      point: name,
      pointNum: name
    })
    flag = true;
  },
  openMore: function(e) {
    if (flag) {
      this.setData({
        num: '1'
      })
      flag = !flag
    } else {
      this.setData({
        num: '0'
      })
      flag = !flag
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      markList: getData.data[0],
      bottomList: getData.bottomList
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          viewHeight: res.windowHeight,
          viewWidth: res.windowWidth,
          imgSrc: "/images/map.jpg"
        })
      }
    })
  },
  openScenic: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  openNote: function() {
    wx.navigateTo({
      url: '../notes/notes',
    })
  },
  openRoute: function() {
    wx.navigateTo({
      url: '../visit/visit',
    })
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