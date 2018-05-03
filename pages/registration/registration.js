// pages/addestate/addestate.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    responseData: '',

  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.name.length == 0){
      wx.showModal({
        title: '提示',
        content: '用户名不能为空',
      })
    } else if (e.detail.value.phone.length != 11){
      wx.showModal({
        title: '提示',
        content: '手机号码长度必须为11位',
      })
    } else if (e.detail.value.password.length < 6){
      wx.showModal({
        title: '提示',
        content: '密码长度不足6位',
      })
    }else{
      wx.showLoading({
        title: '加载中',
      })
      const that = this;
      wx.request({
        url: 'https://rental.xinlongcn.com/owner/addOwner',
        data: e.detail.value,
        method: 'POST',
        header: { "content-type": "application/x-www-form-urlencoded" },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == 1) {
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          } else {
            app.globalData.phone = e.detail.value.phone
            app.globalData.isLogin = !app.globalData.isLogin;
            wx.setStorage({
              key: 'phone',
              data: e.detail.value.phone,
            })
            wx.showToast({
              title: res.data.message,
            })
            wx.switchTab({
              url: "/pages/index/index",
            })
          }
        }
      })
    }
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