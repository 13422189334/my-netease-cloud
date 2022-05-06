<template>
  <skeleton1
    :count="10"
    :loading="albumData.length"
    :image="{ width:'50px', height: '50px' }"
    :row="1"
    :margin="{ width: '95%', marginLeft: '10px' }"
  >
    <searchCover :data="albumData" @toDetail="toDetail" />
  </skeleton1>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSearchResult } from '@/network/search.js'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'

const store = useStore()
const keywords = computed(() => store.state.songDetail.keywords)

const albumData = ref([])
onMounted(() => {
  getSearchResult({ keywords: keywords.value, type: 10 }).then(res => {
    albumData.value = res.data.result.albums
  })
})

const router = useRouter()
const toDetail = id => {
  store.commit('setHeader')
  getAlbumContent(id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
    router.push('/detail/song')
  })
}
</script>
