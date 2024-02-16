// pages/customer/customer.js
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast'
import Notify from '@vant/weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,sheetshow:false,NickName:'Jim',NewName:'Jim',
    customer:{},fileList: [],popupshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetCustomerInfo()
  },
  changeHeadPhoto(){
    this.setData({popupshow:true})
    
    // Dialog({
    //   selector: '#van-dialog-2',
    //   showConfirmButton: false,
    //   closeOnClickOverlay: true,
    //   className: 'dialog2',
    //   width: '500rpx'
    //   })
  },
  UserShutdown(){
    this.setData({popupshow:false})
  },
  touchstart(){
    this.setData({popupshow:false})
  },
  beforeRead(e) {
    console.log('beforeRead')
    console.log(e)
    const { file, callback } = e.detail;
    callback(file.type === 'image');
  },
  afterRead(e){
    console.log('afterRead')
    const { file } = e.detail;
    console.log(e)
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
          filePath: file.url,
          name: 'file',
          formData: { user: 'test' },
          success(res) {
            // 上传完成需要更新 fileList
            const { fileList = [] } = this.data;
            fileList.push({ ...file, url: res.data });
            this.setData({ fileList });
          },
        });
  },
  async GetCustomerInfo(){
    const openid = wx.getStorageSync('openid')
    const uid = wx.getStorageSync('uid')
    const localhost = getApp().globalData.localhost
        const {data:res} = await wx.p.request({
          url: localhost + '/wx/GetCustomerInfo',
          data:{ openid :openid,uid:uid },
          method:'POST'
        })
        console.log(res)
        if(!res.success){
          Notify({ type: 'danger', message: 'CustomerInfo请求失败' })
          return
        }
        this.setData({customer:res.data,NickName:res.data.name,NewName:res.data.name})
  },
  onSelect(event) {
    console.log(event.detail);
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  ChangeName(){
    const t = this
    if(t.data.NickName == t.data.NewName){
      Toast('昵称未变动');
      return
    }
    if(t.data.NewName.length == 0){
      Toast('昵称不能为空');
      setTimeout(()=>{ this.setData({NewName:this.data.NickName})},3000)
      return
    }
    Dialog.confirm({
      title: '确认修改昵称？',
      message: t.data.NewName ,
    })
      .then(async () => {
        // on confirm
        const openid = await wx.getStorageSync('openid')
        const uid = await wx.getStorageSync('uid')
        const localhost = getApp().globalData.localhost
        const {data:res} = await wx.p.request({
          url: localhost + '/wx/ChangeNickName',
          data:{ openid :openid,uid:uid,NikcName:t.data.NewName },
          method:'POST'
        })
        console.log(res)
        if(!res.success){
          Notify({ type: 'danger', message: '昵称修改失败:' + res.message });
          return
        }
        Notify({ type: 'success', message: '昵称修改成功' + res.message });
        t.setData({NickName:t.data.NewName,['customer.name']:t.data.NewName})
      })
      .catch(() => {
        // on cancel
        t.setData({NewName:NickName})
      });
    
  },
  bindKeyInput: function (e) {
    this.setData({
      NewName: e.detail.value
    })
  },
  afterRead(){},
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