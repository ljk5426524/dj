// pages/my/index.js
import api from '../../api/index'
import { getLocalUserInfo } from '../../utils/storage'
import { deleteLocalUserInfo, deleteToken } from "../../utils/storage";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        buttonClientRect: wx.getMenuButtonBoundingClientRect(),
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
        this.getUserInfo()
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
    getUserInfo() {
        this.setData({
            userInfo: getLocalUserInfo()
        })
    },
    logout() {
        api.logout({}).then(res => {
            deleteToken()
            deleteLocalUserInfo()
            wx.reLaunch({
                url: '/pages/login/index'
            })
        })
    }
})