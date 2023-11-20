// pages/login/index.js
import api from "../../api/index";
import { ROLE_TYPE } from "../../utils/constant";
import { saveLocalUserInfo, saveOpenId, saveToken } from "../../utils/storage";
import { wxToast } from "../../utils/wx-api";


const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
    weixinOpenId: "",

    account: '',
    password: '',
    checked: false,
    remChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const username = wx.getStorageSync('username')
    const password = wx.getStorageSync('password')
    if (username && password) {
      this.setData({
        account: username,
        password: password,
        remChecked: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },


  getUserPhone(e) {
    const { errMsg } = e.detail;
    if (errMsg === "getPhoneNumber:fail user deny") {
      // 用户拒绝
    } else if (errMsg === "getPhoneNumber:ok") {
      const { encryptedData, iv } = e.detail;

      wx.login({
        success: (response) => {
          api
            .getUserPhone({
              code: response.code,
              encryptedData,
              iv,
            })
            .then((res) => {
              const { phoneNumber } = res.data;
              const { weixinOpenId } = this.data;
              api
                .registeByUserPhone({
                  openId: weixinOpenId,
                  mobile: phoneNumber,
                  appId: ROLE_TYPE,
                })
                .then(async (res2) => {
                  if (res2.code === "0") {
                    saveLocalUserInfo(res2.data.userInfo);
                    saveToken(res2.data.token);
                    wxToast.show({
                      title: "授权成功",
                      done: () => {
                        if (this.checkNeedFillInfo(res2.data.userInfo)) {
                          wx.redirectTo({
                            url:
                              ROLE_TYPE === 1
                                ? "/pages/my-info/index"
                                : "/pages/my-info-doctor/index",
                          });
                        } else {
                          this.initIM(res2.data.userInfo)
                        }
                      },
                    });
                  }
                });
            });
        },
      });
    }
  },






  onCheckboxChange() {
    const { checked } = this.data
    this.setData({
      checked: !checked
    })
  },
  onRemCheckChange() {
    const { remChecked } = this.data
    this.setData({
      remChecked: !remChecked
    })
  },
  toAgreement(e) {
    const id = e.currentTarget.dataset.id
    console.log(1111, id)
  },
  forget() {
    console.log('forget')
  },
  login() {
    wx.requestSubscribeMessage({
      tmplIds: ['BT9WfswJueUjGyJ4vkfvn7JMezA_RDx-DkjtOhUoQZQ'],
      complete: (res) => {
        console.log('complete', res)
        this.toLogin()
      }
    })
  },
  toLogin() {
    const { password, account, checked, remChecked } = this.data
    if (!password || !account) {
      wxToast.show({
        title: '请输入账号或密码',
        icon: 'none',
      })
      return false
    }
    if (!checked) {
      wxToast.show({
        title: '请阅读并同意用户协议',
        icon: 'none',
      })
      return false
    }
    if (remChecked) {
      wx.setStorageSync('username', account);
      wx.setStorageSync('password', password);
    } else {
      wx.removeStorageSync('username')
      wx.removeStorageSync('password')
    }
    wx.login({
      success: (response) => {
        api
          .toLogin({
            code: response.code,
            password: password,
            userName: account
          }).then(res => {
            saveLocalUserInfo(res.data);
            saveToken(res.data.token);

            wxToast.show({
              title: "登录成功",
              done: () => {
                wx.switchTab({
                  url: "/pages/home/index"
                })
              }
            })
          })
      }
    })
  }
});
