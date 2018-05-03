// pages/estate/estate.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    estateList: null //放置返回数据的数组  

  },
  houses: function (e) {
    let str = JSON.stringify(e.currentTarget.dataset.data);
    console.log(str)
    wx.navigateTo({
      url: '../metertype/metertype?item=' + str
    })
  },

  getList: function () {
    let that = this;
    wx.request({
      url: 'https://rental.xinlongcn.com/house/getHouseById/' + that.data.phone,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          estateList: res.data.list,
        })
        if (res.data.code == 1) {
          wx.showToast({
            title: '暂无房产',
          })
        }
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
    let that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            phone: res.data
          })
          that.getList();
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