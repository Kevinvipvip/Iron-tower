// component/zoomImgByView/zoomImgByView.js
/**
 * @author Lpoint
 */
var lastTouchPoint = { x: 0, y: 0 };
var newDist = 0;
var oldDist = 0;
var inTouch = false;    //是否处于触摸过程中，如果在触摸则不执行回弹动画
var getData = require("../../data/data.js");
var i = 1, endLatitude, endLongitude, endName;
var innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.loop = true;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图片地址
    img_src: {
      type: String
    },
    //可视区域的大小
    view_width: {
      type: String
    },
    view_height: {
      type: String
    },
    mark_list: {
      type: Array
		},
		point: {
			type: String
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgWidth:0,
    imgHeight:0,
    marginTop:0,
    marginLeft:0,
		palyTip:'解说',
		stop:'去这里',
		// flag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载完成方法
     */
    _imgLoadEvent: function (event) {
      lastTouchPoint = { x: 0, y: 0 };
      console.log(event.detail.height);
      var ratio;
      var heightRatio = event.detail.height / this.data.view_height;
      var widthRatio = event.detail.width / this.data.view_width;
      ratio = widthRatio;
      if (widthRatio > heightRatio) {
        ratio = heightRatio
      }
      this.setData({
        imgWidth: event.detail.width / ratio,
        imgHeight: event.detail.height / ratio,
        marginLeft: -(event.detail.width / ratio - this.data.view_width) / 2,
        marginTop: -(event.detail.height / ratio - this.data.view_height) / 2,
      })
      console.log(this.data.marginLeft + "===" + this.data.imgHeight);
      //打开定时器一直计算是否需要执行回弹动画
      setInterval(e => {
        if (!inTouch) {
          this._reboundAnimation(); 
        }
      }, 5)
    },
    /**
     * 触摸开始事件
     */
    _touchStartEvent: function () {
      inTouch = true
      lastTouchPoint = { x: 0, y: 0 }
      oldDist = 0
    },
    /**
     * 手指移动事件
     */
    _touchMoveEvent: function (e) {
      //单指移动事件
      if (e.touches.length == 1) {
        if (lastTouchPoint.x == 0 && lastTouchPoint.y == 0) {
          lastTouchPoint.x = e.touches[0].clientX
          lastTouchPoint.y = e.touches[0].clientY
        } else {
          var xOffset = e.touches[0].clientX - lastTouchPoint.x
          var yOffset = e.touches[0].clientY - lastTouchPoint.y
          this.setData({
            marginTop: this.data.marginTop + yOffset,
            marginLeft: this.data.marginLeft + xOffset,
          })
          lastTouchPoint.x = e.touches[0].clientX
          lastTouchPoint.y = e.touches[0].clientY
        }
        console.log(this.data.marginTop)
      }
      //双指缩放事件
      if (e.touches.length == 2) {
        if (oldDist == 0) {
          oldDist = this._spacing(e);
        } else {
          newDist = this._spacing(e);
          if (newDist > oldDist + 1) {
            this._zoom(newDist / oldDist, e);
            oldDist = newDist;
          }
          if (newDist < oldDist - 1) {
            this._zoom(newDist / oldDist, e);
            oldDist = newDist;
          }
        }
      }
    },
    // 点击mark
    toggle_mark_content(e) {
			innerAudioContext.stop();
			this.setData({
				palyTip: "播放"
			})
			i=1;
      let index = e.currentTarget.dataset.index;

			if (this.data.mark_list[index].show) {
				this.setData({ ['mark_list[' + index + '].show']: !this.data.mark_list[index].show });
			} else {
				for (let i = 0; i < this.data.mark_list.length; i++) {
					if (i === index) {
						this.data.mark_list[i].show = true;
					} else {
						this.data.mark_list[i].show = false;
					}
				}
				this.setData({ mark_list: this.data.mark_list });
			}      
    },

		//点击播放解说
		listen:function(e){
			console.log(e)
			let index = e.currentTarget.dataset.index;
			let point = e.currentTarget.dataset.point;
			innerAudioContext.src = getData.data[point][index].listenUrl;
			console.log(point)
			if(point == 0){
				if (i == 1) {
					innerAudioContext.play();
					i++;
					this.setData({
						palyTip: "暂停"
					})
				} else {
					innerAudioContext.pause();
					this.setData({
						palyTip: "播放"
					})
					i = 1
				}
			}else{
				let index = e.currentTarget.dataset.index;
				this.setData({ ['mark_list[' + index + '].show']: !this.data.mark_list[index].show });
				wx.showToast({
					title: '暂无语音',
					icon: 'none',
					duration: 2000
				})
			}
						
			innerAudioContext.onError((res) => {
				console.log(res.errMsg)
				console.log(res.errCode)
			})
		},

		//点击去这里的事件
		gotoThere: function (e) {
			let index = e.currentTarget.dataset.index;
			endLatitude = e.currentTarget.dataset.latitude;
			endLongitude = e.currentTarget.dataset.longitude;
			endName = e.currentTarget.dataset.title;
			this.setData({ ['mark_list[' + index + '].show']: !this.data.mark_list[index].show });
			// this.setData({
			// 	flag:true
			// })
			innerAudioContext.stop();
			this.setData({
				palyTip: "播放"
			})
			i = 1;
			// this.setData({
			// 	flag: false
			// })
			wx.navigateTo({
				url: '../map/map?latitude=' + endLatitude + '&longitude=' + endLongitude + '&title=' + endName
			})
		},
		// returnFalse:function(){
		// 	innerAudioContext.stop();
		// 	this.setData({
		// 		palyTip: "播放"
		// 	})
		// 	i = 1;
		// 	this.setData({
		// 		flag: false
		// 	})
		// },
		// confirm:function(){
		// 	innerAudioContext.stop();
		// 	this.setData({
		// 		palyTip: "播放"
		// 	})
		// 	i = 1;
		// 	this.setData({
		// 		flag: false
		// 	})
		// 	// wx.navigateTo({
		// 	// 	url: '../map/map?latitude=' + endLatitude + '&longitude=' + endLongitude + '&title=' + endName
		// 	// })
		// 	// wx.getLocation({
		// 	// 	type:'gcj02',
		// 	// 	success: function(res) {
		// 	// 		// console.log(res)
		// 	// 		wx.openLocation({
		// 	// 			latitude: res.latitude,
		// 	// 			longitude: res.longitude
		// 	// 		})
		// 	// 		wx.chooseLocation({
		// 	// 			success: function(res) {
		// 	// 				console.log(res.name)
		// 	// 				console.log(res.address)
		// 	// 				console.log(res.latitude)
		// 	// 				console.log(res.longitude)
		// 	// 			},
		// 	// 		})
		// 	// 	},
		// 	// })
		// },
    /**
     * 触摸事件结束
     */
    _touchEndEvent: function () {
      inTouch = false
    },
    /**
     * 计算x轴上的双指中心点比例
     */
    _calcXRatio: function (event) {
      var xRatio = ((event.touches[0].clientX + event.touches[1].clientX) / 2 - this.data.marginLeft) / this.data.imgWidth
      return xRatio
    },
    /**
     * 计算y轴上的双指中心点比例
     */
    _calcYRatio: function (event) {
      var yRatio = ((event.touches[0].clientY + event.touches[1].clientY) / 2 - this.data.marginTop) / this.data.imgHeight
      return yRatio
    },
    /**
     * 双指缩放
     */
    _zoom: function (f, event) {
      var xRatio = this._calcXRatio(event)
      var yRatio = this._calcYRatio(event)
      if (this.data.imgWidth <= this.data.view_width && f < 1) {
        var ratio = this.data.view_width / this.data.imgWidth
        this.setData({
          imgWidth: this.data.imgWidth * ratio,
          imgHeight: this.data.imgHeight * ratio
        })
        return;
      }
      if (this.data.imgHeight <= this.data.view_height && f < 1) {
        var ratio = this.data.view_height / this.data.imgHeight
        this.setData({
          imgWidth: this.data.imgWidth * ratio,
          imgHeight: this.data.imgHeight * ratio
        })
        return;
      }
      this.setData({
        //此处的ratio为双指中心点在图片的百分比
        marginLeft: this.data.marginLeft + xRatio * this.data.imgWidth * (1 - f),
        marginTop: this.data.marginTop + yRatio * this.data.imgHeight * (1 - f),
        imgWidth: this.data.imgWidth * f,
        imgHeight: this.data.imgHeight * f,
      })
      console.log(this.data.marginTop)
    },
    /**
     * 计算两指间距
     */
    _spacing: function (event) {
      var x = event.touches[0].clientX - event.touches[1].clientX;
      var y = event.touches[0].clientY - event.touches[1].clientY;
      return Math.sqrt(x * x + y * y);
    },
    /**
     * 边界的回弹动画
     */
    _reboundAnimation: function () {
      if (this.data.marginTop > 0) {
        this.setData({
          marginTop: this.data.marginTop - 4
        })
        if (this.data.marginTop - 4 < 0) {
          this.setData({
            marginTop: 0
          })
        }
      }
      if (this.data.marginLeft > 0) {
        this.setData({
          marginLeft: this.data.marginLeft - 4
        })
        if (this.data.marginLeft < 0) {
          this.setData({
            marginLeft: 0
          })
        }
      }
      if (this.data.marginLeft < 0 && (this.data.imgWidth - Math.abs(this.data.marginLeft)) < this.data.view_width) {
        this.setData({
          marginLeft: this.data.marginLeft + 4
        })
      }
      if (this.data.marginTop < 0 && (this.data.imgHeight - Math.abs(this.data.marginTop)) < this.data.view_height) {
        this.setData({
          marginTop: this.data.marginTop + 4
        })
      }
    },
  }
})
