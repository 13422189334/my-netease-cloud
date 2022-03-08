<template>
  <el-menu :default-active="$route.path" mode="horizontal" router class="nav">
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
  { index: '/findMusic', title: '个性推荐' },
  { index: '/findMusic/exclusive', title: '专属定制' },
  { index: '/findMusic/songMenu', title: '歌单' },
  { index: '/findMusic/topList', title: '排行榜' },
  { index: '/findMusic/singer', title: '歌手' },
  { index: '/findMusic/newMusic', title: '最新音乐' }
])

</script>

<style scoped lang="less">
  .nav {
    position: fixed;
    z-index: 1000;
    width: 100%;
    top: 60px;
  }

  .is-active {
    font-weight: 900;
  }
</style>
