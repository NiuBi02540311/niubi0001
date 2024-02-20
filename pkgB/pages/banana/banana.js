// pkgB/pages/banana/banana.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
 
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  modalinput: function () {
 
    this.setData({
     
    hiddenmodalput: !this.data.hiddenmodalput
     
    })
     
    },
     
    //取消按钮
     
    cancel: function () {
      console.log('cancel')
      this.setData({hiddenmodalput: true }) 
    },
     
    //确认
     
    confirm: function () {
     console.log('confirm')
    this.setData({hiddenmodalput: true })
     
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})