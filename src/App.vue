<template>
  <el-container :style="app">
    <el-header>
      <top></top>
    </el-header>
    <el-container>
      <el-aside :style="aside">
        <aside-bar></aside-bar>
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
  import Top from '@/views/Top/top.vue'
  import AsideBar from '@/views/Aside/AsideBar.vue'
  import MusicPanel from '@/views/MusicPanel/index.vue'
  import {ref, defineComponent, onMounted} from "vue"
  import {useStore} from "vuex";

  const store = useStore()

  const name = ref('app') // 模块名称
  const app = ref({width: '1423px'}) // 容器宽度
  const aside = ref({width: '196px'}) // 侧边栏宽度
  const footer = ref({backgroundColor: 'white'}) // 模块名称

  onMounted(() => {
    if (document.documentElement.clientWidth < 1440) {
      store.commit('setBoolean')
      app.value.width.value = '1240px'
      aside.value.width.value = '70px'
    }
  })


</script>
<style>
  @import "./assets/style/global.css";
</style>
