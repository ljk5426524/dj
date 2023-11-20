// pages/score/index.js
import api from '../../api/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        type: 'jump',
        deptList: [],
        deptShow: false,
        orgId: '',
        currentOrg: '全部支部',
        defaultIdx: 0,
        pageInfo: {
            current: 1,
            size: 10,
            total: 0
        },
        data: [{
            id: 1,
            name: '张三',
            dept: '软件1401',
            count: 2000
        }, {
            id: 3,
            name: '张三',
            dept: '软件1401',
            count: 2000
        }, {
            id: 1,
            name: '张三',
            dept: '软件1401',
            count: 2000
        }],
        list: [{
            id: 1,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 3,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 4,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 4,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 4,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 4,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }, {
            id: 4,
            name: '张三',
            dept: '软件1401',
            count: 2000,
            open: 0
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getDeptList()
        this.getScorePage()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 部门列表
    getDeptList() {
        api.getDeptList({}).then(res => {
            this.setData({
                deptList: [{ text: '全部支部', value: 0 }, ...res.data.map(i => {
                    return {
                        text: i.name,
                        value: i.id
                    }
                })],
            })
        })
    },
    getScorePage() {
        const { pageInfo: { current, size }, orgId } = this.data
        const param = {
            page: current,
            size,
            year: new Date().getFullYear(),
        }
        if (orgId) {
            param.organizationId = orgId
        }
        api.getScorePage(param).then(res => {
            const { data, list } = this.data
            const { total, records } = res.data
            this.setData({
                pageInfo: {
                    current,
                    size,
                    total: total
                },
                data: current === 1 ? records.slice(0, 3) : data,
                list: current === 1 ? records.slice(3).map(i => {
                    return {
                        ...i,
                        open: 0
                    }
                }) : [...list, ...records.map(i => {
                    return {
                        ...i,
                        open: 0
                    }
                })]
            })
        })
    },
    loadMore() {
        const { pageInfo: { current, size, total } } = this.data
        if (current * size < total) {
            this.setData({
                pageInfo: {
                    ...this.data.pageInfo,
                    current: current + 1
                }
            }, () => {
                this.getScorePage()
            })
        }
    },
    onClose() {
        wx.showTabBar()
        this.setData({
            deptShow: false
        })
    },
    openSel() {
        wx.hideTabBar()
        this.setData({
            deptShow: true
        })
    },
    onConfirm(e) {
        const val = e.detail.value
        this.setData({
            pageInfo: {
                current: 1,
                size: 10
            },
            orgId: val.value,
            currentOrg: val.text
        }, () => {
            this.getScorePage()
        })
        this.onClose()
    },
    onCancel() {
        const { deptList, orgId } = this.data
        this.onClose()
        this.setData({
            defaultIdx: !orgId ? 0 : deptList.findIndex(i => i.value === orgId)
        })
    },
})