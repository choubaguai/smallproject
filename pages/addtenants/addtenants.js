// pages/addtenants/addtenants.js
import util from '../../utils/util.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    endDate: '',
    cycle: ['1月/次', '1季度/次', '1年/次'],
    index:0,
    house: null
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const that = this;
    if (e.detail.value.tenant_name.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入租客姓名',
      })
    } else if (e.detail.value.tenant_code.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入租客电话号码',
      })
    } else if (e.detail.value.id_card.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入租客身份证号码',
      })
    } else if (e.detail.value.collect_date.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入收租日期',
      })
    } else if (e.detail.value.rent.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入金额',
      })
    } else if (e.detail.value.cash_pledge.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入押金',
      })
    } else if (e.detail.value.rental_num.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入入住人数',
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://rental.xinlongcn.com/tenant/addTenant',
        data: {
          code: that.data.house.tenement_code,
          house_id: that.data.house.house_id,
          tenant_name: e.detail.value.tenant_name,
          tenant_code: e.detail.value.tenant_code,
          id_card: e.detail.value.id_card,
          start_date: e.detail.value.start_date,
          end_date: e.detail.value.end_date,
          collect_date: e.detail.value.collect_date,
          produce_cycle: that.data.cycle[that.data.index],
          rent: e.detail.value.rent,
          cash_pledge: e.detail.value.cash_pledge,
          rental_num: e.detail.value.rental_num,
          remark: e.detail.value.remark
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
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindCycleChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      house: JSON.parse(options.item),
      startDate: util.formatTime2(new Date),
      endDate: util.formatTime3(new Date),
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