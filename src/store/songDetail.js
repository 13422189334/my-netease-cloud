const song = require('../assets/song/song.json')
import { getSongDetail } from '@/network/song.js'
import { getSongArray } from '@/network/recommend.js'
import { getRecommendSongs } from '@/network/recommend.js'
import { getSongListDetailDynamic } from '@/network/songList.js'

const songDetail = {
  state: {
    songDetail: song,
    songArray: [], // 歌单列表
    value: 0,
    play: undefined,
    isDaily: false, // 歌单 是否为 每日推荐
    songList: { boolean: false }, // 歌单头部动态,
    commentID: '', // 歌单id,
    commentData: null, // 歌单动态
    keywordList: ['起风了', '海阔天空'],
    keywords: ''
  },
  mutations: {
    setHeader(state) {
      state.songList.boolean = false
    },
    setSongList(state, payload) {
      state.songList = payload
    },
    /**
     * 添加搜索历史记录
     * @param state
     * @param keyword
     */
    setKeyword(state, keyword) {
      state.keywords = keyword
      const currentIndex = state.keywordList.findIndex(item => item === keyword)
      if (currentIndex !== -1) {
        state.keywordList.splice(currentIndex, 1)
      } else if (state.keywordList.length > 7) {
        state.keywordList.splice(state.keywordList.length - 1, 1)
      }
      state.keywordList.unshift(keyword)
    },
    /**
     * 根据角标移除搜索记录
     * @param state
     * @param index
     */
    removeKeyword(state, index) {
      state.keywordList.splice(index, 1)
    },
    setSongDetail(stata, payload) {
      stata.songDetail = payload
    },
    /**
     * 歌单列表
     * @param state
     * @param payload
     */
    setSongArray(state, payload) {
      state.isDaily = false
      state.songList = {
        ...payload,
        boolean: true
      }
      state.songArray = payload.tracks.map((e, i) => ({ ...e, index: i + 1 }))
    },
    /**
     * 设置歌手单曲
     * @param state
     * @param payload
     */
    setSongMusic(state, payload) {
      state.isDaily = false
      state.songArray = payload.map((e, i) => ({ ...e, index: i + 1 }))
    },
    /**
     * 每日歌曲推荐
     * @param state
     * @param payload
     */
    setEverySong(state, payload) {
      state.isDaily = true
      state.songArray = payload.map((e, i) => ({ ...e, index: i + 1 }))
    },
    /**
     * 置底音乐面板切换歌曲
     * @param state
     * @param value
     */
    changeMusic(state, value) {
      state.value += value
      if (state.value < 0) {
        state.value = state.songArray.length - 1
      } else if (state.value > state.songArray.length - 1) {
        state.value = 0
      }
      state.songDetail = state.songArray[state.value]
    },
    // 双击播放
    play(state, index) {
      state.value = index
      state.play++
    },
    setIsDaily(state, boolean) {
      state.isDaily = boolean
    },
    /**
     * 设置歌单id
     * @param state
     * @param id
     */
    setID(state, id) {
      state.commentID = id
    },
    /**
     * 歌单动态
     * @param state
     * @param data
     */
    setDynamic(state, data) {
      state.commentData = data
    }
  },
  actions: {
    /**
     * 歌曲id获取歌曲详情
     * @param context
     * @param id
     * @returns {Promise<unknown>}
     */
    getSongDetailData(context, id) {
      return new Promise(resolve => {
        getSongDetail(id).then(res => {
          context.commit('setSongDetail', res.data.songs[0])
          resolve(true)
        })
      })
    },
    /**
     * 每日推荐歌曲
     * @param context
     */
    getEverySong(context) {
      getRecommendSongs().then(res => {
        context.commit('setEverySong', res.data.data.dailySongs)
      })
    },
    /**
     * 歌单列表
     * @param context
     * @param id
     */
    async getSongList(context, id) {
      context.commit('setID', id)
      context.commit('setHeader')
      getSongListDetailDynamic(id).then(res => {
        context.commit('setDynamic', res.data)
      })
      const res = await getSongArray(id)
      context.commit('setSongArray', res.data.playlist)
    }
  },
  getters: {}
}

export default songDetail
