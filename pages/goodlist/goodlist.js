// pages/goodlist/goodlist.js
import  Toast  from '@vant/weapp/toast/toast';
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  height:'100%' ,
  options:{
    styleIsolation:"shared"
  },
  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    goodsList: [],
    nowPage:  1,  pageSize : 5, rowcount  : -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      query : options
    })
    this.getList()
  },
  async  getList(){
    // 请求数据后
    // 关闭下拉刷新的窗口
    let that = this;//在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    if(this.data.goodsList.length == this.data.rowcount){
      // Toast.loading({
      //   message: '全部加载完毕22',
      //   forbidClick: true,
      // })
      Notify({ type: 'success', message: '数据已全部加载完毕',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
      // onClick() {
      //   //wx.pageScrollTo({ scrollTop: 0 })
      // }
      });
      wx.stopPullDownRefresh();
      return
    }
    wx.showLoading({ title: '数据加载中' })
    const pid = that.data.query.id
    const openid = wx.getStorageSync('openid') 
    const {data:res} = await wx.p.request({
      url: `http://localhost:57526/Test/getGoodDatalist?pid=${pid}&openid=${openid}&nowPage=${that.data.nowPage}&pageSize=${that.data.pageSize}`,
      method:'GET'
    })
   
    //  var obj = new { rowcount = data.Count, data = v };
    //console.log(res)
    const all = [...that.data.goodsList,...res.data]
    const index = that.data.nowPage +1
    const rowcount = res.rowcount
    that.setData({ goodsList:all,nowPage:index,rowcount : rowcount })
    //console.log(that.data.goodsList)
    
		setTimeout(function () {
      console.log('stopPullDownRefresh');
      wx.hideLoading()
			wx.stopPullDownRefresh();
		}, 1000);
    
  }, 
  NotifyonClick(){
    wx.pageScrollTo({ scrollTop: 0 })
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
  onClickRight(e) {
    //wx.showToast({ title: '点击按钮', icon: 'none' });
    const pid = this.data.query.id
    wx.navigateTo({
      url: '/pages/goodadd/goodadd?id=' + pid,
    })
  },
  editHandler(e){
    wx.navigateTo({
      url: '/pages/goodedit/goodedit?id=' + e.target.dataset.id,
    })

  },
  deleteHandler(e){
    console.log(e)
    const id = e.target.dataset.id
    const title = e.target.dataset.title
    Dialog.confirm({
      title: '删除提示',
      message: '确定要删除 ('+ title +') ?',
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
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
    //在测试的时候,第一次分页加载实现了,后面都没有实现,在排查之后,发现经过第一次的分页之后this.data.page即当///前页面变为了3,在刷新页面之后并没有重新初始化为1,所以要在页面每次关闭之后将页面重新赋值为1,
    this.data.nowPage = 1
    //切换页面时调用API
    wx.pageScrollTo({
      scrollTop: 0
    })
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
    console.log('onPullDownRefresh')
    this.data.nowPage = 1
    this.data.rowcount = -1
    this.data.goodsList = []
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('onReachBottom')
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
})