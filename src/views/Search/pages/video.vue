<template>
  <el-skeleton :loading="!Boolean(videoArray.length)" :count="1" :animated="true">
    <template #template>
      <div class="video-box">
        <div v-for="item in 16" :key="item">
          <el-skeleton-item variant="image" class="skeleton-item-image" />
          <el-skeleton-item variant="p" class="skeleton-item-p" />
          <el-skeleton-item variant="p" class="skeleton-item-p" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="video-box">
        <horizontalCover :width="'285px'" :video-array="videoArray" @toDetail="toDetail" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import horizontalCover from '@/views/Aside/video/components/horizontalCover.vue'
import { computed, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSearchResult } from '@/network/search.js'
import { formatVideoData } from '@/utlis/formatData.js'

const videoArray = ref([])

const store = useStore()
const keywords = computed(() => store.state.songDetail.keywords)

const params = reactive({
  keywords: keywords.value,
  type: 1014,
  limit: 16
})

onMounted(() => {
  getSearchResult(params).then(res => {
    videoArray.value = formatVideoData(res.data.result.videos)
  })
})

const router = useRouter()
const toDetail = id => {
  router.push(`/videoDetail?${id.length < 20 ? 'id' : 'vid'}=${id}`)
}

</script>

<style scoped lang="less">
  .video-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .skeleton-item-image {
      width: 285px;
      height: 150px;
      margin-top: 20px;
    }
    .skeleton-item-p {
      height: 20px;
      width: 285px;
    }
    .skeleton-item-p:nth-child(1) {
      margin-top: 5px;
    }
  }
</style>
