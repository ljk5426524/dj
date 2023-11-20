// pages/user/index.js
import api from '../../api/index'
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, data) {
    console.log('data', data)
    const option = {
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['35%', '60%'],
            data
        }]
    };
    chart.setOption(option);
}
function setOption2(chart, data) {
    console.log('data', data)
    const option = {
        legend: {
            bottom: 0,
        },
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['0%', '60%'],
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
        chartsIdx: 0,
        ec: {
            lazyLoad: true,
        },
        ec2: {
            lazyLoad: true,
        },
        memberData: {}
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
        this.ec2Component = this.selectComponent('#chartPie2');
        this.getMemberData()
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

    chartsIdxChange(e) {
        const { partyChartsData, eduChartsData, ageChartsData } = this.data
        const idx = e.currentTarget.dataset.idx
        this.setData({ chartsIdx: idx })
        const map = {
            0: partyChartsData,
            1: ageChartsData,
            2: eduChartsData
        }
        this.initChart(map[idx])
    },
    back() {
        wx.navigateBack({
            delta: 1
        })
    },

    getMemberData() {
        api.getMemberData({}).then(res => {
            const { malePercentage, departmentDistribution: { percentages }, ageDistribution, educationDistribution, partyAgeDistribution } = res.data
            this.setData({
                memberData: {
                    ...res.data,
                    malePercentage: (malePercentage * 100).toFixed(0),
                    femalePercentage: 100 - ((malePercentage * 100).toFixed(0))
                },
            })
            // const deptChartsData = departmentDistribution.map(i => {

            // })
            const ageMap = {
                above30: '30岁以上',
                below20: '20岁以下',
                from20To30: '20-30岁',
            }
            const ageChartsData = Object.keys(ageDistribution).map(key => ({
                name: ageMap[key],
                value: ageDistribution[key + 'Count']
            }));
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
            const partyMap = {
                between1And5Years: '1-5年',
                over11Years: '超过10年',
                between6And10Years: '6-10年',
            }
            const partyChartsData = Object.keys(partyAgeDistribution).map(key => ({
                name: partyMap[key],
                value: partyAgeDistribution[key + 'Count']
            }));
            const deptChartsData = percentages.map(i => {
                return {
                    name: i.name,
                    value: i.count
                }
            })
            this.setData({
                ageChartsData,
                eduChartsData,
                partyChartsData,
            })
            this.initChart(partyChartsData)
            this.initChart2(deptChartsData)
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
    initChart2(data) {
        this.ec2Component.init((canvas, width, height, dpr) => {
            console.log(width, height)
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
            });
            setOption2(chart, data);

            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });
    },

})