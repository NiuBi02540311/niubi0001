// pkgCart/pages/cart7/cart7.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    isCartEmpty: false, // 购物车是否有商品
    hasAllSelected: false, // 是否全选
    cartList2:[],
    cartList: [{
        merchantInfo: {
          merchantId: "111",
          name: "这是我家的小小小店",
          icon: '/assets/images/cart_none_a.png',
          hasSelected: false,
          isActivity: true
        },
        goodsList: [{
          id: 1111,
          merchantId: "111",
          title: '格力迷你静音台式电风扇',
          image: '/assets/images/cart_none_a.png',
          quantity: 4,
          price: 100,
          quantityUpdatable: false,
          hasSelected: false
        }]
      },
      {
        "merchantInfo": {
          "merchantId": "222",
          "name": "这是我家的小小小店",
          "icon": '/assets/images/cart_none_a.png',
          "hasSelected": false,
          "quantityUpdatable": false,
          "isActivity": false
        },
        "goodsList": [{
            "id": 2221,
            "merchantId": "222",
            "title": '格力迷你静音台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 4,
            "price": 130,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 22222,
            "merchantId": "222",
            "title": '格力家用台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 1,
            "price": 320,
            "quantityUpdatable": false,
            "hasSelected": false
          }
        ]
      },
      {
        "merchantInfo": {
          "merchantId": "333",
          "name": "这是我家的小小小店",
          "icon": '/assets/images/cart_none_a.png',
          "hasSelected": false,
          "isActivity": true
        },
        "goodsList": [{
            "id": 3331,
            "merchantId": "333",
            "title": '格力迷你静音台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 4,
            "price": 110,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 3332,
            "merchantId": "333",
            "title": '格力家用台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 1,
            "price": 310,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 3333,
            "merchantId": "333",
            "title": '格力迷你静音台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 4,
            "price": 120,
            "quantityUpdatable": false,
            "hasSelected": false
          }
        ]
      },
      {
        "merchantInfo": {
          "merchantId": "444",
          "name": "这是我家的小小小店",
          "icon": '/assets/images/cart_none_a.png',
          "hasSelected": false,
          "isActivity": false
        },
        "goodsList": [{
            "id": 4441,
            "merchantId": "444",
            "title": '格力迷你静音台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 4,
            "price": 130,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 4442,
            "merchantId": "444",
            "title": '格力家用台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 1,
            "price": 290,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 4443,
            "merchantId": "444",
            "title": '格力迷你静音台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 4,
            "price": 150,
            "quantityUpdatable": false,
            "hasSelected": false
          },
          {
            "id": 4444,
            "merchantId": "444",
            "title": '格力家用台式电风扇',
            "image": '/assets/images/cart_none_a.png',
            "quantity": 1,
            "price": 280,
            "quantityUpdatable": false,
            "hasSelected": false
          }
        ]
      }
    ],
    totalPrice: 0,
    recommends: [{
        image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1281982941,672088714&fm=26&gp=0.jpg",
        text: "哈哈哈哈哈",
        price: "¥59.99"
      },
      {
        image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593543702366&di=6e0d404920b3480730ffa7841d1a3e31&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777312e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69382f5431504858625843786958585858585858585f2121302d6974656d5f7069632e6a7067.jpg",
        text: "呵呵呵呵",
        price: "¥10.99"
      },
      {
        image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593544013692&di=82cbdcbb7ba6b5e29edbe930d828b6cb&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1156539113%2C3136930104%26fm%3D214%26gp%3D0.jpg",
        text: "嘿嘿嘿",
        price: "¥88.88"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({ isCartEmpty: this.data.cartList.length === 0 })
  },
/**
   * 由商家列表项选择商品组事件
   */
  selectGoodsGroup(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        const hasSelected = item.merchantInfo.hasSelected;
        item.merchantInfo.hasSelected = !hasSelected;
 
        item.goodsList.forEach(function (goods) {
          goods.hasSelected = item.merchantInfo.hasSelected;
        })
        return;
      };
    })
 
    this.setData({
      cartList: cartList,
    })
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 计算商品总价格事件
   */
  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let totalPrice = 0;
    cartList.forEach(function (item) {
      item.goodsList.forEach(function (goods) {
        // console.log(goods);
        if (goods.hasSelected) {
          totalPrice += goods.price * goods.quantity;
        }
        // console.log(totalPrice);
      })
    })
 
    this.setData({
      totalPrice: totalPrice
    })
  },
 
  /**
   * 验证是否全选事件
   */
  verifyHasAllSelected() {
    let hasAllSelected = true;
    let cartList = this.data.cartList;
    cartList.forEach(function (item) {
      if (!item.merchantInfo.hasSelected) {
        hasAllSelected = false;
        return;
      }
      item.goodsList.forEach(function (goods) {
        if (!goods.hasSelected) {
          hasAllSelected = false;
          return;
        }
      })
    })
    console.log(hasAllSelected);
    this.setData({
      hasAllSelected: hasAllSelected,
    })
  },
 
  /**
   * 单个商品选择事件
   */
  selectGoodsSingle(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            const hasSelected = goods.hasSelected;
            goods.hasSelected = !hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 商品数量减1事件
   */
  minus(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            if (goods.quantity <= 1) {
              wx.showToast({
                title: '商品数量少于1',
              })
            } else {
              goods.quantity -= 1;
            }
            hasSelected = goods.hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
  },
 
  /**
   * 商品数量加1事件
   */
  pluse(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            if (goods.quantity >= 10) {
              wx.showToast({
                title: '数量超过10',
              })
            } else {
              goods.quantity += 1;
            }
            hasSelected = goods.hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
 
  },
 
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let hasAllSelected = this.data.hasAllSelected;
    hasAllSelected = !hasAllSelected;
    let cartList = this.data.cartList;
    for (let i = 0; i < cartList.length; i++) {
      let item = cartList[i];
      item.hasSelected = hasAllSelected;
      item.merchantInfo.hasSelected = hasAllSelected;
      let goodsList = item.goodsList;
      for (let i = 0; i < goodsList.length; i++) {
        let goodsItem = goodsList[i];
        goodsItem.hasSelected = hasAllSelected;
      }
    }
 
    this.setData({
      hasAllSelected: hasAllSelected,
      cartList: cartList
    });
    this.calculateTotalPrice();
  },
 
  /**
   * 显示修改单个商品数量布局事件
   */
  showUpdateQuantity(e) {
    console.log(e);
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(merchantId, goodsId, true);
  },
 
  /**
   * 隐藏修改单个商品数量事件 
   */
  hideUpdateQuantity(e) {
    console.log(e);
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(merchantId, goodsId, false);
  },
 
  /**
   * 显示改商品数量对话框事件
   */
  showUpdateQuantityDialog() {
 
  },
 
  /**
   * 显示或者隐藏修改商品数量布局事件
   */
  showOrHideUpdateQuantity(merchantId, goodsId, quantityUpdatable) {
    let cartList = this.data.cartList;
    console.log(merchantId);
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            goods.quantityUpdatable = quantityUpdatable;
            return;
          }
        })
        return;
      }
 
    });
    this.setData({
      cartList: cartList,
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