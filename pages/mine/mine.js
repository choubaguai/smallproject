// pages/addestate/addestate.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "https://rental.xinlongcn.com/images/ic_account_circle_48px.svg"
    },
    container: false,
    login_reg: true,
    phone: '点我登录'
  },

  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  getPhoneNumber: function (e) {
    wx.request({
      url: 'https://rental.xinlongcn.com/owner/decodeUserInfo',
      data: {
        'encrypted': e.detail.encryptedData,
        'session_key': app.globalData.code,
        'iv': e.detail.iv
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.status == 0) {//我后台设置的返回值为1是正确
          //存入缓存即可
          wx.setStorageSync('phone', res.phone);
        }
      },
      fail: function (err) {
        console.log(err);
      }
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
    const that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            userInfo: app.globalData.userInfo,
            phone: res.data,
            login_reg: false
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