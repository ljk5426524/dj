Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    list: {
      type: Array
    },
    type: {
      type: String,
    },
  },
  data: {
    listData1: [{
      open: 0,
      name: '张三',
      id: 1,
      dept: '研发部',
      val: 9,
      list: [{
        year: '2023年1月',
        count: 2
      }, {
        year: '2023年2月',
        count: 1
      }]
    }, {
      open: 0,
      name: '李四',
      id: 2,
      dept: '研发部',
      val: 10,
      list: [{
        year: '2023年1月',
        count: 3
      }]
    }, {
      open: 0,
      name: '王五',
      id: 3,
      dept: '研发部',
      val: 11,
      list: [{
        year: '2023年1月',
        count: 2
      }, {
        year: '2023年2月',
        count: 1
      }]
    }, {
      open: 0,
      name: '赵六',
      id: 4,
      dept: '研发部',
      val: 12,
      list: [{
        year: '2023年1月',
        count: 2
      }, {
        year: '2023年2月',
        count: 1
      }]
    }]
  },
  onShow() {
    console.log('onShow', this.data)
  },
  onLoad() {
    console.log('onLoad', this.data)
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    collepseItem(e) {
      const { index, open, org, uid } = e.currentTarget.dataset
      let { listData1, type } = this.data
      console.log(type, this.properties)
      if (type === 'jump') {
        wx.navigateTo({
          url: `/pages/score-detail/index?id=${org}&uId=${uid}`
        })
      } else {
        if (open === 0) {
          listData1 = listData1.map(i => {
            return {
              ...i,
              open: 0
            }
          })
        }
        listData1[index].open = open === 1 ? 0 : 1
        this.setData({
          listData1
        })
      }
    }
  }
})