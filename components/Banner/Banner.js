// components/Banner/Banner.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      numA: ()=> store.numA,
      numB: ()=> store.numB,
      sum: 'sum'
    },
    actions:{
      updateB:'updateNumB'
    }


  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    banner_list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getBanner(){
      const localhost = getApp().globalData.localhost
      const {data:res}=await wx.p.request({
        methods:'GET',
        url: localhost + '/wx/getAppsByCategory'
      })
      //console.log(res);
      this.setData({
        banner_list:res
      })
    },
    btnHandler2(e){
      this.updateB(e.target.dataset.step)
    },
    imghandler(e){
      const page = e.target.dataset.page
      if(page && page == '') return
      wx.navigateTo({
        url: page
      })
    }
  },
  lifetimes:{
    created(){
      this.getBanner()
    }
  }
})