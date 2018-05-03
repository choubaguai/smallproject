// pages/addestate/addestate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室', '10室'],
    ['1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅', '10厅'],
    ['1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫', '10卫',]],
    index: 0,
    house_id: null,
    assets: null,
    multiIndex: [0, 0, 0],
    house_type: '1室，1厅，1卫'
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const that = this;
    that.setData({
      multiIndex: e.detail.value,
      house_type: that.data.multiArray[0][e.detail.value[0]] + '，' + that.data.multiArray[1][e.detail.value[1]] + '，' + that.data.multiArray[2][e.detail.value[2]]
    })
  },

  goAssets: function () {
    wx.navigateTo({
      url: '/pages/homeassets/homeassets',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  formSubmit: function (e) {
    const that = this;
    if (e.detail.value.tower_no.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入楼号',
      })
    } else if (e.detail.value.tenement_code.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入房号',
      })
    } else if (e.detail.value.tenement_area.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入面积',
      })
    } else if (e.detail.value.monthly_rent.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入月租金',
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://rental.xinlongcn.com/tenement/addTenement',
        data: {
          house_id: that.data.house_id,
          tower_no: e.detail.value.tower_no,
          tenement_code: e.detail.value.tenement_code,
          tenement_area: e.detail.value.tenement_area,
          monthly_rent: e.detail.value.monthly_rent,
          asset_name: e.detail.value.asset_name,
          house_type: that.data.house_type
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
            wx.navigateBack({
              delta: 1
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
    console.log(options.id)
    this.setData({
      house_id: options.id,
    })
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