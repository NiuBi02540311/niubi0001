// app.js
//https://blog.csdn.net/m0_73334325/article/details/129057287
import {promisifyAll} from "miniprogram-api-promise"
const wxp = wx.p = {}
//promisify所有wx异步api
promisifyAll(wx,wxp)

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
