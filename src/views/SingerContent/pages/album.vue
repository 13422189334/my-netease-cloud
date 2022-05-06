<template>
  <br>
  <div class="div">
    <cover
      v-for="item in albumData"
      :key="item.id"
      :image="item.picUrl"
      :name="item.name"
      :time="item.publishTime"
      @click="toDetail(item.id)"
    />
  </div>
  <br>
  <el-pagination
    v-if="albumData.length > 10"
    background
    layout="prev, pager, next"
    :total="100"
    @current-change="change"
  />

</template>

<script setup>
import { getSingerAlbum } from '@/network/singer.js'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'

const router = useRouter()
const store = useStore()
const id = computed(() => store.state.singer.singerId)
const albumData = ref([])

onMounted(async() => {
  const res = await getSingerAlbum(id.value)
  albumData.value = res.data.hotAlbums
})
const change = async value => {
  const res = await getSingerAlbum(id.value, value)
  albumData.value = res.data.hotAlbums
}

const toDetail = id => {
  getAlbumContent(id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
    router.push('/detail/song')
  })
}
</script>

<style scoped lang="less">
.div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
