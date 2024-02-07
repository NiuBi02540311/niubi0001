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
      const {data:res}=await wx.p.request({
        methods:'GET',
        //url: 'https://realwds-api.vercel.app/360/getAppsByCategory?cid=26&start=0&count=5',
        url:'http://localhost:57526/Test/getAppsByCategory'
      })
      console.log(res);
      this.setData({
        banner_list:res
      })
    },
    btnHandler2(e){
      this.updateB(e.target.dataset.step)
    }
  },
  lifetimes:{
    created(){
      this.getBanner()
    }
  }
})