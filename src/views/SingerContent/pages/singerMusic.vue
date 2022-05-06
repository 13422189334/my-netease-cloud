<template>
  <SongTable />
</template>

<script setup>
import SongTable from '@/views/Detail/song/pages/SongTable.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { getSingerSong } from '@/network/singer.js'

const store = useStore()
const id = computed(() => store.state.singer.singerId)
onMounted(async() => {
  const res = await getSingerSong(id.value)
  store.commit('setSongMusic', res.data.songs)
})
</script>

<style scoped lang="less">

</style>
