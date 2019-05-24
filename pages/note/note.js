Page({
  data: {
    dataimg: '',//图片地址
    distance: 0,//手指移动的距离
    scale: 1,//图片的比例
    baseWidth: null,//图片真实宽度
    baseHeight: null,//图片真实高度
    scaleWidth: '',//图片设显示宽度
    scaleHeight: '',//图片设显示高度
  },
  onLoad() {
    var that = this;
    that.setData({
      dataimg: '/images/map.jpg',
    })
  },
  /**
   * 监听图片加载成功时触发
   */
  imgload: function(e) {
    this.setData({
      'baseWidth': e.detail.width, //获取图片真实宽度
      'baseHeight': e.detail.height, //获取图片真实高度
      'scaleWidth': '100%', //给图片设置宽度
      'scaleHeight': '100%' //给图片设置高度
    })
  },
  /**
   * 双手指触发开始 计算开始触发两个手指坐标的距离
   */
  touchstartCallback: function(e) {
    // 单手指缩放开始，不做任何处理
    if (e.touches.length == 1) return;
    // 当两根手指放上去的时候，将距离(distance)初始化。
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //计算开始触发两个手指坐标的距离
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'distance': distance,
    })
  },
  /**
   * 双手指移动   计算两个手指坐标和距离
   */
  touchmoveCallback: function(e) {
    // 单手指缩放不做任何操作
    if (e.touches.length == 1) return;
    //双手指运动 x移动后的坐标和y移动后的坐标
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //双手指运动新的 ditance
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    //计算移动的过程中实际移动了多少的距离
    let distanceDiff = distance - this.data.distance;
    let newScale = this.data.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
    if (newScale >= 1) {
      newScale = 1
      let scaleWidth = newScale * this.data.baseWidth + 'px'
      let scaleHeight = newScale * this.data.baseHeight + 'px'
      this.setData({
        'distance': distance,
        'scale': newScale,
        'scaleWidth': scaleWidth,
        'scaleHeight': scaleHeight,
        'diff': distanceDiff
      })
    }
    //为了防止缩放得太小，所以scale需要限制
    if (newScale <= 0.3) {
      newScale = 0.3
      this.setData({
        'distance': distance,
        'scale': newScale,
        'scaleWidth': '100%',
        'scaleHeight': '100%',
        'diff': distanceDiff
      })
    }
  }
})