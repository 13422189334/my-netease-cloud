<template>
  <el-menu :default-active="$route.path" mode="horizontal" router>
    <el-menu-item v-for="menu in menus" :key="menu" :index="menu.path">{{ menu.name }}</el-menu-item>
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
  { name: '单曲', path: '/search/song' },
  { name: '歌手', path: '/search/singer' },
  { name: '专辑', path: '/search/album' },
  { name: '视频', path: '/search/video' },
  { name: '歌单', path: '/search/songMenu' }
])
</script>
