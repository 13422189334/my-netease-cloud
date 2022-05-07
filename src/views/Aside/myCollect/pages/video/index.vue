<template>
  <el-skeleton :count="1" :loading="load" animated>
    <template #template>
      <div class="video">
        <div v-for="item in 12" :key="item" class="skeleton-item-box">
          <el-skeleton-item variant="image" class="skeleton-item-image" />
          <el-skeleton-item variant="p" class="skeleton-item-p" />
          <el-skeleton-item variant="p" class="skeleton-item-p" />
        </div>
      </div>
    </template>
    <template #default>
      <div v-if="array.length">
        <div class="video">
          <horizontalCover :width="'285px'" :video-array="array" @toDetail="toDetail" />
        </div>
      </div>
      <div v-else>
        <el-empty :image-size="300" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import horizontalCover from '@/views/Aside/video/components/horizontalCover.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMvList } from '@/network/mv.js'

const array = ref([])
const load = ref(true)
onMounted(() => {
  getMvList().then(res => {
    array.value = res.data.data.map(item => ({
      coverUrl: item.coverUrl,
      vid: item.vid,
      cover: item.playTime,
      title: item.title,
      durationms: item.durationms
    }))
    load.value = false
  })
})

const router = useRouter()
const toDetail = id => {
  router.push(`/detail/mv?vid=${id}`)
}
</script>

<style scoped lang="less">
  .video {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .mgt-10 {
    margin-top: 10px;
  }

  .skeleton-item-box {
    display: flex;
    flex-direction: column;
    height: 200px;
    margin-top: 20px;

    .skeleton-item-image {
      width: 285px;
      height: 150px;
      border-radius: 10px;
    }
    .skeleton-item-p {
      width: 285px;
      margin-top: 5px;
    }
  }
</style>
