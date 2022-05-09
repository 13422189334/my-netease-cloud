<template>
  <div class="album-box" v-if="albumArray.length">
    <cover
      v-for="item in albumArray"
      :key="item.id"
      :image="item.picUrl"
      :name="item.name"
      :time="item.publishTime"
      @click="toDetail(item.id)"
    />
  </div>
  <el-empty v-else description="暂无专辑" />
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'
import { getSingerAlbum } from '@/network/singer.js'

const router = useRouter()
const store = useStore()
const id = computed(() => store.state.singer.singerId)
const albumArray = ref([])

watch(id, async(val) => {
  const res = await getSingerAlbum(val)
  albumArray.value = res.data.hotAlbums
}, { immediate: true, deep: true })

const toDetail = id => {
  getAlbumContent(id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
    router.push('/detail/song')
  })
}
</script>

<style scoped lang="less">
.album-box {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
