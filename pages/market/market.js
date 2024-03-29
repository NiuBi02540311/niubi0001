// pages/market/market.js
import Notify from '@vant/weapp/notify/notify';
const localhost = getApp().globalData.localhost
Page({
  height: '100%',
  options:{
    styleIsolation:"shared"
  },
  /**
   * 页面的初始数据
   */
  data: {
    nowPage :1,pageSize:5,pageCount:0,rowcount:-1,goodsList:[] ,searchvalue:'',isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //this.getList()
    this.getSupplyList(true)
    
  },
   async getList(){
   console.log('getList')
    const t = this //在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    const d = this.data
    const goodsList =  Array.from(this.data.goodsList)
    console.log('this.data.goodsList.length =' + goodsList.length)
    console.log('this.data.rowcount =' + this.data.rowcount)
    const show = goodsList.length == this.data.rowcount
    this.setData({isShow: show })
    if(show){
     
      Notify({ type: 'success', message: '数据已全部加载完毕',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
      // onClick() {
      //   //wx.pageScrollTo({ scrollTop: 0 })
      // }
      })
      wx.stopPullDownRefresh();
      return
    }
    wx.showLoading({ title: '数据加载中' })
    const openid = await wx.getStorageSync('openid') 
    const admin = await wx.getStorageSync('admin')  
    const isadmin =  admin ?  1:  0
    const {data:res} = await wx.p.request({
      url: localhost + `/wx/getquanzdatalist?openid=${openid}&nowPage=${d.nowPage}&pageSize=${d.pageSize}&isadmin=${isadmin}`,
      method:'GET'
    })
    console.log(res)
   
    if(res.rowcount == 0){
      setTimeout(function () {
        console.log('stopPullDownRefresh');
        wx.hideLoading()
        wx.stopPullDownRefresh();
      }, 1000);
      return
    }
    if(d.nowPage == 1){
      t.setData({rowcount:res.rowcount,pageCount:res.pageCount})
    }
    const all = {...this.data.goodsList,...res.data}
    console.log(all)
    //t.setData({nowPage:d.nowPage + 1,})
    const index = d.nowPage +1
    const rowcount = res.rowcount
    t.setData({ goodsList:all,nowPage:index })
    console.log('this.data.goodsList.length =' + all.length)
    console.log('this.data.rowcount =' + this.data.rowcount)
    setTimeout(function () {
      //console.log('stopPullDownRefresh');
      wx.hideLoading()
			wx.stopPullDownRefresh();
		}, 1000);
  },
  async  getSupplyList(reachBottom) {
    const t = this;//在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    //const rowcount = t.data.rowcount < 0 ? 0 : t.data.rowcount
    if (t.data.pageCount > t.data.nowPage - 1) {//判断当前也是否小于总页数
      // ok
    } else {
      if(t.data.nowPage > 1)
      {
            Notify({ type: 'success', message: '数据已全部显示,点击返回顶部8',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
            // onClick() {
            //   //wx.pageScrollTo({ scrollTop: 0 })
            // }
            })
          return 
      }
      
    }
      //if (t.data.goodsList.length == t.data.rowcount) {
          //判断当前也是否小于t总页数
      //     Notify({ type: 'success', message: '数据已全部显示,点击返回顶部',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
      //     // onClick() {
      //     //   //wx.pageScrollTo({ scrollTop: 0 })
      //     // }
      //     })
      //     return false
      //  } 
    wx.showLoading({
      title: '加载中...',
    });
    
    const searchvalue =  encodeURIComponent(t.data.searchvalue)
    const openid = await wx.getStorageSync('openid') 
    const admin = await wx.getStorageSync('admin')  
    const isadmin =  admin ?  1:  0
    const {data:res} = await wx.p.request({
      url: localhost + `/wx/getquanzdatalist?openid=${openid}&nowPage=${t.data.nowPage}&pageSize=${t.data.pageSize}&isadmin=${isadmin}&searchvalue=${searchvalue}`,
      method:'GET'
    })
   
    console.log(res)
    
    if(res.data == [] || res.data == null || res.data == undefined || res.rowcount == 0){
      this.setData({nowPage:1,goodsList:[],rowcount :-1,searchvalue:''})
      wx.hideLoading()
      Notify({ type: 'success', message: '查询无数据',duration:3000, color: '#ad0000',      safeAreaInsetTop:false
      })
      return false
    }
    if(t.data.nowPage == 1){
      t.setData({rowcount:res.rowcount,pageCount:res.pageCount})
    }
    let supplyList = []
    if (reachBottom) {
      supplyList = [...t.data.goodsList, ...res.data]//将新数据加入老数据中
    }
    const NewIndex = t.data.nowPage +  1
    t.setData({//将获取的值赋值给data中的数组和总页数
      goodsList: supplyList,
      rowcount: res.rowcount,nowPage:NewIndex
    });
    //t.data.nowPage++ //所有操作完成后页数加一
    setTimeout(function () {
      console.log('stopPullDownRefresh');
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);
    console.log(t.data.goodsList)
  },
  async  getSupplyList2(reachBottom) {
    wx.showLoading({
      title: '加载中...',
    });
    const t = this;//在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    const openid = await wx.getStorageSync('openid') 
    const admin = await wx.getStorageSync('admin')  
    const isadmin =  admin ?  1:  0
    const {data:res} = await wx.p.request({
      url: localhost + `/wx/getquanzdatalist?openid=${openid}&nowPage=${t.data.nowPage}&pageSize=${t.data.pageSize}&isadmin=${isadmin}`,
      method:'GET'
    })
   
    console.log(res)
    let supplyList = []
    if (reachBottom) {
      supplyList = [...t.data.goodsList, ...res.data]//将新数据加入老数据中
    }
    t.setData({//将获取的值赋值给data中的数组和总页数
      goodsList: supplyList,
      rowcount: res.rowcount
    });
    //t.data.nowPage++ //所有操作完成后页数加一
    setTimeout(function () {
      console.log('stopPullDownRefresh');
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);
    console.log(t.data.goodsList)
  },
  NotifyonClick(){
    wx.pageScrollTo({ scrollTop: 0 })
  }, 
  onChange(e){
    this.setData({ searchvalue: e.detail, });
  },
  onClear(){
    this.setData({nowPage :1,rowcount:-1,goodsList:[],pageCount:0 ,searchvalue:''})
    //this.getList()
    this.getSupplyList(true)
  },
   onSearch(){
    this.setData({nowPage :1,rowcount:-1,goodsList:[],pageCount:0})
    this.getSupplyList(true)
    // var str='{u:abc,w:123}'
    // str= encodeURIComponent(str)
    // console.log('encodeURIComponent',str);
    // str=decodeURIComponent(str);
    // console.log('encodeURIComponent',str)

    // wx.showLoading({ title: '数据加载中' })
    // const openid = await wx.getStorageSync('openid') 
    // const admin = await wx.getStorageSync('admin')  
    // const isadmin =  admin ?  1:  0
    // this.setData({nowPage:1})
    // const d = this.data
    // const searchvalue =  encodeURIComponent(d.searchvalue)
    // const {data:res} = await wx.p.request({
    //   url: localhost + `/wx/getquanzdatalist?openid=${openid}&nowPage=${d.nowPage}&pageSize=${d.pageSize}&isadmin=${isadmin}&searchvalue=${searchvalue}`,
    //   method:'GET'
    // })
    // console.log(res)
    // setTimeout(function () {
    //   wx.hideLoading()
		// 	wx.stopPullDownRefresh();
		// }, 1000)
  },
  onSearch2(){
    
    let arr = Array.from(this.data.goodsList)
    //console.log('8888888888888888888888888888888')
    //console.log(arr)
    if(arr == [] || arr.length == 0){
      this.setData({nowPage :1,rowcount:-1,goodsList:[] ,searchvalue:''})
      //this.getList()
      this.getSupplyList(true)
      return
    }
    const searchvalue = this.data.searchvalue
    console.log(searchvalue)
    console.log(searchvalue.length)
    if(searchvalue.length == 0){
      this.setData({nowPage :1,rowcount:-1,goodsList:[] })
      //this.getList()
      this.getSupplyList(true)
      return
    }
    const admin = wx.getStorageSync('admin')
    let sortedArray = [];
    //console.log('111111111111111111111111111111111111111111')
    //console.log(arr)
    if(admin && searchvalue == '未审核'){
        sortedArray = arr.filter(function(item) {
        return   item.approveID == 0 
        })
    }else{
       sortedArray = arr.filter(function(item) {
        return   item.title.includes(searchvalue) || item.desc.includes(searchvalue) 
        })
    }
   
    console.log(sortedArray)
    //this.setData({rowcount:sortedArray.length,goodsList: sortedArray,searchvalue:''})
    this.setData({rowcount:sortedArray.length,goodsList: sortedArray})
  },
  onClickLeft() {
    //wx.showToast({ title: '点击返回', icon: 'none' });
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onClickRight(e) {
     console.log('刷新数据')
     this.onClear()
  },
  goodshow(e){
    const id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/goodshow/goodshow?id=' + id,
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '家中物品管理-圈子',
    })
    // wx.setTabBarItem({
    //  index:0, text: '',iconPath:'',selectedIconPath:''
    // })
    //  wx.setTabBarItem({
    //    text: 'market'
    //  })
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
    this.setData({isShow: false ,nowPage :1 })
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
    //this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] })
    //this.getList()
    //this.getSupplyList(true);//调用方法
    this.onClear()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('onReachBottom111111')
    this.getSupplyList(true);//调用方法
  },
  onReachBottom2() {
    console.log('onReachBottom2')
    //console.log('this.data.goodsList.length =' + this.data.goodsList.length)
    //console.log('this.data.rowcount =' + this.data.goodsList.length)
    //this.getList()
    if (this.data.goodsList.length < this.data.rowcount) {//判断当前也是否小于总页数
      this.setData({
        nowPage: this.data.nowPage + 1//当前页加一
      });
      this.getSupplyList(true);//调用方法
    } else {
      //return false;
      Notify({ type: 'success', message: '数据已全部加载完毕',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
      // onClick() {
      //   //wx.pageScrollTo({ scrollTop: 0 })
      // }
      })
      wx.stopPullDownRefresh();
    }
    //this.getSupplyList(true);//调用方法
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})