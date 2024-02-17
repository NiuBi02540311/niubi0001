// pages/cart/cart.js
Page({

  data: {
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: [],
    hidden: false,
    selectAllStatus: false,
    status: true,
    money: 0,
    // number: '6',
    // price: '20',
    coupon: [{
      id:22,
        title: '芒果雪媚娘',
        num: '500g',
        number: '5',
        price: '20',
        selected: true
      },
      {
        id:23,
        title: '芒果雪媚娘',
        num: '500g',
        number: '6',
        price: '20',
        selected: true
      },
      {
        id:33,
        title: '芒果雪媚娘',
        num: '500g',
        number: '4',
        price: '20',
        selected: true
      },
      {
        id:44,
        title: '芒果雪媚娘',
        num: '500g',
        number: '3',
        price: '20',
        selected: true
      }
    ],
    values: []
  },
  onLoad: function(options) {
    this.initData()
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    let coupon = this.data.coupon; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < coupon.length; i++) { // 循环列表得到每个数据
      if (coupon[i].selected) { // 判断选中才会计算价格
        total += coupon[i].number * coupon[i].price; // 所有价格加起来
      }
    }
    that.setData({ // 最后赋值到data中渲染到页面
      coupon: coupon,
      money: total.toFixed(2)
    });
    this.selectedTap()

  },
  initData(){
    let arr = []
    for(let i = 1; i < 50 ;i++){
      arr.push(
        {
          id:i,
            title: '芒果雪媚娘'+i,
            num: '500g',
            number: 1,
            price: 1,
            selected: true
          }
      )
    }
    console.log(arr)
    this.setData({coupon:arr})
  },
  checkboxChange:function(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    var selectAllStatus = this.data.selectAllStatus
    var values = e.detail.value;
    let coupon = this.data.coupon; // 获取购物车列表
    // const selected = coupon[index].selected; // 获取当前商品的选中状态
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    // coupon[index].selected = !selected;// 改变状态
    for (var i = 0; i < coupon.length; ++i) {
      coupon[i].selected = false;
      for (var j = 0; j < values.length; ++j) {
        if (coupon[i].id == values[j]) {
          coupon[i].selected = true;
          break;
        }
      }
    }

    var selectAllStatus = false;
    if (coupon.length == values.length) {
      selectAllStatus = true;
    }
    this.setData({
      coupon: coupon,
      selectAllStatus: selectAllStatus
    });
    console.log(selectAllStatus)
    this.getTotalPrice(); // 重新获取总价
  },
  addTap: function(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    var coupon = this.data.coupon;
    var number = Number(coupon[index].number);
    if (number <= 1000) {
      number = number + 1
    }
    coupon[index].number = number;
    that.setData({
      coupon: coupon
    });
    this.getTotalPrice();
  },
  reduceTap: function(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    var coupon = this.data.coupon;
    var number = coupon[index].number;
    if (number <= 1) {
      return false;
    }
    number = number - 1;
    coupon[index].number = number;
    that.setData({
      coupon: coupon
    });
    this.getTotalPrice();
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let coupon = this.data.coupon;
    for (let i = 0; i < coupon.length; i++) {
      coupon[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      coupon: coupon
    });
    this.getTotalPrice(); // 重新获取总价
  },
  getTotalPrice() {
    var that = this;
    let coupon = this.data.coupon; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < coupon.length; i++) { // 循环列表得到每个数据
      if (coupon[i].selected) { // 判断选中才会计算价格
        total += coupon[i].number * coupon[i].price; // 所有价格加起来
      }
    }
    that.setData({ // 最后赋值到data中渲染到页
      coupon: coupon,
      money: total.toFixed(2)
    });
  },
  deleteList(e) {
    var that = this
    const index = e.currentTarget.dataset.index;
    let coupon = this.data.coupon;
    wx.showModal({
      title: '',
      content: '是否要删除？',
      success(res) {
        if (res.confirm) {
          coupon.splice(index, 1)
          that.setData({
            coupon: coupon
          })
          that.getTotalPrice();
        }
      }
    })
    if (!coupon.length) { // 如果购物车为空
      this.setData({
        hasList: false // 修改标识为false，显示购物车为空页面
      });
      this.getTotalPrice();
    } else { // 如果不为空
      this.getTotalPrice(); // 重新计算总价格
    }
  },
  selectedTap() {
    var coupon = this.data.coupon
    var selectAllStatus = this.data.selectAllStatus
    if (coupon.selected = true) {
      selectAllStatus = true
    } else {
      selectAllStatus = false
    }
    this.setData({
      selectAllStatus: selectAllStatus
    })
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