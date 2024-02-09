// app.js
//https://blog.csdn.net/m0_73334325/article/details/129057287
//https://blog.csdn.net/cozy666/article/details/135222227
/*
npm i @vant/weapp -S --production
npm install miniprogram-api-promise
npm install --save mobx-miniprogram mobx-miniprogram-bindings
*/
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

    wx.checkSession({
      success (res) {
        //session_key 未过期，并且在本生命周期一直有效
        //Userlogin() //重新登录
        console.log('session_key 未过期，并且在本生命周期一直有效')
        //console.log(res)
        if(1==1){
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log(res)
              wx.setStorageSync('code', res.code)
              wx.request({
                url: 'http://localhost:57526/test/code2Session?code='+ res.code,
                method:"GET",
                success:function(rs){
                  console.log(rs.data)
                  wx.setStorageSync('session_key', rs.data.session_key)
                  wx.setStorageSync('openid', rs.data.openid)
                },
                fail:function(err){
                  console.log(err)
                }
              })
              console.log('1111111111111111111111111111111111111111111')
            }
          })
        }
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        //this.Userlogin() //重新登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
            wx.setStorageSync('code', res.code)
            wx.request({
              url: 'http://localhost:57526/test/code2Session?code='+ res.code,
              method:"GET",
              success:function(rs){
                console.log(rs.data)
                wx.setStorageSync('session_key', rs.data.session_key)
                wx.setStorageSync('openid', rs.data.openid)
              },
              fail:function(err){
                console.log(err)
              }
            })
            console.log('1111111111111111111111111111111111111111111')
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null
  }
})
