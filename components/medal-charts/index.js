Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    medalData: {
      type: Array
    },
    type: {
      type: String,
    },
  },
  data: {
    medalData1: []
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    collepseItem(e) {
      const { org, uid } = e.currentTarget.dataset
      let { type } = this.data
      console.log(type, this.properties)
      if (type === 'jump') {
        wx.navigateTo({
          url: `/pages/score-detail/index?id=${org}&uId=${uid}`
        })
      }
    }
  }
})