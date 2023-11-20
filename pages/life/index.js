// pages/life/index.js
import api from "../../api/index";
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let chart2 = null;
function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        // title: {
        //     text: '测试下面legend的红色区域不应被裁剪',
        //     left: 'center'
        // },
        // legend: {
        //     data: ['A', 'B', 'C'],
        //     top: 50,
        //     left: 'center',
        //     backgroundColor: 'red',
        //     z: 100
        // },
        grid: {
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
            // show: false
        },
        series: [{
            name: 'A',
            type: 'line',
            smooth: true,
            data: [18, 36, 65, 30, 78, 40, 33]
        }, {
            name: 'B',
            type: 'line',
            smooth: true,
            data: [12, 50, 51, 35, 70, 30, 20]
        }, {
            name: 'C',
            type: 'line',
            smooth: true,
            data: [10, 30, 31, 50, 40, 20, 10]
        }]
    };

    chart.setOption(option);
    return chart;
}
function initChart2(canvas, width, height, dpr) {
    const chart2 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart2);

    var option = {
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['0%', '70%'],
            data: [{
                value: 55,
                name: '北京'
            }, {
                value: 20,
                name: '武汉'
            }, {
                value: 10,
                name: '杭州'
            }, {
                value: 20,
                name: '广州'
            }, {
                value: 38,
                name: '上海'
            }]
        }]
    };

    chart2.setOption(option);
    return chart2;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
        ec: {
            onInit: initChart
        },
        ec2: {
            onInit: initChart2
        }
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
        this.getLifeData()
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
    getLifeData() {
        api.getLifeData({
            current: 1,
            size: 10,
        }).then(res => { })
    }
})