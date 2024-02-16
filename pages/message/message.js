// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '家中物品管理-消息',
    })
    // 显示 （发送给朋友）（分享到朋友圈）按钮，前提需要微信认证才能使用
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   menus: ['shareAppMessage', 'shareTimeline']
    //  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      //唯一标识（其它设置不同的整数）  
      selected: 1
    })
  }
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
// 分享
onShareAppMessage() {
	return {
	    title: '转发给你的朋友',
	    path: '/pkgA/pages/dog/dog?id=123',
		  // imageUrl: '',
	}
},
// 分享到朋友圈
onShareTimeline(){
	return {
		title: '分享到朋友圈',
		query: '/pkgA/pages/dog/dog?id=123',
		// imageUrl: '',
	}
}
})