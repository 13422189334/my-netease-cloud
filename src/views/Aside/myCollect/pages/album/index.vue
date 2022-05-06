<template>
  <h4>收藏的专辑({{ songList.length }})</h4>
  <el-skeleton
    :count="8"
    :loading="load"
    animated
  >
    <template #template>
      <div class="skeleton-item-box">
        <el-skeleton-item variant="image" class="skeleton-item-image" />
        <el-skeleton-item variant="p" class="skeleton-item-p" />
      </div>
    </template>
    <template #default>
      <div v-if="songList.length">
        <div v-for="item in songList" :key="item.id" class="mgt-10">
          <navContent
            :image="item.picUrl"
            :name="item.name"
            :label="item.artists[0].name"
            :album="item.size + '首'"
            @click="current(item.id)"
          />
        </div>
      </div>
      <div v-else>
        <el-empty :image-size="300" />
      </div>
    </template>
  </el-skeleton>
</template>
<script setup>
import navContent from '../../components/navContent.vue'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getMyAlbum } from '@/network/user.js'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'

const songList = ref([])
const load = ref(true)
onMounted(() => {
  getMyAlbum().then(res => {
    songList.value = res.data.data
    load.value = false
  })
})

const router = useRouter()
const store = useStore()

const current = id => {
  getAlbumContent(id).then(res => {
    store.commit('setSongList', formatAlbum(res.data.album))
    store.commit('setSongMusic', res.data.songs)
    router.push('/detail/song')
  })
}
</script>

<style scoped lang="less">
  .mgt-10 {
    margin-top: 10px;
  }

  .skeleton-item-box {
    margin-top: 5px;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .skeleton-item-image {
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    .skeleton-item-p {
      margin-left: 20px;
      width: 80%;
    }
  }
</style>
