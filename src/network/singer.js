import { request } from '@/network/index.js'

/**
 * 歌手分类列表
 * @param params
 * @returns {*}
 */
export function getSingerCategory(params) {
  return request({
    url: '/artist/list',
    params
  })
}

/**
 * 热门歌手
 * @returns {*}
 */
export function getSingerTop() {
  return request({
    url: '/top/artists'
  })
}

/**
 * 歌手热门50首歌曲
 * @param id
 * @returns {*}
 */
export function getSingerSong(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}

/**
 * 歌手专辑
 * @param id
 * @param offset
 * @returns {*}
 */
export function getSingerAlbum(id, offset) {
  return request({
    url: '/artist/album',
    params: {
      id,
      limit: 10,
      offset
    }
  })
}

/**
 * 歌手详情
 * @param id
 * @returns {*}
 */
export function getSingerDetail(id) {
  return request({
    url: '/artist/detail',
    params: {
      id
    }
  })
}

/**
 * 歌手描述
 * @param id
 * @returns {*}
 */
export function getSingerDesc(id) {
  return request({
    url: '/artist/desc',
    params: {
      id
    }
  })
}

/*
相似歌手
 */
export function getSimiSinger(id) {
  return request({
    url: '/simi/artist',
    params: {
      id
    }
  })
}

/**
 * 歌手MV
 * @param id
 * @returns {*}
 */
export function getSingerMV(id) {
  return request({
    url: '/artist/mv',
    params: {
      id
    }
  })
}
