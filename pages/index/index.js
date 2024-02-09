// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    showPrivacy: false,
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  test(){
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success () {
              // 微信运动步数1
              wx.getWeRunData({
                success (res) {
                  console.log(res)
                  // 拿 encryptedData 到开发者后台解密开放数据
                  const encryptedData = res.encryptedData
                  // 或拿 cloudID 通过云调用直接获取开放数据
                  const cloudID = res.cloudID
                }
              })
              
            }
          })
        }else{
          // 微信运动步数2
          console.log('微信运动步数2')
              wx.getWeRunData({
                success (res) {
                  // console.log(res)
                  // 拿 encryptedData 到开发者后台解密开放数据
                  const encryptedData = res.encryptedData
                  // 或拿 cloudID 通过云调用直接获取开放数据
                  const cloudID = res.cloudID
                },
                fail(err){
                  console.log(err)
                }
              })
        }
      }
    })
  },
  onLoad(){
    this.test()
    // wx.showModal({
    //   title: '提示',
    //   content: `需要您授权获取权限`,
    //   success: (operate) =>{

    //   }
    // })
    wx.onNeedPrivacyAuthorization(resolve => {
      // 需要用户同意隐私授权时
      // 弹出开发者自定义的隐私授权弹窗
      this.setData({
        showPrivacy: true
      })
      this.resolvePrivacyAuthorization = resolve
    })
    wx.requirePrivacyAuthorize({
      success: (res) => {
        // 用户同意授权
        // 继续小程序逻辑
        console.log('requirePrivacyAuthorize success')
        console.log(res)
      },
      fail: () => {}, // 用户拒绝授权
      complete: () => {}
    })
  },
  handleAgreePrivacyAuthorization() {
    // 用户点击同意按钮后
    this.resolvePrivacyAuthorization({ buttonId: 'agree-btn', event: 'agree' })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    console.log('onChooseAvatar')
    console.log(e)
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    console.log('onInputChange')
    console.log(e)
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    console.log('getUserProfile')
    console.log(e)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
