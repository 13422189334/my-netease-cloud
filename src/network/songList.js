import { request } from '@/network/index.js'

/**
 * 精选歌单
 * @param params
 * @returns {*}
 */
export function getExclusiveSong(params) {
  return request({
    url: '/top/playlist/highquality',
    params
  })
}

/**
 * 精选歌单列表
 * @returns {*}
 */
export function getSongListTags() {
  return request({
    url: '/playlist/highquality/tags'
  })
}

/**
 * 歌单详情动态
 * @param id
 * @returns {*}
 */
export function getSongListDetailDynamic(id) {
  return request({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}

/**
 * 歌单收藏者
 * @param params
 * @returns {*}
 */
export function getSongListCollect(params) {
  return request({
    url: '/playlist/subscribers',
    params
  })
}

/**
 * 全部歌单
 * @param params
 * @returns {*}
 */
export function getSongMenu(params) {
  return request({
    url: '/top/playlist',
    params
  })
}

/**
 * 歌单全部分类
 * @returns {*}
 */
export function getSongMenuCategory() {
  return request({
    url: '/playlist/catlist'
  })
}

/**
 * 热门歌单分类
 * @returns {*}
 */
export function getSongMenuHotCategory() {
  return request({
    url: '/playlist/hot'
  })
}

export function subscribe(id, t) {
  return request({
    url: `/playlist/subscribe`,
    params: {
      t,
      id
    }
  })
}
