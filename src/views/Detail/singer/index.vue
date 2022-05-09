<template>
  <skeleton1
    :loading="singerDetail?.artist.id"
    :image="{ width: '210px', height: '220px' }"
    :margin="{ width: '900px', marginLeft: '20px' }"
  >
    <singerDesc :singer-detail="singerDetail" />
  </skeleton1>
  <el-menu :default-active="$route.path" router mode="horizontal">
    <el-menu-item v-for="menu in menus" :key="menu.name" :index="menu.path">{{ menu.name }}</el-menu-item>
  </el-menu>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script>
export default {
  name: 'Singer'
}
</script>
<script setup>
import singerDesc from '@/views/Detail/singer/components/desc.vue'
import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { getSingerDetail } from '@/network/singer.js'

const store = useStore()
const id = computed(() => store.state.singer.singerId)

const menus = ref([
  { name: '单曲', path: '/detail/singer' },
  { name: '专辑', path: '/detail/singer/album' },
  { name: 'MV', path: '/detail/singer/mv' },
  { name: '歌手详情', path: '/detail/singer/detail' },
  { name: '相似歌手', path: '/detail/singer/similar' }
])

const singerDetail = ref(null)
watch(id, async(val) => {
  const res = await getSingerDetail(val)
  singerDetail.value = res.data.data
}, { immediate: true, deep: true })
</script>
