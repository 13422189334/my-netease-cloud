<template>
  <dailyTop v-if="$store.state.songDetail.isDaily" />
  <songTop v-else />
  <el-divider content-position="right">网易云音乐</el-divider>
  <el-menu
    router
    :default-active="$route.path"
    mode="horizontal"
  >
    <el-menu-item index="/detail/song">歌单列表</el-menu-item>
    <el-menu-item index="/detail/song/comment">评论 ({{ comment }})</el-menu-item>
    <el-menu-item index="/detail/song/collect">收藏者 ({{ collect }})</el-menu-item>
  </el-menu>

  <router-view />
</template>

<script setup>
import dailyTop from './component/dailyTop.vue'
import songTop from './component/songTop.vue'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getComment } from '@/network/comment.js'
import { getSongListCollect } from '@/network/songList.js'
import eventBus from '@/utlis/eventbus.js'

const store = useStore()
const id = computed(() => store.state.songDetail.commentID)

const comment = ref(0)
const collect = ref(0)

const getTotal = () => {
  const params = {
    id: id.value,
    type: 2,
    limit: 15,
    offset: 0
  }
  getComment(params).then(res => {
    comment.value = res.data.total
  })
  getSongListCollect(params).then(res => {
    console.log(res)
    collect.value = res.data.total
  })
}

onMounted(() => {
  getTotal()
})

eventBus.on('get-song-detail', () => {
  getTotal()
})
</script>
