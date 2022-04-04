import { request } from '@/network/index'

export function getBanner() {
  return request({
    url: '/banner'
  })
}

/**
 * 推荐歌单
 * @param num
 * @returns {*}
 */
export function getSongList(num = 9) {
  return request({
    url: `/personalized?limit=${num}`
  })
}

/**
 * 每日歌曲推荐
 * @returns {*}
 */
export function getRecommendSongs() {
  return request({
    url: '/recommend/songs'
  })
}

/**
 * 单详情
 * @param id
 * @returns {*}
 */
export function getSongArray(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

/**
 * 歌单详情
 * @param id
 * @returns {*}
 */
export function getSongListDynamic(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
