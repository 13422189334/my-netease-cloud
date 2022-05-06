<template>
  <navTabs @change="change" />
  <el-skeleton
    :count="1"
    :loading="!Boolean(newAlbum.length)"
    :animated="true"
  >
    <template #template>
      <div class="section">
        <div v-for="item in 10" :key="item" class="item">
          <el-skeleton-item variant="image" class="skeleton-image" />
          <el-skeleton-item variant="p" class="skeleton-p" />
        </div>
      </div>
    </template>
    <template #default>
      <section class="section">
        <cover
          v-for="item in newAlbum"
          :key="item.id"
          :image="item.picUrl"
          :name="item.name"
          @click="play(item)"
        />
      </section>
    </template>
  </el-skeleton>
  <div class="pagination">
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
</template>

<script setup>
import navTabs from '../../components/navTabs.vue'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getNewAlbum } from '@/network/song.js'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'

const params = reactive({
  limit: 10,
  area: 'ALL',
  offset: 0
})
const newAlbum = ref([])

const router = useRouter()
const store = useStore()

const play = item => {
  store.commit('setHeader')
  getAlbumContent(item.id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
    router.push('/detail/song')
  })
}

const getAlbum = () => {
  getNewAlbum(params).then(res => {
    newAlbum.value = res?.data.albums
  })
}

const change = item => {
  params.area = item.area
  getAlbum()
}

const handleSizeChange = value => {
  params.limit = value
  getAlbum()
}

const handleCurrentChange = value => {
  params.offset = value
  getAlbum()
}

</script>

<style scoped lang="less">
  .section {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .item {
    height: 260px;
    .skeleton-image {
      width: 200px;
      height: 200px;
      cursor: pointer;
    }
    .skeleton-p {
      width: 200px;
      margin-top: 5px;
    }
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
