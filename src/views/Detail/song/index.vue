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
    <el-menu-item index="/detail/song/comment">评论 ({{ count }})</el-menu-item>
    <el-menu-item index="/detail/song/collect">收藏者</el-menu-item>
  </el-menu>

  <router-view />
</template>

<script setup>
import dailyTop from './component/dailyTop.vue'
import songTop from './component/songTop.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getComment } from '@/network/comment.js'

const store = useStore()
const id = computed(() => store.state.songDetail.commentID)

const count = ref(0)

watch(id, newID => {
  const params = {
    id: newID,
    type: 2,
    limit: 0
  }
  getComment(params).then(res => {
    count.value = res.data.total
  })
}, { immediate: true })
</script>
