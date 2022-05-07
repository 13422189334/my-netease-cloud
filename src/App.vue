<template>
  <el-header>
    <headers />
  </el-header>
  <el-container>
    <el-aside :style="aside">
      <aside-bar :style="aside" />
    </el-aside>
    <el-main :style="main" id="main">
      <el-scrollbar>
        <router-view v-slot="{Component}">
          <keep-alive include="findMusic" :exclude="['Podcast','Category','Video','singerContent','RecentPlay']">
            <component :is="Component"/>
          </keep-alive>
        </router-view>
      </el-scrollbar>
    </el-main>
  </el-container>

  <el-footer class="footer" :style="footer">
    <music-panel @updateBackgroundColor="event => footer.backgroundColor = event" />
  </el-footer>
  <el-backtop :bottom="100">top</el-backtop>
</template>

<script setup>
import { ref, onUnmounted, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import Headers from '@/views/Header/index.vue'
import AsideBar from '@/views/Aside/index.vue'
import MusicPanel from '@/views/MusicPanel/index.vue'

const store = useStore()
const aside = ref({ width: '196px' }) // 侧边栏宽度
const main = ref({ width: '1724px' }) // 侧边栏宽度
const footer = ref({ backgroundColor: 'white' }) // 模块名称

const onresize = () => {
  if (document.documentElement.clientWidth < 1920) {
    store.commit('setBoolean', true)
    main.value.width = document.documentElement.clientWidth - 70 + 'px'
    aside.value.width = '70px'
  } else {
    store.commit('setBoolean', false)
    main.value.width = '1724px'
    aside.value.width = '196px'
  }
}
onBeforeMount(() => onresize())

onMounted(() => {
  window.onresize = onresize
})

onUnmounted(() => {
  window.onresize = () => {}
})

</script>
<style scoped lang="less">
  @import "./assets/style/global.css";

  .el-header {
    z-index: 1000;
  }
  .el-container {
    z-index: 999;
  }
  .el-main {
    padding: 0px 20px 0px 20px !important;
  }
</style>
