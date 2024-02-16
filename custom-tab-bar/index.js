// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../store/store'
Component({
  options:{
    styleIsolation:"shared"
  },
  behaviors:[storeBindingsBehavior ],
  storeBindings:{
      store,
      fields:{
        sum: 'sum',active: 'activeTabBarIndex'
      },
      actions: {
        updateActive: 'updateActiveTabBarIndex'
      }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },
  observers:{
    "sum": function (value){
      this.setData({
        "list[1].info": value
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    active: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [ {
      "pagePath": "/pages/home/home",
      "text": "主页",
      "iconPath": "/images/tabs/home2.png",
      "selectedIconPath": "/images/tabs/home1.png",
      "icon":"home-o"
    },
    {
      "pagePath": "/pages/message/message",
      "text": "消息",
      "iconPath": "/images/tabs/message1.png",
      "selectedIconPath": "/images/tabs/message2.png",
      "icon":"search",
      "info":3
    },
    {
      "pagePath": "/pages/market/market",
      "text": "圈子",
      "iconPath": "/images/tabs/ren2.png",
      "selectedIconPath": "/images/tabs/ren1.png",
      "icon":"friends-o"
    },
    {
      "pagePath": "/pages/customer/customer",
      "text": "我的",
      "icon":"friends-o"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      return
      console.log("执行跳转", e);
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    },
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      //console.log(event)
      //this.setData({ active: event.detail });
      this.updateActive(event.detail)
      wx.switchTab({
        url:this.data.list[event.detail].pagePath
      })
      //console.log(this.data.list[this.data.active])
    },
  }
})