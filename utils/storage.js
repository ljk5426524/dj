import {
  USER_INFO,
  OPEN_ID,
  TOKEN,
} from "./constant"


// 保存用户信息
export const saveLocalUserInfo = (userInfo) => {
  wx.setStorageSync(USER_INFO, userInfo)
}
// 获取用户信息
export const getLocalUserInfo = () => {
  return wx.getStorageSync(USER_INFO)
}
// 清空用户信息
export const deleteLocalUserInfo = () => {
  wx.removeStorageSync(USER_INFO)
}

// 保存openId
export const saveOpenId = (openId) => {
  wx.setStorageSync(OPEN_ID, openId)
}
// 获取openId
export const getOpenId = () => {
  return wx.getStorageSync(OPEN_ID)
}
// 清空openId
export const deleteOpenId = () => {
  wx.removeStorageSync(OPEN_ID)
}

// 保存token
export const saveToken = (token) => {
  wx.setStorageSync(TOKEN, token)
}
// 获取token
export const getToken = () => {
  return wx.getStorageSync(TOKEN)
}
// 清空token
export const deleteToken = () => {
  wx.removeStorageSync(TOKEN)
}