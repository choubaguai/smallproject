// pages/tenants/tenants.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house:null,
    tenant: null,
    showButton: true
  },

  addtenants: function(e){
    let that = this;
    let str = JSON.stringify(that.data.house);
    console.log(str)
    wx.navigateTo({
      url: '../addtenants/addtenants?item=' + str
    })
  },
  tenantdetail: function (e) {
    let that = this;
    let str = JSON.stringify(that.data.tenant);
    wx.navigateTo({
      url: '../tenantdetail/tenantdetail?item=' + str
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let json = JSON.parse(options.item)
    console.log(json)
    this.setData({
      house: json
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  getTenement: function(){
    let that = this
    wx.request({
      url: 'https://rental.xinlongcn.com/tenant/findByTenementById/' + that.data.house.tenement_id,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(res.data.code == 0){
          that.setData({
            tenant: res.data.tenant,
            showButton: false  
          })
          console.log(that.data.tenant)

        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTenement()
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