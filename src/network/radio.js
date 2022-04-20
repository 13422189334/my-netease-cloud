import { request } from '@/network/index.js'

/**
 * 获取推荐电台
 * @returns {*}
 */
export function getRadio() {
  return request({
    url: '/personalized/djprogram'
  })
}

export function getRecommend() {
  return request({
    url: `/dj/recommend`
  })
}

/**
 * 获取用户电台
 * @returns {*}
 */
export function getUserRadio() {
  return request({
    url: '/dj/sublist'
  })
}

/**
 * 电台个性推荐
 * @returns {*}
 */
export function getRadioRecommend() {
  return request({
    url: '/dj/personalize/recommend'
  })
}

/**
 * 独家放送(入口列表)
 * @returns {*}
 */
export function getUnique() {
  return request({
    url: '/personalized/privatecontent'
  })
}

export function getUniqueList(limit, offset) {
  return request({
    url: `/personalized/privatecontent/list`,
    params: {
      limit,
      offset
    }
  })
}

/**
 * 电台 - 分类
 * @returns {*}
 */
export function getCategory() {
  return request({
    url: '/dj/catelist'
  })
}

/**
 * 电台 - 分类推荐
 * @param id
 * @returns {*}
 */
export function getCategoryRadio(id) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type: id
    }
  })
}

/**
 * 电台 - 今日优选X
 * @returns {*}
 */
export function getTodayRadio() {
  return request({
    url: '/dj/today/perfered'
  })
}

/**
 * 电台轮播图
 * @returns {*}
 */
export function getBanner() {
  return request({
    url: '/dj/today/perfered'
  })
}

/**
 * 电台banner
 * @returns {*}
 */
export function getDjBanner() {
  return request({
    url: '/dj/banner'
  })
}

/**
 * 热门电台
 * @param offset
 * @returns {*}
 */
export function getHotRadio(offset) {
  return request({
    url: '/dj/hot',
    params: {
      limit: 6,
      offset
    }
  })
}

/**
 * 电台 - 付费精品
 * @param offset
 * @returns {*}
 */
export function getGoodRadio(offset) {
  return request({
    url: '/dj/toplist/pay',
    params: {
      limit: 6,
      offset
    }
  })
}

/**
 * 电台 - 类别热门电台
 * @returns {*}
 */
export function getRadioHot() {
  return request({
    url: '/dj/radio/hot?cateId=2001'
  })
}

/**
 * 电台 - 推荐类型
 * @returns {*}
 */
export function getCategoryRecommend() {
  return request({
    url: '/dj/category/recommend'
  })
}

/**
 * 电台 - 非热门类型
 * @returns {*}
 */
export function getNotHot() {
  return request({
    url: '/dj/category/excludehot'
  })
}

/**
 * 电台 - 节目详情
 * @param id
 * @returns {*}
 */
export function getRadioDetail(id) {
  return request({
    url: '/dj/program/detail',
    params: {
      id
    }
  })
}

/**
 * 电台 - 详情
 * @param rid
 * @returns {*}
 */
export function getDjDetail(rid) {
  return request({
    url: '/dj/detail',
    params: {
      rid
    }
  })
}

/**
 * 电台 - 节目(传电台id)
 * @param rid
 * @returns {*}
 */
export function getProgram(rid) {
  return request({
    url: '/dj/program',
    params: {
      rid
    }
  })
}

/**
 * 电台 - 声音榜
 * @returns {*}
 */
export function getTopList() {
  return request({
    url: '/dj/program/toplist',
    params: {
      limit: 30,
      offset: 0
    }
  })
}

/**
 * 电台 - 主播新人榜
 * @param type
 * @param offset
 * @returns {*}
 */
export function getNewTopList(type, offset) {
  return request({
    url: '/dj/toplist',
    params: {
      type,
      offset
    }
  })
}

/**
 * 24 小时节目榜
 * @returns {*}
 */
export function getHoursTopList() {
  return request({
    url: '/dj/program/toplist/hours',
    params: {
      limit: 30
    }
  })
}

/**
 * 电台 - 最热主播榜
 * @returns {*}
 */
export function getHotData() {
  return request({
    url: '/dj/toplist/popular',
    params: {
      limit: 30
    }
  })
}
