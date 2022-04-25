<template>
  <h4>收藏的歌手({{ songList.length }})</h4>
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
        <div v-for="item in songList" :key="item.id" style="margin-top: 10px;">
          <navContent
            :image="item.img1v1Url"
            :name="item.name"
            :label="'专辑: '+item.albumSize"
            :album="'MV: '+item.mvSize"
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
import { getUserProfile } from '@/network/user.js'

const songList = ref([])
const load = ref(true)
onMounted(() => {
  getUserProfile().then(res => {
    songList.value = res.data.data
    load.value = false
  })
})

const store = useStore()
const router = useRouter()

const current = id => {
  store.commit('setSingerId', id)
  router.push(`/SingerContent`)
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
