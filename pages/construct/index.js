// pages/construct/index.js

import api from '../../api/index'
import * as echarts from '../../ec-canvas/echarts';


function setOption(chart, data) {
    console.log('data', data)
    const option = {
        legend: {
            type: 'scroll',
            bottom: 0
        },
        series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['35%', '60%'],
            data
        }]
    };
    chart.setOption(option);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        ec: {
            lazyLoad: true,
        },
        deptList: [],
        deptShow: false,
        orgId: '',
        currentOrg: '',
        defaultIdx: 0,
        adminList: [],
        userList: []
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
        this.ecComponent = this.selectComponent('#chartPie');
        this.getDeptList()
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
    // 部门列表
    getDeptList() {
        api.getDeptList({}).then(res => {
            this.setData({
                deptList: res.data.map(i => {
                    return {
                        text: i.name,
                        value: i.id
                    }
                }),
                currentOrg: res.data[0].name,
                orgId: res.data[0].id
            }, () => {
                this.getConstructData()
            })
        })
    },
    getConstructData() {
        const { orgId } = this.data
        api.getConstructData({
            departmentId: orgId
        }).then(res => {
            const { educationDistribution, members } = res.data
            const eduMap = {
                belowHighSchool: '高中以下学历',
                bachelor: '本科学历',
                juniorCollege: '大专学历',
                graduateAndAbove: '研究生学历',
                other: '其他'
            }
            const eduChartsData = Object.keys(educationDistribution).map(key => ({
                name: eduMap[key],
                value: educationDistribution[key + 'Count']
            }));
            this.setData({
                adminList: members.filter(i => {
                    return i.roleCode && i.roleCode.includes('admin')
                }),
                userList: members.filter(i => {
                    return i.roleCode && i.roleCode.includes('user')
                }),
            })
            this.initChart(eduChartsData)
        })
    },
    initChart(data) {
        this.ecComponent.init((canvas, width, height, dpr) => {
            console.log(width, height)
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
            });
            setOption(chart, data);

            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });
    },
    onClose() {
        this.setData({
            deptShow: false
        })
    },
    openSel() {
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
            this.getConstructData()
        })
        this.onClose()
    },
    onCancel() {
        const { deptList, orgId } = this.data
        console.log(deptList.findIndex(i => i.value === orgId), orgId)
        this.setData({
            defaultIdx: !orgId ? 0 : deptList.findIndex(i => i.value === orgId),
        }, () => {
            this.onClose()
        })
    },
})