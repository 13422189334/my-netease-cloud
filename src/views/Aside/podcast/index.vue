<template>
  <el-menu :default-active="$route.path" mode="horizontal" router>
    <el-menu-item
      v-for="menuItem in menus"
      :index="menuItem.index"
      :key="menuItem.index"
    >
      {{ menuItem.title }}
    </el-menu-item>
  </el-menu>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { ref } from 'vue'

const menus = ref([
  { index: '/podcast/radioCenter', title: '电台中心' },
  { index: '/podcast/voiceRank', title: '声音榜' },
  { index: '/podcast/freshRank', title: '新晋播客榜' },
  { index: '/podcast/hotRank', title: '热门播客榜' },
  { index: '/podcast/hourRank', title: '24小时节目榜' }
])
</script>

<style scoped lang="less">
</style>
