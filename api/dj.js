import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // 部门列表
  getDeptList(data) {
    return request({
      url: `${baseUrl}organization/list`,
      data,
      method: 'get'
    })
  },
  // 党建汇总表
  getMeetRecordPage(data) {
    return request({
      url: `${baseUrl}meetRecord/page`,
      data,
      method: "get",
      contentType: 'application/json'
    });
  },

  // 学习强国年度积分管理
  getScorePage(data) {
    return request({
      url: `${baseUrl}scoreDetail/yearlyScores`,
      data,
      method: "get",
      contentType: 'application/json'
    });
  },

  // 学习强国月度积分管理
  getMonthScorePage(data) {
    return request({
      url: `${baseUrl}scoreDetail/monthlyScores`,
      data,
      method: "get",
      contentType: 'application/json'
    });
  },

  // 首页
  getHomeData(data) {
    return request({
      url: `${baseUrl}statistics/home`,
      data,
      method: 'get'
    })
  },

  // 党员构成
  getMemberData(data) {
    return request({
      url: `${baseUrl}statistics/memberComposition`,
      data,
      method: 'get'
    })
  },

  // 建设
  getConstructData(data) {
    return request({
      url: `${baseUrl}statistics/department`,
      data,
      method: 'get',
      contentType: 'application/json'
    })
  },

  // 组织生活水平
  getLifeData(data) {
    return request({
      url: `${baseUrl}statistics/meeting`,
      data,
      method: 'get',
      contentType: 'application/json'
    })
  },

  // 积分详情统计
  getScoreDetailData(data) {
    return request({
      url: `${baseUrl}scoreDetail/monthlyRanking`,
      data,
      method: 'get',
      contentType: 'application/json'
    })
  },
  // 表导出
  exportTableData(data) {
    return request({
      url: `${baseUrl}meetRecord/excel`,
      data,
      method: 'get',
      contentType: 'application/json'
    })
  }
}