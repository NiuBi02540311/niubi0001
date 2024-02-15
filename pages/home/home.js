// pages/home/home.js
import  Toast  from '@vant/weapp/toast/toast';
import {createStoreBindings,detroyStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
var app = getApp()
const localhost = app.globalData.localhost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    datalist:[]
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
    this.initData()

    var myArray = [5, 2, 1, 4, 3]
    var sortedArray = myArray.filter(function(value) {
    return value != 2;
    })
    //console.log(sortedArray)
  },
 async initData(){
    const arr = [
      {"id":1,"name":"aaa","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-1.jpg"},
      {"id":2,"name":"bbb","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-2.jpg"},
      {"id":3,"name":"ccc","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-3.jpg"},
      {"id":4,"name":"ddd","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-4.jpg"},
      {"id":5,"name":"eee","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-5.jpg"},
      {"id":6,"name":"fff","url":"/pages/goodlist/goodlist","src":"https://img.yzcdn.cn/vant/apple-6.jpg"},
    ];
    //this.setData({ datalist:arr })
    //openid
    const openid = wx.getStorageSync('openid') 
    const {data:res} = await wx.p.request({
      url:  localhost + '/wx/getHomeDatalist?openid='+openid,
      method:'GET'
    })
    //console.log(res)
    this.setData({ datalist:res })
  },
  ImgClick(e){
    console.log(e)
    const index = e.target.dataset.index
    const id =  this.data.datalist[index].id
    const name =  this.data.datalist[index].name
    const url = this.data.datalist[index].url + "?id="+id+"&name=" + name
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  },
  tt(){
    wx.navigateTo({
      url: '/pages/test/test?id=1&name=Janson',//附带两个参数过去
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
GetUser(){

  wx.getUserProfile({
    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
      wx.showToast({
        title: res.userInfo.nickName + res.userInfo.gender,
      })
    }
  })

},
 async getMsg(){
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
  const {data:res} = await wx.p.request({
    url: 'http://localhost:57526/wx/demo5?name=110',
    method:'GET'
  })
  //console.log(res)
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
    url: 'http://localhost:57526/wx/demo6?name=110',
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
    wx.setNavigationBarTitle({
      title: '家中物品管理-主页',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //   if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     //唯一标识（其它设置不同的整数）  
    //     selected: 0
    //   })
    // }
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
    if(this.storeBindings){
       this.storeBindings.detroyStoreBindings()
    }
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