// pages/carttt/carttt.js
import Dialog from '@vant/weapp/dialog/dialog';
var shopList = require('./shopList.js');
var app = getApp();
const beforeClose = (action) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'confirm') {
        resolve(true);
      } else {
        // 拦截取消操作
        resolve(false);
      }
    }, 1000);
  });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCartDetail: false,
    list: [],//商品列表
    classifyViewed: '',//默认顶部
    buyNum: {},
    cart: [],
    surplusNum: {},
    sumMoney: 0.00, //购买总价
    buySum:0//购买总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetData()
    
  },
  ClearCart(){
    console.log('ClearCart')
    const t = this
    Dialog.confirm({
      title: '标题',
      message: '确定要清空购物车',
    })
      .then(() => {
        // on confirm
        t.setData({
          showCartDetail: false,
          classifyViewed: '',//默认顶部
          buyNum: {},
          cart: [],
          surplusNum: {},
          sumMoney: 0.00, //购买总价
          buySum:0//购买总数
          })
      })
      .catch(() => {
        // on cancel
      });
  
    //this.GetData()
  },
  GetData(){
    //请求后台得来的商品list，在这里就不写怎么获取的
    //在同级包下写了一个数据的js先引用讲解
    var list = shopList.List;
    // 购买商品的数量
    var data = { buyNum: {} };
    // 判断商品剩余使用，商品id为键 商品剩余为值
    var surplusNum = {};
    for (let i in list) {
      var id = list[i].id;
      // 更换商品种类（id不能以数字开头）
      list[i].id = 'a' + id;
      var goods = list[i].goods;
      for (let j in goods) {
        //拼接商品的图片,这里写死了开发过程中要写成配置文件
        //goods[j].image = 'http://127.0.0.1/object/' + goods[j].image;
        goods[j].image = '/images/tabs/gd.png';
        data.buyNum[goods[j].id] = 0;
        surplusNum[goods[j].id] = goods[j].surplusNum;//判断商品剩余
      }
    }
    //原始list存入data中方便页面遍历
    data.list = list;
    this.setData(data);
    this.setData({
      surplusNum: surplusNum,
      //作为一个比较的商品剩余
      surplusnumInfo: surplusNum,
      //默认一个商品种类选中
      classifySeleted: list[0].id
    });

  },
 //加
 add: function (e) {
  var detail = e.currentTarget.dataset.detail;//是否来自商品列表还是购物车
  var productId, classGoodsIndex, goodsIndex, image, rebatePrice, price, productName;
  if (detail == 'cart') {//购物车的加号
    productId = e.currentTarget.dataset.id;
    productName = e.currentTarget.dataset.name;
    price = e.currentTarget.dataset.price;
  } else {
    productId = e.target.dataset.id;
    classGoodsIndex = e.target.dataset.classgoodsindex;//商品种类的下标
    goodsIndex = e.target.dataset.goodsindex;//商品的下标
    image = this.data.list[classGoodsIndex].goods[goodsIndex].image;//商品图片
    rebatePrice = this.data.list[classGoodsIndex].goods[goodsIndex].rebatePrice;//优惠价格
    price = this.data.list[classGoodsIndex].goods[goodsIndex].standardPrice;//售价
    productName = this.data.list[classGoodsIndex].goods[goodsIndex].name;//商品名字
  }
  //判断优惠价格,没有util包先简单判断一下
  if (rebatePrice != null && rebatePrice != '') {
    price = rebatePrice;
  }
  var arrId = [];//商品id集合
  var arr = this.data.cart || [];
  //判断商品剩余(第一次加入购物车肯定没有所以加一)
  if (this.data.buyNum[productId] + 1 > this.data.surplusnumInfo[productId]) {
    wx.showToast({
      icon:'none',
      title: '商品剩余数量不足',
    })
    return false;
  }
  var buyCount = 1;
  //第一次加入商品
  if (arr.length == 0) {
    arr.push({
      id: productId,
      name: productName,
      price: price,
      buyCount: buyCount,
      buyMoney: this.buyOneMoney(price, buyCount),
      standardSellingPrice: this.data.list[classGoodsIndex].goods[goodsIndex].standardPrice,
      image: image
    });
  } else if (arr.length >= 1) {
    //商品id集合
    for (let g in arr) {
      arrId.push(arr[g].id);
    }
    //商品已存在的判断
    if (arrId.indexOf(productId) != -1) {
      for (let g in arr) {
        if (arr[g].id == productId) {
          arr[g].buyCount += 1;
          buyCount = arr[g].buyCount;
          arr[g].buyMoney = this.buyOneMoney(arr[g].price, arr[g].buyCount)
          break;
        }
      }
    } else {
      arr.push({
        id: productId,
        name: productName,
        price: price,
        buyCount: buyCount,
        buyMoney: this.buyOneMoney(price, buyCount),
        image: image
      });
    }
  }
  var data = { buyNum: this.data.buyNum};
  data.buyNum[productId] = buyCount;
  //用来显示加减购物的数量显示
  this.data.buyNum[productId] = buyCount;
  this.setData(data);
  
  //用于底部显示
  this.setData({
    sumMoney: this.buySumMoney(arr),
    cart: arr,
    buySum: this.buySum(arr),
  });
  //清空商品id集合
  arrId = [];
  //判断商品剩余与购买的数量
  var surplusnum = this.data.surplusNum;
  for (var i in surplusnum) {
    if (productId == i && surplusnum[i] != 0) {
      if (surplusnum[i] >= this.data.buyNum[i]) {
        let count = surplusnum[i] - 1;
        if (count <= 0) {
          surplusnum[i] = 0;
          break;
        } else {
          surplusnum[i] = count;
          break;
        }
      } else {
        break;
      }
    }
  }
   //更新商品剩余
  this.setData({
    surplusNum: surplusnum
  })
},

