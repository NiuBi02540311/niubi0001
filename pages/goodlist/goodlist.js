// pages/goodlist/goodlist.js
Page({
  options:{
    styleIsolation:"shared"
  },
  /**
   * 页面的初始数据
   */
  data: {
    query: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      query : options
    })
  },
  onLoad22: function(option){
    console.log(option.id)//1
    console.log(option.name)//Janson
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  },
  onClickLeft() {
    //wx.showToast({ title: '点击返回', icon: 'none' });
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onClickRight() {
    //wx.showToast({ title: '点击按钮', icon: 'none' });
    wx.navigateTo({
      url: '/pages/goodadd/goodadd',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.name,
    })
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