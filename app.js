// app.js

App({
  onLaunch() {
    
    // 监听系统级事件
  },
  onUnload() {
  },

  globalData: {
    config: {
      userID: 'test2',
      SDKAPPID: 1400829197,
      SECRETKEY: '9056c295f5be389c2856a06597b843e75d9bdb5131d47101fd9f06a7ea417152', // Your secretKey
      EXPIRETIME: 604800,
    },
    isInit: false,
    userInfo: null
  },
  onSDKReady(event) {
    // 监听到此事件后可调用 SDK 发送消息等 API，使用 SDK 的各项功能。
    console.log('SDK_READY')
  }


})
