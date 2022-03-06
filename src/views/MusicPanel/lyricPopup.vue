<template>
  <section id="section">
    <i class="el-icon-close" @click="close"></i>
    <header class="header-header">{{songDetail.name}}</header>
    <main class="box-main" ref="dom">
      <nav
        v-for="(item,index) in lyricArr"
        id="box-main-nav"
        :key="index"
        :class="[
          'box-main-nav',
          isScroll ? 'scroll-pointer' : '',
          currentTime >= item.time && currentTime < lyricArr[index+1].time ? 'active-lyric' : ''
        ]"
        @click="scrollPlay(item.time)"
      >
        {{item.lyric}}
      </nav>
    </main>
  </section>
</template>

<script setup>
  import {computed, nextTick, onMounted, ref, watch, defineProps, defineEmits} from "vue";
  import {useStore} from "vuex";

  /**
   * 定义父组件参数 currentTime, lyricArr
   * */
  const props = defineProps({
    currentTime: {
      type: Number,
      remark: '歌曲播放时间点'
    },
    lyricArr: {
      type: Array,
      remark: '歌词数组'
    }
  })

  /**
   * 定义子组件emit事件 close scrollPlay
   * */
  const emit = defineEmits(['closeLyricPopup', 'scrollPlay'])

  const store = useStore()
  let dom = ref()
  let lyricNavArr = ref([]) // 歌词nav数组
  const songDetail = computed(() => store.state.songDetail.songDetail)

  /**
   * 格式化歌词，同时记录页面渲染歌词nav的信息
   * */
  watch(props.lyricArr,  newValue => {
    nextTick(() => {
      lyricNavArr.value = [...document.querySelectorAll('.box-main-nav')]
    })
  }, {immediate: true})


  /**
   * 监听父组件每0.5秒传入的currentTime控制歌词滚动
   * */
  watch(() => {
    return props.lyricArr?.findIndex((item, index) => props.currentTime >= item.time && props.currentTime < props.lyricArr[index + 1].time)
  }, newIndex => {
    if (newIndex > 5) {
      dom.value.scrollTop = 50 * (newIndex - 5)
    }
  })

  /**
   * 关闭popup函数
   * */
  const close = () => {
    emit('closeLyricPopup')
  }

  let isScroll = ref(false) // 是否滚轮
  let scrollTimer // 滚轮事件计时器
  /**
   * 监听鼠标滚轮事件
   * */
  addEventListener('mousewheel', () => {
    isScroll.value = true
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      isScroll.value = false
    }, 3000)
  })


  /**
   * 鼠标滚轮事件调整事件
   * */
  const scrollPlay = (scrollTime) => {
    emit('scrollPlay', scrollTime)
  }

</script>

<style scoped lang="less">


  #section {
    width: 100%;
    height: 100%;
    background: #D9AFD9 linear-gradient(0deg, #d9afd9 0%, #97D9E1 100%);
    /*background: linear-gradient(#5d7599 0%,#abb6c8 25%,#dadada 50%, #f7f0c6 75%, #c2c4b6 100%);*/
    position: relative;

    i {
      position: absolute;
      right: 1%;
      top: 1%;
      font-size: 60px;
      color: white;
    }

    .el-icon-close {
      cursor: pointer;
    }

    .header-header {
      position: absolute;
      left: 50%;
      top: 8%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 40px;
    }

    .box-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
      height: 68%;
      overflow-y: auto;

      &-nav {
        font-size: 25px;
        color: rgba(241, 236, 236, 0.99);
        height: 50px;
        line-height: 50px;
      }

      .scroll-pointer {
        cursor: pointer;
      }

      .active-lyric {
        cursor: pointer;
        background-image: -webkit-linear-gradient(bottom, red, #ff5f60, #f0c41b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 1s;
        font-weight: 700;
        transform: translate3d(0, -3px, 0);
        text-shadow: 0 3px 8px rgba(0, 0, 0, .1);
      }
    }

    .box-divider {
      position: absolute;
      width: 60%;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-icon-caret-right {
        font-size: 30px;
      }

      span {
        margin: 0 40px;
        color: white;
      }
    }
  }


</style>
