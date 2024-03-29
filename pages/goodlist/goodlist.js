// pages/goodlist/goodlist.js
import  Toast  from '@vant/weapp/toast/toast';
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
const localhost = app.globalData.localhost;
Page({
  height:'100%' ,
  options:{
    styleIsolation:"shared"
  },
  /**
   * 页面的初始数据
   */
  data: {
    query: {},floorstatus:false, isShow: false,message:'',
    goodsList: [],searchvalue:'',
    nowPage:  1,  pageSize : 5, rowcount  : -1,
    admin: false,searchvalue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      query : options, admin: wx.getStorageSync('admin')
    })
    //this.getList()
    this.getSupplyList()
  },
  async  getSupplyList() {
    const t = this;//在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    //const rowcount = t.data.rowcount < 0 ? 0 : t.data.rowcount
    if (t.data.pageCount > t.data.nowPage - 1) {//判断当前也是否小于总页数
      // ok
    } else {
      if(t.data.nowPage > 1)
      {
            Notify({ type: 'success', message: '数据已全部显示,点击返回顶部',duration:5000, color: '#ad0000',      safeAreaInsetTop:false,onClick:this.NotifyonClick
            // onClick() {
            //   //wx.pageScrollTo({ scrollTop: 0 })
            // }
            })
          return 
      }
      
    }
     
    wx.showLoading({ title: '数据加载中' })
    const searchvalue =  encodeURIComponent(t.data.searchvalue)
    const pid = t.data.query.id
    const openid = await wx.getStorageSync('openid') 
    const admin = await wx.getStorageSync('admin')
    const isadmin =  admin ? 1: 0
    const {data:res} = await wx.p.request({
      url: localhost + `/wx/getGoodDatalist?pid=${pid}&openid=${openid}&nowPage=${t.data.nowPage}&pageSize=${t.data.pageSize}&isadmin=${isadmin}&searchvalue=${searchvalue}`,
      method:'GET'
    })
    console.log(res)
    
    if(res.data == [] || res.data == null || res.data == undefined || res.rowcount == 0){
      this.setData({nowPage:1,goodsList:[],rowcount :-1,searchvalue:'', pageCount:0})
      wx.hideLoading()
      Notify({ type: 'success', message: '查询无数据,下拉重新读取数据',duration:6000, color: '#ad0000',      safeAreaInsetTop:false
      })
      return false
    }
    if(t.data.nowPage == 1){
      t.setData({rowcount:res.rowcount,pageCount:res.pageCount})
    }
    let supplyList = []
    if (1==1) {
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
  onTest(){
    // 定义一个包含多个对象的数组
    var arr = [
      { name: '张三', age: 20 },
      { name: '李四', age: 30 },
      { name: '王五', age: 40 }
    ];
    // 输入要查询的关键字
    var keyword = "张";
    // 使用 filter() 函数进行模糊查询
    var result = arr.filter(function (obj) {
      return obj.name.includes(keyword); // 判断名称属性是否包含指定的关键字
    });
    console.log(result); // 打印结果
  },
  onChange(e){
    this.setData({ searchvalue: e.detail, });
  },
  onClear(){
    this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] ,searchvalue:'',pageCount:0})
    //this.getList()
    this.getSupplyList()
  },
  onSearch(){
    this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] ,pageCount:0})
    this.getSupplyList()
  },
  onSearch2(){
    // var myArray = [5, 2, 1, 4, 3]
    // var sortedArray2 = myArray.filter(function(value) {
    // return value != 2;
    // })
    //let arr = this.data.goodsList
    let arr = Array.from(this.data.goodsList)
    //console.log('8888888888888888888888888888888')
    //console.log(arr)
    if(arr == [] || arr.length == 0){
      this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] ,searchvalue:''})
      //this.getList()
      return
    }
    const searchvalue = this.data.searchvalue
    console.log(searchvalue)
    console.log(searchvalue.length)
    if(searchvalue.length == 0){
      this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] })
      //this.getList()
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
  async  getList(){
    // 请求数据后
    // 关闭下拉刷新的窗口
    const that = this;//在回调甘薯里,this有时候不能直接用,防止出bug所初始化一个that
    const show = that.data.goodsList.length == that.data.rowcount
    this.setData({isShow: show })
    if(this.data.isShow ){
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
      url: localhost + `/wx/getGoodDatalist?pid=${pid}&openid=${openid}&nowPage=${that.data.nowPage}&pageSize=${that.data.pageSize}`,
      method:'GET'
    })
   if(res.rowcount == 0){
      setTimeout(function () {
        console.log('stopPullDownRefresh');
        wx.hideLoading()
        wx.stopPullDownRefresh();
      }, 1000);
      return
   }
    //  var obj = new { rowcount = data.Count, data = v };
    //console.log(res)
    const all = [...that.data.goodsList,...res.data]
    const index = that.data.nowPage +1
    const rowcount = res.rowcount
    that.setData({ goodsList:all,nowPage:index,rowcount : rowcount })
    //console.log(that.data.goodsList)
    
		setTimeout(function () {
      //console.log('stopPullDownRefresh');
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
    const name = this.data.query.name
    wx.navigateTo({
      url: '/pages/goodadd/goodadd?id=' + pid + '&name=' + name,
    })
  },
  editHandler(e){
    console.log(e)
    wx.navigateTo({
      //url: '/pages/goodedit/goodedit?id=' + e.target.dataset.id + '&name='+ e.target.dataset.title,
      url: '/pages/goodedit/goodedit?id=' + e.target.dataset.id + '&name='+ this.data.query.name,
    })

  },
 async deleteHandler(e){
    //console.log(e)
    // var myArray = [5, 2, 1, 4, 3]
    // var sortedArray = myArray.filter(function(value) {
    // return value != 2;
    // })
    // let arr = [{name: '张三'}, {name: '李四'}, {name: '王五'}];
    // arr.splice(index, 1); // index 表示要删除的元素所在的索引位置
    // console.log(arr);
    //console.log(sortedArray)
    const that = this
    const id    = e.target.dataset.id
    const title = e.target.dataset.title
    const index = e.target.dataset.index
   Dialog.confirm({
      title: '提示',
      message: '确认要删除(' + title +')(' + id + ')？',
    })
      .then( async () => {
        wx.showLoading()
        const openid = await wx.getStorageSync('openid')
        const admin = await wx.getStorageSync('admin')
        const localhost = getApp().globalData.localhost
        const {data:res} = await wx.p.request({
          url: localhost + '/wx/gooddelete',
          data:{ openid : openid, id: id ,isadmin : admin ? 1 : 0 },
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
     
            const copyObj = {...that.data.goodsList}
            //copyObj.splice(index, 1);
            copyObj[index].isdelete = 1
            //delete copyObj[index]
            //console.log(copyObj)
            //console.log(copyObj.length)
            that.setData({ goodsList: copyObj,rowcount: that.data.rowcount - 1 })
            setTimeout(() => {  wx.hideLoading() }, 1000);
            //console.log(that.data.goodsList)
        //wx.showToast({  title: '数据已提交', })
        
      }).catch(() => {
        // on cancel
      })
  },
async  approveHandler(e){
   const that = this
    const id = e.target.dataset.id
    //findIndex() 方法用于查找并返回数组中满足指定条件的第一个元素的索引。如果找不到满足条件的元素，将返回 -1
    //const index2 = that.data.goodsList.findIndex(name => name.id === id)
    const index = e.target.dataset.index
    //console.log(index + '-' + index2)
    
    const result = await  Dialog.confirm({
     title: '提示',
     message: '确认要审核通过？',
   })
     .then( async () => {
       wx.showLoading()
       const openid =    await wx.getStorageSync('openid')
       const admin =     await wx.getStorageSync('admin')
       const {data:res} = await wx.p.request({
         url: localhost + '/wx/goodapprove',
         data:{ openid : openid, id: id ,isadmin: admin ? 1: 0},
         method:'POST'
       })
       //console.log(res)
       that.setData({message:res.message})
       if(!res.success){
         Toast({
           type: 'fail',
           message: '提交失败：'+ res.message,
           onClose: () => {
             console.log('执行OnClose函数1');
             setTimeout(() => {  wx.hideLoading()  }, 1000);
           },
         })
         return
       }
       const copyObj = { ...that.data.goodsList }
       copyObj[index].approveID = 1
       that.setData({ goodsList: copyObj})
       setTimeout(() => {  wx.hideLoading()  }, 1000);
      //  Toast({
      //    type: 'success',
      //    message: '提交成功',
      //    onClose: () => {
      //      console.log('执行OnClose函数2');
      //       const copyObj = { ...that.data.goodsList }
      //       copyObj[index].approveID = 1
      //       that.setData({ goodsList: copyObj})
      //    },
      //  })
       //wx.showToast({  title: '数据已提交', })
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
    // this.data.nowPage = 1
    // this.data.rowcount = -1
    // this.data.goodsList = []
    //this.setData({isShow: false ,nowPage :1,rowcount:-1,goodsList:[] })
    //this.getList()
    this.onClear()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('onReachBottom')
    //this.getList()
    this.getSupplyList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
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
    wx.pageScrollTo({
      scrollTop: 0
     })
    // if (wx.pageScrollTo) {
    //  wx.pageScrollTo({
    //   scrollTop: 0
    //  })
    // } else {
    //  wx.showModal({
    //   title: '提示',
    //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //  })
    // }
   }
})