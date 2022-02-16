<template>
  <audio ref="audio" loop id="audio"
         :src="`https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`"></audio>
  <el-row :gutter="20" style="z-index: 10000000 !important;" :style="{backgroundColor:backgroundColor}">
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
          <i @click="isChangeLike" v-if="!isLike" title="收藏" class="iconfont icon-aixin"></i>
          <i @click="isChangeLike" v-else style="color: red;font-size: 22px;" title="已收藏"
             class="iconfont icon-xihuan"></i>
          <i title="上一曲" @click="next(-1)" class="iconfont icon-shangyiqu"></i>
          <i @click="playMusic" style="font-size: 40px; color: #cc7013;" class="iconfont"
             :class="[is ? 'icon-bofang1' :'icon-icon-bofang']"></i>
          <i title="下一曲" @click="next(1)" class="iconfont icon-xiayiqu"></i>
          <svg class="svg" @click="openLyric" aria-hidden="true">
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
    <popup @scrollPlay="scrollPlay" ref="dom" @close="close" :currentTime="currentTime"></popup>
  </el-drawer>
</template>

<script>
  import {getLikeMusic} from "@/network/song.js";
  import {ElMessage} from 'element-plus'
  import {isLikeMusic} from "@/network/user.js";
  import {debounce} from "@/utlis/debounce.js";
  import eventBus from '@/utlis/eventbus.js'
  import {defineAsyncComponent, defineComponent, computed, watch, toRefs, reactive, onMounted, nextTick} from "vue";
  import {useStore} from "vuex";

  const popup = defineAsyncComponent(() => import('./popup.vue'))
  export default defineComponent({
    name: 'musicPanel',
    components: {popup},
    setup() {

      const store = useStore()
      const state = reactive({
        value: 0,
        is: false,
        open: false,
        drawer: false,
        audio: null,
        isLike: false,
        currentTime: 0,
        size: 0,
        dom: null,
        backgroundColor: '#ffffff'
      })

      watch(() => state.drawer, newValue => {
        state.size = 100
        console.log(1)
        console.log(state.drawer)
        if (newValue) {
          state.backgroundColor = undefined
          // state.color = '#d7b0d9'
        } else {
          state.backgroundColor = '#ffffff'
        }
      })


      const close = () => {
        state.drawer = false
        console.log('关闭')
      }
      const openLyric = () => {
        state.size = 100
        state.drawer = true
      }

      /**
       * 收藏
       * */
      const isChangeLike = debounce(() => {
        if (store.state.login.profile) {
          state.isLike = !state.isLike
          isLikeMusic(songDetail.value.id, state.isLike).then(res => {
            if (state.isLike && res.data.code === 200) {
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
          state.audio.play()
        })
      })
      //播放音乐
      let timer
      const play = () => {
        state.currentTime = parseInt(state.audio.currentTime * 1000)
        state.value = parseInt(state.audio.currentTime / state.audio.duration * 100)
        //自动切换
        if (state.audio.currentTime >= state.audio.duration - 0.5) {
          console.log('播放结束')
          next(1)
        }
      }
      let timer1
      const playMusic = () => {
        nextTick(() => {
          state.audio.addEventListener("error", function () {
            if (timer1) clearTimeout(timer1)
            timer1 = setTimeout(() => {
              ElMessage.error('暂无音频已自动切换下一首')
              next(1)
            }, 200)
          }, true);
        })
        if (state.audio.paused) {
          state.audio.play()
          state.is = true
          store.commit('setPlay')
          timer = setInterval(play, 500)
        } else {
          state.audio.pause()
          state.is = false
          store.commit('setPlay')
          clearInterval(timer)
        }
      }
      //滑动
      const sliderChange = (value, boolean = true) => {
        clearInterval(timer)
        setTimeout(() => {
          if (boolean) {
            state.audio.currentTime = state.audio.duration * value / 100
          } else {
            state.audio.currentTime = value / 1000
          }
          state.audio.play()
          state.is = true
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
          state.is = true
          setTimeout(() => {
            playMusic()
            state.audio.play()
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
          state.isLike = store.state.singer.likeMusic.includes(songDetail.value.id)
        })
      })

      const songDetail = computed(() => store.state.songDetail.songDetail)
      watch(songDetail, () => {
        songDetail.value.id
        state.isLike = store.state.singer.likeMusic.includes(songDetail.value.id)
      }, {deep: true, immediate: true})
      return {
        ...toRefs(state),
        queueMicrotask,
        close,
        openLyric,
        isChangeLike,
        play,
        playMusic,
        sliderChange,
        scrollPlay,
        next,
        songDetail
      }
    }
  })
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
