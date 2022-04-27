<template>
  <el-menu router :default-active="$route.path" mode="horizontal">
    <el-menu-item v-for="menu in menus" :key="menu.path" :index="menu.path">{{ menu.name }}</el-menu-item>
  </el-menu>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup>
import { ref } from 'vue'
const menus = ref([
  { name: '视频', path: '/video/video' },
  { name: 'MV', path: '/video/mv' },
  { name: '全部MV', path: '/video/allMV' },
  { name: 'MV排行榜', path: '/video/rank' }
])
</script>
