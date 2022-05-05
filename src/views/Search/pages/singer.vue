<template>
  <skeleton1
    :count="10"
    :loading="singerData.length"
    :image="{ width: '50px', height: '50px' }"
    :row="1"
    :margin="{ width: '95%', marginLeft: '10px' }"
  >
    <searchCover :data="singerData" @toDetail="toDetail" />
  </skeleton1>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSearchResult } from '@/network/search.js'

const store = useStore()
const keywords = computed(() => store.state.songDetail.keywords)

const singerData = ref([])
onMounted(() => {
  getSearchResult({ keywords: keywords.value, type: 100 }).then(res => {
    singerData.value = res.data.result.artists
  })
})

const router = useRouter()
const toDetail = id => {
  store.commit('setSingerId', id)
  router.push(`/SingerContent`)
}
</script>
