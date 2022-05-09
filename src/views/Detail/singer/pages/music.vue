<template>
  <SongTable />
</template>

<script setup>
import SongTable from '@/views/Detail/song/pages/SongTable.vue'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getSingerSong } from '@/network/singer.js'

const store = useStore()
const id = computed(() => store.state.singer.singerId)
watch(id, async(val) => {
  const res = await getSingerSong(val)
  store.commit('setSongMusic', res.data.songs)
}, { immediate: true, deep: true })
</script>
