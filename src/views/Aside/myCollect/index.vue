<template>
  <el-menu :default-active="$route.path" mode="horizontal" router>
    <el-menu-item v-for="menu in menus" :index="menu.path" :key="menu.path">{{ menu.name }}</el-menu-item>
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
  { path: '/myCollect/album', name: '专辑' },
  { path: '/myCollect/singer', name: '歌手' },
  { path: '/myCollect/video', name: '视频' }
])
</script>
