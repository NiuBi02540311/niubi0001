// pages/goodedit/goodedit.js
import  Toast  from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,message:'',name:'',
    id:0 ,buytime:'',tag:'',addtime:'',
    title:'',desc:'',num:1,price:0.0,approveID:0,
    admin:wx.getStorageSync('admin')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({id:options.id,name:options.name})
    this.getGoodData()
  },
  async getGoodData(){
    const openid = await wx.getStorageSync('openid')
    const admin = await wx.getStorageSync('admin')
    const localhost = getApp().globalData.localhost
    const {data:res} = await wx.p.request({
      url: localhost + '/wx/getGoodData',
      data:{ openid : openid, id: this.data.id,isadmin:admin ? 1:0 },
      method:'GET'
    })
    console.log(res)
    if(res.rowcount == 0){
      wx.showToast({
        title: '/wx/getGoodData请求失败',
      })
      return
    }
    this.setData({ 
      title:res.data.title,
      desc:res.data.desc,
      num:res.data.num,
      price:res.data.price,
      tag:res.data.tag,
      buytime:res.data.buytime,addtime:res.data.addtime,
      approveID:res.data.approveID
    })
  },
  async approveHandler(){
    const that = this
    const id = that.data.id
    const result = await  Dialog.confirm({
      title: '提示',
      message: '确认要审核通过？',
    })
      .then( async () => {
        wx.showLoading()
        const openid = wx.getStorageSync('openid')
        const localhost = getApp().globalData.localhost
        const {data:res} = await wx.p.request({
          url: localhost + '/wx/goodapprove',
          data:{ openid : openid, id: id },
          method:'POST'
        })
        console.log(res)
        that.setData({message:res.message})
      
        if(!res.success){
          Toast({
            type: 'fail',
            message: '提交失败：'+ res.message,
            onClose: () => {
              console.log('执行OnClose函数1');
              setTimeout(() => {  wx.hideLoading() }, 1000);
            },
          })
         
          return
        }
     await  Toast({
          type: 'success',
          message: '提交成功',
          onClose: () => {
            console.log('执行OnClose函数2');
            that.setData({ approveID: 1})
            setTimeout(() => {  wx.hideLoading() }, 1000);
          },
        })
        //wx.showToast({  title: '数据已提交', })
       
      })
      .catch(() => {
        // on cancel
      })
      
  },
  onChangebuytime(){
    this.onDisplay()
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
   // return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,buytime: this.formatDate(event.detail),
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '物品信息修改',
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