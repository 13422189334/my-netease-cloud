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
            <keep-alive include="findMusic"
                        :exclude="['program','categoryList','videoDetail','singerContent','RecentPlay']">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <footer class="footer">
    <el-footer :style="app">
      <music-panel />
    </el-footer>
  </footer>
  <el-backtop :bottom="100">top</el-backtop>
</template>

<script>
  import Top from '@/views/Top/top.vue'
  import AsideBar from '@/views/Aside/AsideBar.vue'
  import MusicPanel from '@/views/MusicPanel/index.vue'
  import {reactive, toRefs, defineComponent, onMounted} from "vue"
  import {useStore} from "vuex";

  const store = useStore()
  export default defineComponent({
    name: 'app',
    components: {
      Top,
      AsideBar,
      MusicPanel,
    },
    setup() {
      const state = reactive({
        app: {
          width: '1423px',
        },
        aside: {
          width: '196px'
        }
      })

      onMounted(() => {
        if (document.documentElement.clientWidth < 1440) {
          store.commit('setBoolean')
          state.app.width = '1240px'
          state.aside.width = '70px'
        }
      })

      return {
        ...toRefs(state),
      }
    }
  })


</script>
<style>
  @import "./assets/style/global.css";
</style>
