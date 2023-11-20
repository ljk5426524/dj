// pages/score-detail/index.js
import api from '../../api/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        scoreList: [],
        pageInfo: {
            current: 1,
            size: 10,
            total: 0
        },
        rankDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id, uId } = options
        this.setData({
            orgId: id,
            uId
        }, () => {
            this.getScoreDetailData()
            this.getMonthScorePage()
        })
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

    back() {
        wx.navigateBack({
            delta: 1
        })
    },
    changeTab(e) {
        const { pageInfo } = this.data
        const idx = e.currentTarget.dataset.idx;
        this.setData({
            active: idx,
            pageInfo: {
                ...pageInfo,
                current: 1
            }
        }, () => {
            if (idx === 1) {
                this.getMonthScorePage()
            } else {
                this.getScorePage()
            }
        })
    },
    getScorePage() {
        const { pageInfo: { current, size }, orgId } = this.data
        api.getScorePage({
            page: current,
            size,
            organizationId: orgId,
            year: new Date().getFullYear()
        }).then(res => {
            const { scoreList } = this.data
            const { total, records } = res.data
            this.setData({
                pageInfo: {
                    current,
                    size,
                    total
                },
                scoreList: current === 1 ? records : [...scoreList, ...records]
            })
        })
    },
    getMonthScorePage() {
        const { pageInfo: { current, size }, orgId } = this.data
        api.getMonthScorePage({
            page: current,
            size,
            organizationId: orgId,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }).then(res => {
            const { scoreList } = this.data
            const { total, records, } = res.data
            this.setData({
                pageInfo: {
                    current,
                    size,
                    total
                },
                scoreList: current === 1 ? records : [...scoreList, ...records]
            })
        })
    },
    getScoreDetailData() {
        const { orgId, uId } = this.data
        api.getScoreDetailData({
            organizationId: orgId,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            userId: uId
        }).then(res => {
            this.setData({
                rankDetail: res.data
            })
        })
    },
    loadMore() {
        const { pageInfo: { current, size, total }, active } = this.data
        if (current * size < total) {
            this.setData({
                pageInfo: {
                    ...this.data.pageInfo,
                    current: current + 1
                }
            }, () => {
                if (active === 1) {
                    this.getMonthScorePage()
                } else {
                    this.getScorePage()
                }
            })
        }
    }
})