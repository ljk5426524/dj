
import { wxToast } from './wx-api'
import { getToken } from './storage'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
export const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${formatNumber(year)}年${formatNumber(month)}月${formatNumber(day)}日`
}
export const getTimeShow = (time_str) => {

  var now = new Date();

  var date = new Date(time_str);

  //计算时间间隔，单位为分钟

  var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);

  if (inter == 0) {

    return "刚刚";

  }

  //多少分钟前

  else if (inter < 60) {

    return inter.toString() + "分钟前";

  }

  //多少小时前

  else if (inter < 60 * 24) {

    return parseInt(inter / 60).toString() + "小时前";

  }

  //本年度内，日期不同，取日期+时间  格式如  06-13 22:11

  else if (now.getFullYear() == date.getFullYear()) {

    return (date.getMonth() + 1).toString() + "-" +

      date.getDate().toString() + " " +

      formatNumber(date.getHours()) + ":" +

      formatNumber(date.getMinutes());

  }

  else {

    return date.getFullYear().toString() + "-" +

      (date.getMonth() + 1).toString() + "-" +

      date.getDate().toString()

  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

// => "hello=world&message=JavaScript%20is%20cool"
export function request({ url, data = {}, type, loadingText = '', isLoading = true, ...rest }) {
  const { contentType = "application/x-www-form-urlencoded;charset=utf-8", selfHandle = false } = rest
  const header = {}
  let requestName = type || 'request'

  header['content-type'] = contentType

  getToken() && (header.Authorization = `Bearer ${getToken()}`)

  return new Promise((reslove, reject) => {
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
        mask: true
      });
    }
    wx[requestName]({
      url,
      data:
        type || contentType === 'application/json' ? data : toUrlEncoded(data),
      header,
      ...rest,
      success: res => {
        console.log(res, 'res')
        isLoading && wx.hideLoading();

        if (res.header && res.header['Authorization']) {
          wx.setStorageSync('token', res.header['Authorization'])
        }
        let resData = res.data
        const { statusCode } = res
        if (statusCode === 403) {
          reject('非预期结果')
          wxToast.show({
            title: res.data.msg || '登录信息已过期,请重新登录',
            done: () => {
              wx.navigateTo({
                url: '/pages/login/index'
              })
            }
          })
        } else {

          if (typeof resData === 'string') {
            resData = JSON.parse(resData)
          }
          const { code } = resData

          if (+code === 200 || selfHandle) {
            reslove(resData)
          } else {
            reject('非预期结果')

            // session 过期
            if (code === 406 || code === 401 || code === 403) {
              wxToast.show({
                title: res.data.msg || '登录信息已过期,请重新登录',
                done: () => {
                  wx.navigateTo({
                    url: '/pages/login/index'
                  })
                }
              })
            } else if (code === 40006) {
              // 用户被禁用
              wxToast.show({
                title: res.data.errorMsg,
                done: () => {
                  wx.navigateTo({
                    url: '/pages/login/index'
                  })
                }
              })
            } else {
              wxToast.show({
                title: res.data.msg || '接口请求成功，但数据非预期，请稍后再试...',
              })

            }
          }
        }
      },
      fail: err => {
        isLoading && wx.hideLoading()

        wxToast.show({
          title: '网络异常，请稍后再试！',
        })

        reject(err)
      }
    });
  });
}