//减
subtract: function (e) {
  console.log('点击减号')
  var productId = e.target.dataset.id
  var arrId = [];
  var buyCount = 0;
  //判断商品剩余
  // if (this.data.surplusNum[productId] >= this.data.surplusnumInfo[productId]) {
  //   return false;
  // }
  var arr = this.data.cart || [];
  if (arr.length > 0) {
    for (let i in arr) {
      arrId.push(arr[i].id);
    }
    //商品在购物车中存在
    if (arrId.indexOf(productId) != -1) {
      for (let g in arr) {
        if (arr[g].id == productId) {
          arr[g].buyCount -= 1;
          buyCount = arr[g].buyCount;
          arr[g].buyMoney = this.buyOneMoney(arr[g].price, arr[g].buyCount)
        }
        if (arr[g].buyCount <= 0) {
          this.removeByValue(arr, arr[g].id);
        }
      }
    }
  }
  //判断购物车的商品
  if (arr.length <= 0) {
    this.setData({
      cart: []
    })
  } else {
    this.setData({
      cart: arr
    })
  }

  var data = { buyNum: this.data.buyNum };
  data.buyNum[productId] = buyCount;
  //用来显示加减购物的数量显示
  this.data.buyNum[productId] = buyCount;
  this.setData(data);
  this.setData({
    sumMoney: this.buySumMoney(arr),
    cart: arr,
    buySum: this.buySum(arr),
  });
  //清空商品id集合
  arrId = [];
  //判断剩余数量(剩余数量)
  var surplusnum = this.data.surplusNum;
  for (var i in surplusnum) {
    if (productId == i && this.data.buyNum[i] >= 0) {
      let count = surplusnum[i] + 1;
      surplusnum[i] = count;
      break;
    }
  }
  //更新商品剩余
  this.setData({
    surplusNum: surplusnum
  })
},

//该掏钱了，哈哈
submit: function () {
  //组装下参数
  var params = {};

},

//购买总数
buySum: function (array) {
  var sum = 0;
  for (var g in array) {
    if (array[g].buyCount >= 0) {
      sum += array[g].buyCount;
    } else {
      return sum;
    }
  }
  return sum;
},

//单个商品总价
buyOneMoney: function (price, buyCount) {
  if (buyCount <= 0) {
    return 0.00;
  } else {
    return parseFloat(price * buyCount * 10000000 / 10000000).toFixed(2);
  }
},

//购买总价
buySumMoney: function (array) {
  var sum = 0.00;
  for (let g in array) {
    if (array[g].buyCount >= 0) {
      sum += (array[g].buyCount * array[g].price * 10000000 / 10000000);
    } else {
      return sum;
    }
  }
  return parseFloat(sum).toFixed(2);
},

//定义根据id删除数组的方法
removeByValue: function (array, val) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == val) {
      array.splice(i, 1);
      break;
    }
  }
},

//左右关系联动
onGoodsScroll: function (e) {
  if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
    this.setData({
      scrollDown: true
    });
  } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
    this.setData({
      scrollDown: false
    });
  }
  var scale = e.detail.scrollWidth / 570,
    scrollTop = e.detail.scrollTop / scale,
    h = 0,
    classifySeleted,
    len = this.data.list;

  var list = this.data.list;
  for (let i in list) {
    //商品的高度也是根据总体的scrow-view来算的
    var goodsHeight = 70 + list[i].goods.length * (46 * 3 + 20 * 2);
    if (scrollTop >= h - 100 / scale) {
      classifySeleted = list[i].id;
    }
    h += goodsHeight;
  }
  this.setData({
    classifySeleted: classifySeleted
  });
},

//左侧点击事件
tapClassify: function (e) {
  var id = e.target.dataset.id;
  this.setData({
    classifyViewed: id
  });
  var self = this;
  setTimeout(function () {
    self.setData({
      classifySeleted: id
    });
  }, 100);
},

//底部购物车显示
showCartDetail: function () {
  this.setData({
    showCartDetail: !this.data.showCartDetail
  });
},

hideCartDetail: function () {
  this.setData({
    showCartDetail: false
  });
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