// pages/goodadd/goodadd.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
const localhost = app.globalData.localhost;
Page({
  options:{
    styleIsolation:"shared"
  },
  /**
   * 页面的初始数据
   */
  data: {
    show: false, openid:wx.getStorageSync('openid'),message:'',imgsrc:'',pname:'',
    buytime:'',tag:'',pid:0, title:'',desc:'',num:1,price:0.0,shared:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({ pid: options.id,pname:options.name })
    //this.setData({ ['good.pid']: options.id })
  },
  switchonChange(e){
    //console.log(e)
    this.setData({ shared: e.detail ? 1:0 });
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          imgsrc: res.tempImagePath
        })
      }
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
      show: false,
      buytime: this.formatDate(event.detail),
    });
  },
 async click(){
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
   const result = await  Dialog.confirm({
    title: '发布提示',
    message: '物品信息填写是否符合《管理办法》？',
  })
    .then( async () => {
      // on confirm
      const copyObj = { ...that.data }
      delete copyObj.show
      delete copyObj.__webviewId__
      delete copyObj.message
      delete copyObj.imgsrc
      delete copyObj.pname
      //console.log(that.data)
      console.log(copyObj)
      const obj = JSON.stringify(copyObj)
      console.log(obj)
      const {data:res} = await wx.p.request({
        url: localhost + '/wx/goodadd',
        data:{ datalist :obj },
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
          },
        })
        return
      }
      Toast({
        type: 'success',
        message: '提交成功',
        onClose: () => {
          console.log('执行OnClose函数2');
          that.setData({buytime:'',tag:'', title:'',desc:'',num:1,price:0.0})
        },
      })
      //wx.showToast({  title: '数据已提交', })
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
      title: '物品信息添加',
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
    const htmlSnip =
          `<div class="div_class">
            <h1>Title</h1>
            <p class="p">
              Life is&nbsp;<i>like</i>&nbsp;a box of
              <b>&nbsp;chocolates</b>.
            </p>
          </div>
          `
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 获取滚动条当前位置
 PageScroll: function (e) {
  if (e.scrollTop > 100) {
   this.setData({
    floorstatus: true
   });
  } else {
   this.setData({
    floorstatus: false
   });
  }
 },
//回到顶部
goTop: function (e) { // 一键回到顶部
  if (wx.pageScrollTo) {
   wx.pageScrollTo({
    scrollTop: 0
   })
  } else {
   wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
   })
  }
 }
})