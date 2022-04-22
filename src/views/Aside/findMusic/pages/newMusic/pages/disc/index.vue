<template>
  <navTabs @change="change" />
  <section>
    <skeleton2 :count="10" :loading="newAlbum.length" :size="{width:'200px',height:'200px'}" :show="false">
      <section class="section">
        <cover
          v-for="item in newAlbum"
          :key="item.id"
          :image="item.picUrl"
          :name="item.name"
          @click="play(item)"
        />
      </section>
    </skeleton2>
    <br>
    <div style="display: flex;justify-content: center;">
      <el-pagination
        background
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import navTabs from '../../components/navTabs.vue'
import { getNewAlbum } from '@/network/song.js'
import { getAlbumContent } from '@/network/comment.js'
import { onMounted, ref } from 'vue'
import { formatAlbum } from '@/utlis/formatData.js'
import { useStore } from 'vuex'

const params = {
  limit: 10,
  area: 'ALL',
  offset: 0
}
const newAlbum = ref([])
onMounted(async() => {
  const res = await getNewAlbum(params)
  newAlbum.value = res?.data.albums
})
const router = useRouter()
const store = useStore()
const play = item => {
  store.commit('setHeader')
  getAlbumContent(item.id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
  })
  router.push('/songDetail')
}

const change = item => {
  newAlbum.value.length = 0
  params.area = item.area
  getNewAlbum(params).then(res => {
    newAlbum.value = res.data.albums
  })
}
const handleSizeChange = value => {
  params.limit = value
  getNewAlbum(params).then(res => {
    newAlbum.value = res.data.albums
  })
}
const handleCurrentChange = value => {
  newAlbum.value.length = 0
  params.offset = value
  getNewAlbum(params).then(res => {
    newAlbum.value = res.data.albums
  })
}
</script>

<style scoped lang="less">
.section{
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5,1fr);
}
</style>
