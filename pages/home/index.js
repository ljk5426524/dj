// pages/home/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'

import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, data, total = 0) {
    console.log('data', data)
    let color = ['#599DFBFF', '#FF823BFF', '#FFD772FF'];
    const option = {
        color,
        title: {
            text: '{name| 项目总数 }\n{val|' + total + '}',
            top: 'center',
            left: 'center',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#666666',
                        padding: [10, 0]
                    },
                    val: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#333333',
                    }
                }
            }
        },
        series: [{
            name: '饼图',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '70%'],
            data,
            labelLine: {
                show: false
            },
            label: {
                show: false,
                position: 'center'
            },

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
        userInfo: null,
        homeData: {},
        ec: {
            lazyLoad: true,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.ecComponent = this.selectComponent('#chartPie');
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
        this.getHomeData()
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



    toSearch() {
        wx.navigateTo({
            url: `/pages/home-search/index`
        })
    },
    toPage(type) {
        const map = {
            1: '/pages/user/index'
        }
        console.log('jin')
        wx.navigateTo({
            url: map[type]
        })
    },
    getHomeData() {
        api.getHomeData({}).then(res => {
            // departmentPartyMembers: [{ departmentId: null, departmentName: null, partyMemberCount: 2 }]
            // planKeyPointsPercentage: "NaN"
            // themePartyDayPercentage: "NaN"
            // threeSessionsOneLessonPercentage: "NaN"
            // totalDepartments: 3
            // totalMeetings: 0
            // totalNonPartyMembers: 1
            // totalPartyMembers: 2
            // totalPlanKeyPoints: 0
            // totalThemePartyDay: 0
            // totalThreeSessionsOneLesson: 0
            this.setData({
                homeData: res.data
            })
            const { totalPlanKeyPoints, totalThemePartyDay, totalThreeSessionsOneLesson, totalMeetings } = res.data
            const data = [{
                value: totalPlanKeyPoints,
                name: '计划要点'
            }, {
                value: totalThemePartyDay,
                name: '主题党日'
            }, {
                value: totalThreeSessionsOneLesson,
                name: '三会一课'
            }]
            this.initChart(data, totalMeetings)
        })
    },
    initChart(data, totalMeetings) {
        this.ecComponent.init((canvas, width, height, dpr) => {
            console.log(width, height)
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
            });
            setOption(chart, data, totalMeetings);
            return chart;
        });
    },

})