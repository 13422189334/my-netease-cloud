<template>
  <audio id="audio" ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`" loop/>
  <el-row :gutter="20" class="row-audio">
    <el-col :span="7">
      <div class="block-audio-title" @mouseenter="changeMouseEnter(true)" @mouseleave="changeMouseEnter(false)">
        <i
          :class="['iconfont icon-image', drawer === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
          v-show="mouseenter"
          @click="changeDrawer(!drawer)"
        />
        <el-avatar
          :class="[mouseenter ? 'active' : '']"
          shape="square"
          size="50"
          :src="songDetail.al.picUrl"
          @click="changeDrawer(true)"
        />
        <div class="music-title">
          {{songDetail.name}}
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="block-radio-button">
        <i
          :class="['iconfont', like ? 'icon-xihuan' : 'icon-aixin']"
          :title="like ? '已收藏' : '收藏'"
          @click="changeLike"
        />
        <i class="iconfont icon-shangyiqu" title="上一曲" @click="next(-1)"/>
        <i
          :class="['iconfont icon-play', isPlay ? 'icon-bofang1' :'icon-icon-bofang']"
          @click="playMusic"
        />
        <i class="iconfont icon-xiayiqu" title="下一曲" @click="next(1)"/>
        <svg class="svg" @click="clickLyricIcon" aria-hidden="true">
          <use xlink:href="#icon-minganci"></use>
        </svg>
      </div>
    </el-col>
    <el-col :span="3">
      <div> {{$formatTime(currentTime).slice(-5)}} / {{$formatTime(songDetail.dt).slice(-5)}}</div>
    </el-col>
    <el-col :span="5">
      <div class="block-slider">
        <el-slider v-model="sliderPercent" input-size="mini" :show-tooltip="false" @change="sliderChange"/>
      </div>
    </el-col>
  </el-row>
  <!--  弹出层-->
  <el-drawer :with-header="false" :append-to-body="true" v-model="drawer" direction="btt" :size="`${size}%`">
    <lyric-popup ref="dom" :currentTime="currentTime" :lyricArr="lyricArr" @closeLyricPopup="closePopup" @scrollPlay="scrollPlay"/>
  </el-drawer>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import {
  defineAsyncComponent,
  ref,
  defineEmits,
  computed,
  watch,
  nextTick
} from 'vue'
import { useStore } from 'vuex'
import { getLikeMusic, getLyric } from '@/network/song.js'
import { likeMusic } from '@/network/user.js'
import { debounce } from '@/utlis/debounce.js'

import eventBus from '@/utlis/eventbus.js'
import { formatLyric } from '@/utlis/formatData.js'

const lyricPopup = defineAsyncComponent(() => import('./lyricPopup.vue'))
const store = useStore()
const emit = defineEmits(['updateBackgroundColor'])

const songDetail = computed(() => store.state.songDetail.songDetail)
const audio = ref(null) // 歌曲
const lyricArr = ref() // 歌词
const like = ref(false) // 音乐是否点赞收藏
const isPlay = ref(false) // 音乐是否播放中
const currentTime = ref(0) // 歌曲播放进度
const sliderPercent = ref(0) // 歌曲进度条百分比
const mouseenter = ref(false) // 鼠标是否在图片上 图片放大
const drawer = ref(false) // drawer 包裹弹出层popup是否弹出
const size = ref(0) // popup 弹出框尺寸

/**
 * 鼠标事件mouseenter
 **/
const changeMouseEnter = bool => {
  mouseenter.value = bool
}

/**
 * 鼠标事件mouseenter
 **/
const changeDrawer = bool => {
  drawer.value = bool
}

/**
 * 监听 drawer，抛出 updateBackgroundColor 事件，调整 footer背景色
 **/
watch(() => drawer.value, (newValue) => {
  size.value = 100
  if (newValue) {
    emit('updateBackgroundColor', undefined)
  } else {
    emit('updateBackgroundColor', '#ffffff')
  }
})

/**
   * 关闭歌词 popup
   * */
const closePopup = () => {
  drawer.value = false
}

/**
 * 点击歌词 icon，打开关闭 popup
 **/
const clickLyricIcon = () => {
  size.value = size.value === 100 ? 0 : 100
  drawer.value = !drawer.value
}

/**
 * 修改歌曲的收藏状态
 **/
const changeLike = debounce(() => {
  if (store.state.login.profile) {
    likeMusic(songDetail.value.id, like.value).then((res) => {
      if (like.value && res.data.code === 200) {
        ElMessage.success({
          type: 'success',
          message: '收藏成功'
        })
      } else {
        ElMessage.success({
          type: 'success',
          message: '取消收藏'
        })
      }
      like.value = !like.value
    })
  } else {
    ElMessage.error({
      type: 'error',
      message: '未登录'
    })
  }
}, 1000)

/**
 * 切换歌曲
 **/
const next = (value) => {
  const musicNum = computed(() => store.state.songDetail.songArray.length)
  if (musicNum.value > 1) {
    store.commit('changeMusic', value)
    isPlay.value = true
    setTimeout(() => {
      playMusic()
    })
  } else {
    ElMessage.warning({
      message: '无可播放的歌曲列表',
      type: 'warning'
    })
  }
}

/**
 * 记录 歌曲播放时间
 * 将歌词同步到顶部
 **/
const play = () => {
  currentTime.value = parseInt(audio.value.currentTime * 1000)
  sliderPercent.value = parseInt(audio.value.currentTime / audio.value.duration * 100)

  // 同步歌词
  const currentIndex = lyricArr?.value.findIndex((item, index) => currentTime.value >= item.time && currentTime.value < lyricArr.value[index + 1].time)
  eventBus.emit('sync-lyric', lyricArr?.value[currentIndex]?.lyric)

  // 自动切换
  if (audio.value.currentTime >= audio.value.duration - 0.5) {
    console.log('播放结束')
    next(1)
  }
}

let intervalTimer // 音频播放时间 间隔计时器
let timeOutTimer // 音频播放 计时器

/**
 * 暂停/播放 音乐
 **/
const playMusic = () => {
  nextTick(() => {
    audio.value.addEventListener('error', () => {
      if (timeOutTimer) clearTimeout(timeOutTimer)
      timeOutTimer = setTimeout(() => {
        ElMessage.error('暂无音频已自动切换下一首')
        next(1)
      }, 200)
    }, true)
  })
  if (audio.value.paused) {
    audio.value.play()
    isPlay.value = true
    intervalTimer = setInterval(play, 500)
  } else {
    audio.value.pause()
    isPlay.value = false
    clearInterval(intervalTimer)
  }
  store.commit('setPlay')
}

/**
 * 修改播放音乐的时间
 **/
const sliderChange = (value, boolean = true) => {
  clearInterval(intervalTimer)
  setTimeout(() => {
    if (boolean) {
      audio.value.currentTime = (audio.value.duration * value) / 100
    } else {
      audio.value.currentTime = value / 1000
    }
    audio.value.play()
    isPlay.value = true
    intervalTimer = setInterval(play, 500)
  })
}

/**
 * 拖动歌词修改音乐播放时间
 **/
const scrollPlay = (time) => {
  sliderChange(time, false)
}

/**
 * 监听切换的音乐的收藏状态
 * 查询歌词
 **/
watch(songDetail, async(newValue) => {
  console.log('加载音乐-----', newValue.name, songDetail.value.id)
  like.value = store.state.singer.likeMusic.includes(songDetail.value.id)

  const res = await getLyric(newValue.id)
  lyricArr.value = formatLyric(res.data.lrc.lyric)
}, { deep: true, immediate: true })

eventBus.on('playMusic', () => {
  setTimeout(() => {
    playMusic()
  })
})

eventBus.on('login1', () => {
  getLikeMusic(store.state.login.profile.userId).then((res) => {
    store.commit('setLikeMusic', res.data.ids)
    like.value = store.state.singer.likeMusic.includes(songDetail.value.id)
  })
})

</script>

<style scoped lang="less">
  .iconfont {
    color: rgba(49, 48, 48, 0.8);
    z-index: 100;
  }

  .row-audio {
    z-index: 10000000 !important;

    .block-audio-title {
      position: relative;
      display: flex;
      align-items: center;

      .icon-image {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 20px;
        /*font-size: 35px;*/
        color: white;
      }

      .active {
        transition: all 1s;
        transform: scale(1.1);
      }

      .music-title {
        width: 90%;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .block-radio-button {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .icon-aixin {
        color: red;
      }

      .icon-xihuan {
        color: red;
        font-size: 22px;
      }

      .icon-play {
        font-size: 40px;
        color: #cc7013;
      }

      .svg {
        width: 30px;
        height: 30px;
      }
    }

    .block-slider {
      padding-top: 12px;
    }
  }
</style>
