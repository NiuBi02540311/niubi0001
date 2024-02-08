// 创建 store的实例
import { observable,action } from 'mobx-miniprogram'

export const store = observable({
  numA:1,
  numB:2,
  activeTabBarIndex: 0,
  get sum(){
    return this.numA + this.numB // get 代表是一个只读的方法
  },
  updateNumA:action(function(step){
    this.numA +=step
  }),
  updateNumB:action(function(step){
    this.numB +=step
  }),
  updateActiveTabBarIndex: action(function(index){
    this.activeTabBarIndex = index
  })
})