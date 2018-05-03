// pages/addestate/addestate.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['住宅/小区/公寓', '商铺/门面房', '写字楼/办公室', '仓库/车库', '摊位'],
    index: '住宅/小区/公寓',
    houseName: " ",
    houseAddress: "  ",
    houseType:0,
    phone: null,
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.houseName.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入或者选择房产名称',
      })
    } else if (e.detail.value.houseAddress.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入房产地址',
      })
    } else if (e.detail.value.code.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入房产地址',
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      const that = this;
      wx.request({
        url: 'https://rental.xinlongcn.com/house/addHouse',
        data: {
          phone: that.data.phone,
          code: e.detail.value.code,
          houseName: e.detail.value.houseName,
          houseAddress: e.detail.value.houseAddress,
          houseType: that.data.houseType,
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == 1) {
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          } else {
            wx.showToast({
              title: res.data.message,
            })
            wx.switchTab({
              url: "/pages/estate/estate",
            })
          }
        }
      })
    }



  },

  bindPickerChange: function (e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: that.data.array[e.detail.value],
      houseType: e.detail.value
    })
  },

  getAddress: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          houseName: res.name,
          houseAddress: res.address,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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