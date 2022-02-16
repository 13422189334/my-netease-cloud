<template>
  <audio ref="audio" loop id="audio"
         :src="`https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`"></audio>
  <el-row :gutter="20" style="z-index: 10000000 !important;">
    <el-col :span="7">
      <div class="title" @mouseenter="open = true" @mouseleave="open = false">
        <i v-show="open" v-if="drawer === false" @click="drawer = true" class="iconfont el-icon-arrow-up"
           style="color: white;"></i>
        <i v-show="open" v-else @click="drawer = false" class="iconfont el-icon-arrow-down" style="color: white;"></i>
        <el-avatar :class="[open ? 'active' : '']" @click="drawer = true" shape="square" :size="50"
                   :src="songDetail.al.picUrl"></el-avatar>
        <div class="music-title">
          {{songDetail.name}}
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <main class="music">
        <div class="music-button">
          <i @click="changeLike" v-if="!like" title="收藏" class="iconfont icon-aixin"></i>
          <i @click="changeLike" v-else style="color: red;font-size: 22px;" title="已收藏"
             class="iconfont icon-xihuan"></i>
          <i title="上一曲" @click="next(-1)" class="iconfont icon-shangyiqu"></i>
          <i @click="playMusic" style="font-size: 40px; color: #cc7013;" class="iconfont"
             :class="[isPlay ? 'icon-bofang1' :'icon-icon-bofang']"></i>
          <i title="下一曲" @click="next(1)" class="iconfont icon-xiayiqu"></i>
          <svg class="svg" @click="clickLyricIcon" aria-hidden="true">
            <use xlink:href="#icon-minganci"></use>
          </svg>
        </div>
      </main>
    </el-col>
    <el-col :span="3">
      <div> {{$formatTime(currentTime).slice(-5)}} / {{$formatTime(songDetail.dt).slice(-5)}}</div>
    </el-col>
    <el-col :span="5">
      <el-slider @change="sliderChange" style="margin-top: 12px;" v-model="value" :show-tooltip="false"
                 input-size="mini"></el-slider>
    </el-col>
  </el-row>
  <!--  弹出层-->
  <el-drawer :with-header="false" :append-to-body="true" v-model="drawer" direction="btt" :size="`${size}%`">
    <popup @scrollPlay="scrollPlay" ref="dom" @close="closePopup" :currentTime="currentTime"></popup>
  </el-drawer>
</template>

<script setup>
  import {getLikeMusic} from "@/network/song.js";
  import {ElMessage} from 'element-plus'
  import {likeMusic} from "@/network/user.js";
  import {debounce} from "@/utlis/debounce.js";
  import eventBus from '@/utlis/eventbus.js'
  import {
    defineAsyncComponent,
    ref,
    defineEmits,
    defineComponent,
    computed,
    watch,
    toRefs,
    reactive,
    onMounted,
    nextTick
  } from "vue";
  import {useStore} from "vuex";

  const popup = defineAsyncComponent(() => import('./popup.vue'))
  const store = useStore()
  const emit = defineEmits(['updateBackgroundColor'])
  const name = ref('musicPanel') // 组件名
  let value = ref(0) // 组件名
  let isPlay = ref(false) // 是否播放中
  let open = ref(false) // 组件名
  let audio = ref(null) // 组件名
  let like = ref(false) // 是否点赞收藏
  let currentTime = ref(0) // 组件名
  let drawer = ref(false) // drawer 包裹弹出层popup是否弹出
  let size = ref(0) // popup 弹出框尺寸
  let dom = ref(null) // 组件名
  let backgroundColor = ref('#ffffff') // 组件名

  /**
   * 监听 drawer，抛出 updateBackgroundColor 事件，调整 footer背景色
   * */
  watch(() => drawer.value, newValue => {
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
   * */
  const clickLyricIcon = () => {
    size.value = size.value === 100 ? 0 : 100
    drawer.value = !drawer.value
  }

  /**
   * 修改歌曲的收藏状态
   * */
  const changeLike = debounce(() => {
    if (store.state.login.profile) {
      likeMusic(songDetail.value.id, like.value).then(res => {
        if (like && res.data.code === 200) {
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

  eventBus.on('playMusic', () => {
    setTimeout(() => {
      playMusic()
      audio.value.play()
    })
  })

  //播放音乐
  let timer
  const play = () => {
    currentTime.value = parseInt(audio.value.currentTime * 1000)
    value.value = parseInt(audio.value.currentTime / audio.value.duration * 100)
    //自动切换
    if (audio.value.currentTime >= audio.value.duration - 0.5) {
      console.log('播放结束')
      next(1)
    }
  }

  let timer1
  /**
   * 暂停/播放 音乐
   * */
  const playMusic = () => {
    nextTick(() => {
      audio.value.addEventListener("error", function () {
        if (timer1) clearTimeout(timer1)
        timer1 = setTimeout(() => {
          ElMessage.error('暂无音频已自动切换下一首')
          next(1)
        }, 200)
      }, true);
    })
    if (audio.value.paused) {
      audio.value.play()
      isPlay.value = true
      store.commit('setPlay')
      timer = setInterval(play, 500)
    } else {
      audio.value.pause()
      isPlay.value = false
      store.commit('setPlay')
      clearInterval(timer)
    }
  }
  //滑动
  const sliderChange = (value, boolean = true) => {
    clearInterval(timer)
    setTimeout(() => {
      if (boolean) {
        audio.currentTime = audio.duration * value / 100
      } else {
        audio.currentTime = value / 1000
      }
      audio.play()
      isPlay.value = true
      timer = setInterval(play, 500)
    })
  }
  const scrollPlay = time => {
    sliderChange(time, false)
  }
  //切换歌曲
  const next = value => {
    let musicNum = computed(() => store.state.songDetail.songArray.length)
    if (musicNum.value > 1) {
      store.commit('change', value)
      isPlay.value = true
      setTimeout(() => {
        playMusic()
        audio.play()
      })
    } else {
      ElMessage.warning({
        message: '无可播放的歌曲列表',
        type: 'warning',
      })
    }
  }

  eventBus.on('login1', () => {
    getLikeMusic(store.state.login.profile.userId).then(res => {
      store.commit('setLikeMusic', res.data.ids)
      like = store.state.singer.likeMusic.includes(songDetail.value.id)
    })
  })

  const songDetail = computed(() => store.state.songDetail.songDetail)
  watch(songDetail, () => {
    songDetail.value.id
    like = store.state.singer.likeMusic.includes(songDetail.value.id)
  }, {deep: true, immediate: true})
</script>

<style scoped lang="less">
  .svg {
    width: 30px;
    height: 30px;
  }

  .icon-aixin {
    color: red;
  }

  .active {
    transition: all 1s;
    transform: scale(1.1);
  }

  .title {
    position: relative;
    display: flex;
    align-items: center;

    .music-title {
      width: 90%;
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    i {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 25px;
      font-size: 35px;
    }
  }

  .play {
    font-size: 30px;
    color: pink;
  }

  .music-button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .iconfont {
    color: rgba(49, 48, 48, 0.8);
    z-index: 100;
  }
</style>
