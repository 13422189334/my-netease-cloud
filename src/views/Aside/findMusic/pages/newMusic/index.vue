<template>
  <header>
    <section class="section">
      <router-link v-for="(menu, mIndex) in menus" :key="mIndex" :to="menu.url">
        <el-button type="text" class="button" round :class="{ active: path === menu.url }">
          {{ menu.name }}
        </el-button>
      </router-link>
    </section>
  </header>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const menus = reactive([
  { url: '/findMusic/newMusic/song', name: '新歌速递' },
  { url: '/findMusic/newMusic/disc', name: '新碟上架' }
])

const route = useRoute()
const path = computed(() => route.path)
</script>

<style scoped lang="less">
  .active {
    background: #a0cfff;
    color: whitesmoke;
  }

  header {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .section {
      border-radius: 20px;
      border: 1px solid #a0cfff;

      .button {
        height: 30px;
        width: 150px;
      }
    }
  }
  a {
    text-decoration: none !important;
  }
</style>
