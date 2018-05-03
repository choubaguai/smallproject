const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://rental.xinlongcn.com/images/banner_1.jpg',
      'https://rental.xinlongcn.com/images/banner_2.png',
      'https://rental.xinlongcn.com/images/banner_3.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    phone:''
  },
  idle: function () {
    if (this.data.phone != null) {
      wx.navigateTo({
        url: '../idlehomes/idlehomes'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  bill: function () {
    if (this.data.phone != null) {
      wx.navigateTo({
        url: '../bill/bill'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  rent: function () {
    if (this.data.phone != null) {
      wx.navigateTo({
        url: '../rent/rent'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  maturity: function () {
    if (this.data.phone != null) {
      wx.navigateTo({
        url: '../maturity/maturity'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            phone: res.data
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})