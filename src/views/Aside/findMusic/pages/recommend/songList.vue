<template>
  <titleTop @click="goSongMenu">推荐歌单</titleTop>
  <section ref="playList" class="section">
    <cover-picture
      v-if="songList.length"
      :image="require('@/assets/image/cover.png')"
      :time="true"
      top="根据你的音乐口味生成每日更新"
      label="每日歌曲推荐"
      @click="everySong"
    />

    <template v-if="songList.length">
      <cover-picture
        v-for="item in songList"
        :key="item.id"
        :play-count="item.playCount"
        :image="item.picUrl"
        :label="item.name"
        @click="songListDetail(item.id)"
      />
    </template>
    <el-skeleton v-else v-for="item in (songNum + 1)" :key="item" style="width: 220px;" animated>
      <template #template>
        <el-skeleton-item variant="image" class="skeleton-pic" />
        <el-skeleton-item variant="p" class="skeleton-text" />
        <el-skeleton-item variant="p" class="skeleton-text" />
      </template>
    </el-skeleton>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSongList } from '@/network/recommend.js'

const store = useStore()
const router = useRouter()

const playList = ref() // 推荐歌单
const songList = ref([]) // 歌单集合
const songNum = ref(13) // 渲染歌单数量

// const getNum = () => Math.floor(playList.value.clientWidth / 220) * 2 - 1 || 13
const getNum = () => Math.floor((document.getElementById('main').offsetWidth - 40) / 220) * 2 - 1

onMounted(() => {
  songNum.value = getNum()
  getSongs()
  const oldOnResize = window.onresize
  window.onresize = async() => {
    await oldOnResize()
    const num = getNum()
    if (num !== songNum.value) {
      songNum.value = num
      getSongs()
    }
  }
})

const getSongs = () => {
  getSongList(songNum.value).then(res => {
    songList.value = res?.data?.result
  })
}

const goSongMenu = () => {
  router.push('/findMusic/songMenu')
}

/**
 * 每日推荐歌曲
 */
const everySong = () => {
  store.dispatch('getDailySong')
  router.push('/songDetail')
}

/**
 * 点击歌单跳转
 * @param id
 */
const songListDetail = id => {
  store.dispatch('getSongList', id)
  router.push('/songDetail')
}

</script>

<style scoped lang="less">
.section{
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.skeleton-pic {
  width: 220px;
  height: 220px;
}

.skeleton-text {
  width: 100%;
  margin-top: 10px;
}
</style>
