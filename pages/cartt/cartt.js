// pages/cartt/cartt.js

const getRoundeNumber = num => {
  console.log('getRoundeNumber')
  if (!Number.prototype._toFixed) {
      Number.prototype._toFixed = Number.prototype.toFixed
  }
  Number.prototype.toFixed = function(n) {
      return (this + 1e-14)._toFixed(n)
  }
  return Number(num).toFixed(2)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    productList: [],
    cartList: [],
    currentIndex: 0,
    currentGroupId: "",
    baseUrl: "",
    scrollTop: 0,
    hideModal: true,
    ani: '',
    totalNum: 99, // 已选商品数量
    totalPrice: 110, // 已选商品总金额
    allChecked: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsGroup()
  },
  goDetail(){
    console.log('goDetail 跳转商品详细页面')

  },
 // 获取商品分组
 getGoodsGroup() {
   const m = ['水果','蔬菜','家电','服装']// [{id:1,name:'aa'},{id:2,name:'bb'},{id:3,name:'cc'},{id:4,name:'dd'}]
   let menu = []
   for(let i = 0 ; i < m.length;i++){
    menu.push( { id: i + 1, name : m[i]} )
   }
    if( 1 === 1) {

      this.setData({menuList: menu})
      if(this.data.currentGroupId) {
        console.log('this.data.currentGroupId = ' + this.data.currentGroupId)
        this.getProductList(this.data.currentGroupId)
      } else {
        //this.getProductList(res.data.data.content[0].id)
        //console.log(' 333')
        this.getProductList(menu[0].id)
      }
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
  
},
// 获取商品列表
getProductList(groupId) {
  let arr = [
    {
    id:1,images:'/images/tabs/gd.png', groupId:1,
    name:'苹果', remark:'很甜', price:10,storeCount:1, num:55
   },
   {
    id:2,images:'/images/tabs/gd.png', groupId:1,
    name:'香蕉', remark:'很甜', price:20,storeCount:2, num:66
   },
   {
    id:3,images:'/images/tabs/gd.png', groupId:2,
    name:'小麦', remark:'很甜', price:30,storeCount:3, num:77
   },{
    id:4,images:'/images/tabs/gd.png', groupId:3,
    name:'电视机', remark:'很甜', price:40,storeCount:4, num:88
   }
  ]
  const result = arr.filter(function (obj) {
    //return obj.name.includes(keyword); // 判断名称属性是否包含指定的关键字
    return obj.groupId === groupId // 判断名称属性是否包含指定的关键字
  });
    if( 1 === 1) {
      //...
      this.setData({productList: result})
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
  
},

// 获取所有商品更新缓存购物车数据
getAllProduct() {
  let data = {}
  data.shopId = wx.getStorageSync('shop').id
  goodsMallFindAll(data).then(res => {
    if(res.data.code === 1) {
      let allProduct = res.data.data
      let cart = wx.getStorageSync('cart') || []
      let allProductId = allProduct.map(e => e.id)
      cart = cart.filter(e => allProductId.includes(e.id))
      cart = cart.map(ele => {
        allProduct.map(ele2 => {
          if(ele.id == ele2.id) {
            ele = Object.assign(ele, ele2);
          }
        })
        return ele
      })
      wx.setStorageSync('cart', cart)
      this.setCart()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
  })
},

// 购物车回填商品列表数据
handleList() {
  let cart = wx.getStorageSync('cart') || []
  let productList = this.data.productList.map(item => {
    delete item.num
    return item
  })
  productList.map(item => {
    cart.map(v => {
      if(item.id === v.id) {
        item.num = v.num
      } 
    })
  })
  this.setData({productList})
},

// 点击侧边栏
handleMenuItemChange(e) {
  let {index,id} = e.currentTarget.dataset
  this.setData({
    currentIndex: index,
    currentGroupId: id,
    scrollTop: 0
  })
  this.getProductList(id)
},

// 点击购物车
handleCart() {
  this.setData({
    cartList: wx.getStorageSync('cart'),
  })
  if(wx.getStorageSync('cart') && wx.getStorageSync('cart').length != 0) {
    this.setData({hideModal: false})
  } else {
    wx.showToast({
      title: '请添加商品',
      icon: 'none'
    })
  }
},

// 阻止事件冒泡
preventBubbling() {},

// 加入购物车
doPlusNum(e) {
  console.log('doPlusNum')
  console.log(e);
  let productInfo = e.currentTarget.dataset.item
  let cart = wx.getStorageSync('cart') || []
  let index = cart.findIndex(v => v.id === productInfo.id)
  if(index === -1) { 
    cart.push({...productInfo,num: 1,checked: true})
  } else {
    cart[index].num = cart[index].num + 1
  }
  wx.setStorageSync('cart', cart)
  this.setData({cartList: cart})
  wx.showToast({
    title: '商品已放入购物车',
    icon: 'none'
  })
  this.cartWwing()
  this.setCart()
},

// 移除出购物车
doMinusNum(e) {
  let that = this
  console.log(e);
  let productInfo = e.currentTarget.dataset.item
  let cart = wx.getStorageSync('cart') || []
  let index = cart.findIndex(v => v.id === productInfo.id)
  if(cart[index].num > 1) {
    cart[index].num--;
    this.setCart(cart)
  } else if(cart[index].num == 1) {
    cart[index].num = 0
    wx.showModal({
      content: '确定不要了吗？',
      success(res) {
        if(res.confirm) {
          cart.splice(index,1)
        } else if(res.cancel) {
          cart[index].num = 1
        }
        that.setCart(cart)
      }
    })
  } 
},

// 设置购物车状态
setCart(cart) {
  cart = cart ? cart : wx.getStorageSync('cart') || []

  const result = cart.filter(function (obj) {
    return obj.checked === true // 判断名称属性是否包含指定的关键字
  });
  if(cart.length === 0 || result.length === 0) {
    this.setData({hideModal: true})
     
  }
  let allChecked = true,totalNum = 0,totalPrice = 0
  cart.forEach(v => {
    if(v.checked) {
      totalPrice += getRoundeNumber(v.price * v.num) * 1
      totalNum += v.num
    } else {
      allChecked = false
    }
  })
  allChecked = cart.length != 0 ? allChecked : false
  wx.setStorageSync('cart', cart)
  this.setData({
    allChecked,
    totalNum,
    totalPrice,
    cartList: cart
  })
  this.handleList()
},
// 加入购物车动画
cartWwing: function(){
  var animation = wx.createAnimation({
    duration: 100,
    timingFunction: 'ease-in'
  })
  animation.translateX(6).rotate(21).step()
  animation.translateX(-6).rotate(-21).step()
  animation.translateX(0).rotate(0).step()
  // 导出动画
  this.setData({
    ani: animation.export()
  })
},

// 购物车勾选
checkboxChange(e) {

  console.log(e);
  let { id } = e.currentTarget.dataset
  let cartList = JSON.parse(JSON.stringify(this.data.cartList))
  let index = cartList.findIndex(v => v.id === id)
  cartList[index].checked = !cartList[index].checked
  console.log('checkboxChange')
  console.log(cartList)
  this.setCart(cartList)
},

// 全选
handleAllCheck() {
  let { cartList,allChecked } = this.data
  allChecked = !allChecked
  cartList.forEach(v => v.checked = allChecked)
  this.setCart(cartList)
},

// 清空购物车
handleClearCart() {
  let that = this
  wx.showModal({
    content:'确定不要了吗？',
    success(res) {
      if(res.confirm) {
        that.setCart([])
      } else if(res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
},

// 支付跳转
placeTheOrder() {
  console.log('支付跳转')
  return
  let data = {}
  orderGoodsInsert(data).then(res => {
    if(res.data.code === 1) {
     //...
      // 删除缓存中已经下单的商品
      let newCart = wx.getStorageSync('cart').filter(v => !v.checked)
      this.setCart(newCart)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
  })
},

/**
 * 生命周期函数--监听页面显示
 */
onShow() {
  this.setCart()
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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