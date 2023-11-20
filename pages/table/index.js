// pages/table/index.js
import api from '../../api/index'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		buttonClientRect: wx.getMenuButtonBoundingClientRect(),
		list: [],
		deptList: [],
		deptShow: false,
		pageInfo: {
			current: 1,
			size: 10
		},
		orgId: '',
		currentOrg: '全部支部',
		defaultIdx: 0
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
		this.getDeptList()
		this.getMeetRecordPage()
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

	getMeetRecordPage() {
		const { pageInfo: { current, size }, orgId, value } = this.data
		const param = {
			current,
			size,
		}
		if (orgId) {
			param.organizationId = orgId
		}
		if (value) {
			param.name = value
		}
		api.getMeetRecordPage(param).then(res => {
			const { pageInfo, list } = this.data
			const { records, total } = res.data
			this.setData({
				list: current === 1 ? records : [...list, ...records],
				pageInfo: {
					...pageInfo,
					total: total
				}
			})
		})
	},
	// 部门列表
	getDeptList() {
		api.getDeptList({}).then(res => {
			this.setData({
				deptList: [{ text: '全部支部', value: 0 }, ...res.data.map(i => {
					return {
						text: i.name,
						value: i.id
					}
				})],

			})
		})
	},
	loadMore() {
		const { pageInfo: { current, size, total } } = this.data
		if (current * size < total) {
			this.setData({
				pageInfo: {
					current: current + 1,
					size
				}
			}, () => {
				this.getMeetRecordPage()
			})
		}
	},
	onClose() {
		wx.showTabBar()
		this.setData({
			deptShow: false
		})
	},
	openSel() {
		wx.hideTabBar()
		this.setData({
			deptShow: true
		})
	},
	onConfirm(e) {
		const val = e.detail.value
		console.log(val)
		this.setData({
			pageInfo: {
				current: 1,
				size: 10
			},
			orgId: val.value,
			currentOrg: val.text
		}, () => {
			this.getMeetRecordPage()
		})
		this.onClose()
	},
	onCancel() {
		const { deptList, orgId } = this.data
		this.onClose()
		this.setData({
			defaultIdx: !orgId ? 0 : deptList.findIndex(i => i.value === orgId)
		})
	},
	onSearch() {
		this.setData({
			pageInfo: {
				current: 1,
				size: 10
			},
		}, () => {
			this.getMeetRecordPage()
		})
	},
	inputChange(e) {
		const val = e.detail
		this.setData({
			value: val
		})
	},
	exportTable(e) {
		console.log(e)
		const { year, month, name, oid } = e.currentTarget.dataset
		api.exportTableData({
			year,
			month,
			name,
			ornanizationId: oid
		}).then(res => {
			wx.downloadFile({
				url: res
			})
		})
	}
})