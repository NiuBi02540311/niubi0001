// pages/goodadd/goodadd.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    buytime:'',tag:'',pid:0, title:'',desc:'',num:1,price:0.0
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({ pid: options.id })
    //this.setData({ ['good.pid']: options.id })
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
      show: false,
      buytime: this.formatDate(event.detail),
    });
  },
  click(){
   // console.log(this.data)
   if(this.data.title == ''){
    //Toast.success('成功文案');
    //Toast.fail('带*必填项未填写')
    Dialog.alert({
      message: '带*的是必填项,请检查!',
    }).then(() => {
      // on close
    });
    return
   }

   const that = this
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
    })
      .then(() => {
        // on confirm
        const copyObj = { ...that.data }
        delete copyObj.show
        delete copyObj.__webviewId__
        //console.log(that.data)
        console.log(copyObj)
        const obj = JSON.stringify(copyObj)
        console.log(obj)
        
        // wx.showToast({
        //   title: '数据已提交',
        // })
      })
      .catch(() => {
        // on cancel
      });
  },
  async submit(){
    
  },
  async getInfo(){
    // 将 res 解构成 data
    // 使用 async 和 await 对函数进行优化
    const {data : res} = await wx.p.request({
      method:'GET',
      url: 'https://www.escook.cn/api/get',
      data: {name: '我是夜兰的狗', age: 20}
    });
    console.log(res);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '物品添加',
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