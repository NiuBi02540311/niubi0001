// pages/goodedit/goodedit.js
import  Toast  from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
import Notify from '@vant/weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,message:'',name:'',shared:1,updatetime:'',
    id:0 ,buytime:'',tag:'',addtime:'',
    title:'',desc:'',num:1,price:0.0,approveID:0,
    admin:wx.getStorageSync('admin'),
    fileList:[],filesize: 1024 * 1024,fileUploadChecked:false,fileUploadMessage:'',
    maxcount:5
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({id:options.id,name:options.name})
    this.getGoodData()
    const img = [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        status: 'uploading',
        message: '上传中',
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg',
        status: 'failed',
        message: '上传失败',
      },
    ]
    //this.setData({fileList:img})
    this.GetGoodImg()
  },
  beforeRead(event) {
    console.log('beforeRead');
    //console.log(event)
    //绑定 before-read 事件可以在上传前进行校验，
    //调用 callback 方法传入 true 表示校验通过，传入 false 表示校验失败
    const { file, callback } = event.detail;
    //const url = {url:file.url} 
    let message = ''
    const imgOk  = file.type === 'image'
    if(imgOk == false){
      message +='文件类型必须是图片'
    }
    const sizeOk = file.size < this.data.filesize
    if(sizeOk == false){
      message +=' 文件大小不能超过1M'
    }
    console.log(sizeOk + "-" + imgOk)
    const Ok = imgOk && sizeOk
    if(Ok == false){
        // wx.showToast({
        //   title: Message,
        // })
        Notify({ type: 'danger', message:message ,duration:6000 })
    }
    
   // this.setData({fileUploadChecked:Ok,fileUploadMessage:Message})
    callback(Ok)
   
    
  },
  afterRead(event) {
    console.log('afterRead');
    console.log(event);
    wx.showLoading({
      title: '上传中',
    })
    const openid = wx.getStorageSync('openid')
    const uid = wx.getStorageSync('uid')
    const { file } = event.detail;
    const localhost = getApp().globalData.localhost
    console.log(file.url)
    const t = this 
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: localhost +'/wx/NewUploadImg', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { GoodID: t.data.id,openid: openid,uid:uid},
      success(res) {
        console.log(res)
        if(res.statusCode == 200 && res.errMsg == "uploadFile:ok"){
            // 上传完成需要更新 fileList
            const obj = JSON.parse(res.data)
            const { fileList = [] } = t.data;
            fileList.push({ ...file, url: obj.message });
            t.setData({ fileList });
        }else{
          wx.showToast({
            title: '上传失败',
          })
        }
        setTimeout(() => {
          wx.hideLoading()
        }, 1000);
      }
    });
  },
  uploadFile(uploadFile) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'config.uploadUrl', // 上传的服务器接口地址
        filePath: uploadFile, 
        name: 'file', //上传的所需字段，后端提供
        success: (res) => {
          // 上传完成操作
          const data = JSON.parse(res.data)
          const url = data.data.url  
          resolve({
            url: url
          })
        },
        fail: (err) => {
          //上传失败：修改pedding为reject
          reject(err)
        }
      });
    })
  },
  deleteImg(event) {
    const delIndex = event.detail.index
    const { fileList } = this.data
    fileList.splice(delIndex, 1)
    this.setData({
      fileList
    })
  },
  switchonChange(e){
    //console.log(e)
    this.setData({ shared: e.detail ? 1:0 });
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
      title:res.data.title,updatetime:res.data.updatetime,
      desc:res.data.desc,
      num:res.data.num,
      price:res.data.price,
      tag:res.data.tag,
      buytime:res.data.buytime,addtime:res.data.addtime,
      approveID:res.data.approveID,shared:res.data.shared
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
  async UpdateGooddata(){
    const t = this.data
    const ts = this
    const datalist = {
       shared:t.shared, id:t.id ,buytime:t.buytime,tag:t.tag, title:t.title,desc:t.desc,num:t.num,price:t.price
    }
    //goodedit
    console.log(datalist)
    // console.log(this.data)
   if(t.title.length == 0){
    Dialog.alert({
      message: '带*的是必填项,请检查!',
    }).then(() => {
      // on close
    })
    return
   }
   
   const result = await  Dialog.confirm({
    title: '发布提示',
    message: '物品信息填写是否符合《管理办法》？',
  })
    .then( async () => {
      // on confirm
      const obj = JSON.stringify(datalist)
      const localhost = getApp().globalData.localhost
      const admin = await wx.getStorageSync('admin')
      const openid = await wx.getStorageSync('openid')
      console.log(obj)
      const {data:res} = await wx.p.request({
        url: localhost + '/wx/goodedit',
        data:{ datalist :obj ,openid:openid,isadmin : admin ? 1:0 },
        method:'POST'
      })
      console.log(res)
      //that.setData({message:res.message})
      if(!res.success){
        // Toast({
        //   type: 'fail',
        //   message: '提交失败：'+ res.message,
        //   onClose: () => {
        //     console.log('执行OnClose函数1');
        //   },
        // })
        ts.setData({updatetime:res.updatetime})
        Notify({ type: 'danger', message: '提交失败：'+ res.message,duration:5000 })
        return
      }
      Notify({ type: 'success', message: '提交成功：'+ res.message,duration:3000 })
      // Toast({
      //   type: 'success',
      //   message: '提交成功',
      //   onClose: () => {
      //     console.log('执行OnClose函数2')
      //   },
      // })
      //wx.showToast({  title: '数据已提交', })
    })
    .catch(() => {
      // on cancel
    });
  },
  async GetGoodImg(){
      const t = this
      const admin = await wx.getStorageSync('admin')
      const openid = await wx.getStorageSync('openid')
      const localhost = getApp().globalData.localhost
      const {data:res} = await wx.p.request({
        url: localhost + '/wx/GetGoodImg',
        data:{ GoodID :t.data.id ,openid:openid},
        method:'GET'
      })
      console.log(res)
      if(!res.success){
        Notify({ type: 'danger', message: 'GetGoodImg请求失败',duration:6000 })
        return
      }
      const imgList = res.data
      let img = []
      imgList.forEach(function(item) {
        //console.log(item.ImgUrl);
        img.push({url:localhost + item.ImgUrl})
      })
      ///const newList = [...t.data.fileList,...img]
      t.setData({fileList:img})
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