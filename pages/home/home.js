// pages/home/home.js
import  Toast  from '@vant/weapp/toast/toast';
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBinding = createStoreBindings(this,{
      store,
      fields:['numA','numB','sum'],
      actions:['updateNumA']

    })
  },
 async getMsg(){
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
  const {data:res} = await wx.p.request({
    url: 'http://localhost:57526/Test/demo5?name=110',
    method:'GET'
  })
  console.log(res)
  this.setData({message:res.Message})
 },
 async postMsg(){
// 自定义加载图标
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  const {data:res} = await wx.p.request({
    url: 'http://localhost:57526/Test/demo6?name=110',
    method:'POST'
  })
  console.log(res)
  this.setData({message:res.Message})
 },
 async getInfo(){
  const {data:res} =await wx.p.request({
     method:'GET',
     url:'https://applet-base-api-t.itheima.net/api/get',
     data:{
       name:'zhangsan',
       age:20
     }
   })
   console.log(res);
 },
 toastMsg(){
  const toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '倒计时 3 秒',
    selector: '#custom-selector',
  });
  
  let second = 3;
  const timer = setInterval(() => {
    second--;
    if (second) {
      toast.setData({
        message: `倒计时 ${second} 秒`,
      });
    } else {
      clearInterval(timer);
      Toast.clear();
    }
  }, 1000);
  

 },
 btnHandler(e){
 this.updateNumA(e.target.dataset.step)
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
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 0
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
    this.storeBindings.destroyStoreBindings()
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