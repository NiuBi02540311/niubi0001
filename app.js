// app.js
//https://blog.csdn.net/m0_73334325/article/details/129057287
//https://blog.csdn.net/cozy666/article/details/135222227
/*
npm i @vant/weapp -S --production
npm install miniprogram-api-promise
npm install --save mobx-miniprogram mobx-miniprogram-bindings
*/
/*
步骤 1：创建全局变量
首先，在 app.js 文件中创建一个全局变量。例如：
App({
globalData: {
userInfo: null
}
})
这个代码块创建了一个名为 “globalData” 的对象，其中包含一个名为 “userInfo”的属性。
步骤 2：使用全局变量
要在小程序的其他页面中使用全局变量，需要通过 getApp() 函数来获取 App 实例对象。例如：
var app = getApp()
在获取 App 实例对象之后，就可以使用 globalData 属性来访问全局变量。
例如，在 index.js 中设置 userInfo 变量：
var app = getApp()
Page({
data: {
userInfo: {}

},
onLoad: function () {
this.setData({
userInfo: app.globalData.userInfo
})
}
})
在页面加载时，将全局变量赋值给本地变量。
步骤 3：设置和更改全局变量的值
要设置和更改全局变量的值，只需在任何页面中使用以下代码：
var app = getApp()
app.globalData.userInfo = {
nickName: 'hello',
gender: 1
}
这个代码块更改了 userInfo 变量的值。
结论
使用全局变量是一种在微信小程序中轻松共享数据的方法。如果你需要在小程序中跨页面共享数据，请考虑使用全局变量。
也可以在调用页面写法： App.localhost
*/
import {promisifyAll} from "miniprogram-api-promise"
const wxp = wx.p = {}
//promisify所有wx异步api
promisifyAll(wx,wxp)

App({
  globalData:{
    userInfo: null, localhost:'http://localhost:57526'
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const url = this.globalData.localhost
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
                url: url + '/wx/code2Session?code='+ res.code,
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
              url: url + '/wx/code2Session?code='+ res.code,
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

  }
})
