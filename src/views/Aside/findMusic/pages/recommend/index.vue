<template>
  <banner /><!--轮播图-->
  <songList /><!--每日歌曲推荐-->
  <radio /><!--播客-->
  <unique /><!--独家放送-->
  <newMusic /><!--最新音乐-->
  <recommendMV /><!--推荐MV-->
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import banner from './components/banner.vue'
import songList from './components/songList.vue'
const radio = defineAsyncComponent(() => import('./components/radio.vue'))
const unique = defineAsyncComponent(() => import('./components/unique.vue'))
const newMusic = defineAsyncComponent(() => import('./components/newMusic.vue'))
const recommendMV = defineAsyncComponent(() => import('./components/recommendMV.vue'))
</script>
