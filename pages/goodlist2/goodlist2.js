// pages/goodlist2/goodlist2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist: [
      {
          id:"001",
          imgUrl:"/images/tabs/gd.png",
          name:"女装T恤中长款大码摆裙春夏新款",
          price:"65.00"
      },
      {
          id:"002",
          imgUrl:"/images/tabs/gd.png",
          name:"火亮春秋季 男青年修身款圆领男士T恤",
          price:"68.00"
      },
      {
          id:"003",
          imgUrl:"/images/tabs/gd.png",
          name:"新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
          price:"86.00"
      },
      {
          id:"004",
          imgUrl:"/images/tabs/gd.png",
          name:"男运动上衣春季上新品 上衣流行装青年",
          price:"119.00"
      },
      {
          id:"005",
          imgUrl:"/images/tabs/gd.png",
          name:"时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
          price:"69.00"
      },
      {
          id:"006",
          imgUrl:"/images/tabs/gd.png",
          name:"新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
          price:"86.00"
      },
      {
          id:"007",
          imgUrl:"/images/tabs/gd.png",
          name:"时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
          price:"119.00"
      },
      {
          id:"008",
          imgUrl:"/images/tabs/gd.png",
          name:"男运动上衣春季上新品 上衣流行装青年",
          price:"69.00"
      },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  GoBuy(){
    wx.navigateTo({
      url: '/pages/goodlist2/goodlist2',
    })
  },
  onClickRight(){
    wx.navigateTo({
      url: '/pkgCart/pages/cart6/cart6',
    })
  },
// 加入购物车
addcart:function(e){
  this.setData({
      toastHidden:false
  });
  // 遍历列表 与 购物车列表
  for (var i in this.data.goodslist){
      // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项
      if(this.data.goodslist[i].id == e.target.id){
          // 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量
          this.data.goodslist[i].count = 1;
          // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
          var arr = wx.getStorageSync('cart') || [];
          // 如果购物车有数据
          if(arr.length>0){
              // 遍历购物车数组
              for(var j in arr){
                  // 判断购物车内的item的id，和事件传递过来的id，是否相等
                  if(arr[j].id == e.target.id){
                      // 相等的话，给count+1（即再次添加入购物车，数量+1）
                      arr[j].count = arr[j].count + 1;
                      // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
                      try {
                          wx.setStorageSync('cart', arr)
                      } catch (e) {
                          console.log(e)
                      }
                      // 返回（在if内使用return，跳出循环节约运算，节约性能）
                      return;
                  }
              }
              // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
              arr.push(this.data.goodslist[i]);
          }
          // 购物车没有数据，把item项push放入当前数据（第一次存放时）
          else{
              arr.push(this.data.goodslist[i]);
          }
          // 最后，把购物车数据，存放入缓存
          try {
              wx.setStorageSync('cart', arr)
              // 返回（在if内使用return，跳出循环节约运算，节约性能）
              return;
          } catch (e) {
              console.log(e)
          }
      }
  }
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