var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    userName: '',
    userPassword: '',
    id_token: '',
    responseData: '',
    boo: false
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号码长度必须为11位',
      })
    } else if (e.detail.value.password.length < 6) {
      wx.showModal({
        title: '提示',
        content: '密码长度不足6位',
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      const that = this;
      wx.request({
        url: 'https://rental.xinlongcn.com/owner/login',
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

  register: function () {
    wx.navigateTo({
      url: '/pages/registration/registration'
    })

  },
  onLoad: function () {

  },
  onShow: function () {
    console.log('index is show')
  },

  onReady: function () {
    console.log('indx is on ready')
  },
  onHide: function () {
    console.log('index is on hide')
  },
  onUnload: function () {
    console.log('indx is on unload')
  },
  boo: function () {
    this.setData({
      boo: !this.data.boo
    });
  }
})