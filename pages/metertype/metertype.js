// pages/estate/estate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: null,
    estateList: null, //放置返回数据的数组  
    house: null
  },

  tenants: function (e) {
    let str = JSON.stringify(e.currentTarget.dataset.data);
    wx.navigateTo({
      url: '../meterreading/meterreading?item=' + str
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      house: JSON.parse(options.item)
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
    this.getList();
  },


  //搜索，访问网络  
  getList: function () {
    let that = this;
    console.log(that.data.house.house_Id)
    wx.request({
      url: 'https://rental.xinlongcn.com/tenement/getTenementById',
      data: {
        house_id: that.data.house.house_Id,
        is_or_not_rent: 0,
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          estateList: res.data.list,
        })
      }
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