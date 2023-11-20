export const wxLogin = params => {
	// 登录
	wx.login({
		success: res => {
			// 发送 res.code 到后台换取 openId, sessionKey, unionId
			typeof params.success === 'function' && params.success(res)
		}
	})
}

export const wxGetSetting = params => {
	// 获取用户的授权信息
	wx.getSetting({
		success: res => {
			if (res.authSetting['scope.userInfo']) {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
				wx.getUserInfo({
					success: res => {
						typeof params.success === 'function' && params.success(res)
					}
				})
			} else {
				console.log('用户未授权，需按钮引导授权')
			}
		}
	})
}

export const wxGetUserInfo = params => {
	// 在没有 open-type=getUserInfo 版本的兼容处理
	wx.getUserInfo({
		success: res => {
			typeof params.success === 'function' && params.success(res)
		}
	})
}

export const wxToast = {
	show({
		title = 'toast',
		duration = 2000,
		icon = 'none',
		mask = true,
		done = () => {},
		...rest
	}) {
		wx.showToast({
			title,
			duration,
			icon,
			mask,
			...rest
		})

		setTimeout(() => {
			wx.hideToast()
			done()
		}, duration)
	},

	hide() {
		wx.hideToast()
	}
}