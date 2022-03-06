<template>
  <el-menu :default-active="$route.path" mode="horizontal" router>
    <el-menu-item
      v-for="(menuItem, mIndex) in menus"
      :index="menuItem.index"
      :key="menuItem.index"
    >
      {{ menuItem.title }}
    </el-menu-item>
  </el-menu>
  <br>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { ref } from 'vue'

const menus = ref([
  { index: '/podcast', title: '电台中心' },
  { index: '/podcast/programTop', title: '声音榜' },
  { index: '/podcast/newComer', title: '新晋播客榜' },
  { index: '/podcast/hotTopList', title: '热门播客榜' },
  { index: '/podcast/hoursTopList', title: '24小时节目榜' }
])
</script>

<style scoped lang="less">
</style>
