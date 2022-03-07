<template>
  <el-container :style="app">
    <el-header>
      <headers/>
    </el-header>
    <el-container>
      <el-aside :style="aside">
        <aside-bar :style="aside"/>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <router-view v-slot="{Component}">
            <keep-alive include="findMusic" :exclude="['program','categoryList','videoDetail','singerContent','RecentPlay']">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <footer class="footer" :style="footer">
    <el-footer :style="app">
      <music-panel @updateBackgroundColor="event => footer.backgroundColor = event"/>
    </el-footer>
  </footer>
  <el-backtop :bottom="100">top</el-backtop>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import Headers from '@/views/Header/index.vue'
import AsideBar from '@/views/Aside/index.vue'
import MusicPanel from '@/views/MusicPanel/index.vue'

const store = useStore()
const app = ref({ width: '1423px' }) // 容器宽度
const aside = ref({ width: '196px' }) // 侧边栏宽度
const footer = ref({ backgroundColor: 'white' }) // 模块名称

onMounted(() => {
  window.onresize = () => {
    if (document.documentElement.clientWidth < 1440) {
      store.commit('setBoolean', true)
      app.value.width = '1240px'
      aside.value.width = '70px'
    } else {
      store.commit('setBoolean', false)
      app.value.width = '1423px'
      aside.value.width = '196px'
    }
  }
})

onUnmounted(() => {
  window.onresize = () => {}
})

</script>
<style>
  @import "./assets/style/global.css";
</style>
