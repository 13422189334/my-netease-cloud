<template>
  <nav class="nav">
    <titleTop>最新MV</titleTop>
    <div class="tags">
      <span
        v-for="(v,i) in allTags"
        :key="i"
        :class="{ active: current === v }"
        @click="tagChange(v)"
      >
        {{ v }}
      </span>
    </div>
  </nav>
  <el-skeleton
    :loading="!Boolean(newMV.length)"
    :count="1"
    :animated="true"
  >
    <template #template>
      <section class="new-box">
        <div v-for="item in 8" :key="item" >
          <div class="skeleton-item-box">
            <el-skeleton-item variant="image" class="skeleton-item-image" />
            <el-skeleton-item variant="p" class="skeleton-item-p" />
            <el-skeleton-item variant="p" class="skeleton-item-p" />
          </div>
        </div>
      </section>
    </template>
    <template #default>
      <section class="new-box">
        <horizontalCover :width="'285px'" :video-array="newMV" @toDetail="toMvDetail" />
      </section>
    </template>
  </el-skeleton>
  <titleTop>热播MV</titleTop>
  <el-skeleton
    :loading="!Boolean(hotMv.length)"
    :count="1"
    :animated="true"
  >
    <template #template>
      <section class="hot-box">
        <div v-for="item in 4" :key="item" >
          <div class="skeleton-item-box">
            <el-skeleton-item variant="image" class="skeleton-item-image" />
            <el-skeleton-item variant="p" class="skeleton-item-p" />
            <el-skeleton-item variant="p" class="skeleton-item-p" />
          </div>
        </div>
      </section>
    </template>
    <template #default>
      <section class="hot-box">
        <horizontalCover :width="'285px'" :video-array="hotMv" @toDetail="toMvDetail" />
      </section>
    </template>
  </el-skeleton>
  <titleTop>网易出品</titleTop>
  <div ref="dom">
    <el-skeleton
      :loading="!Boolean(neteaseMv.length)"
      :count="1"
      :animated="true"
    >
      <template #template>
        <section class="wy-box">
          <div v-for="item in 8" :key="item" >
            <div class="skeleton-item-box">
              <el-skeleton-item variant="image" class="skeleton-item-image" />
              <el-skeleton-item variant="p" class="skeleton-item-p" />
              <el-skeleton-item variant="p" class="skeleton-item-p" />
            </div>
          </div>
        </section>
      </template>
      <template #default>
        <section class="wy-box">
          <horizontalCover :width="'285px'" :video-array="neteaseMv" @toDetail="toMvDetail" />
        </section>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import horizontalCover from '@/views/Aside/video/components/horizontalCover.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatMvData } from '@/utlis/formatData.js'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { getNewMv, getHotMv, getFooterMv } from '@/network/video.js'

const dom = ref()
const current = ref('内地')
const allTags = ref(['内地', '港台', '欧美', '日本', '韩国'])

const newMV = ref([])
const neteaseMv = ref([]) // 网易出品MV
const hotMv = ref([]) // 热门推荐

const getHot = () => {
  getHotMv().then(res => {
    hotMv.value = formatMvData(res.data.result)
  })
}

const getNew = (item) => {
  getNewMv(item).then(res => {
    newMV.value = formatMvData(res.data.data)
  })
}

onMounted(async() => {
  getNew()
  getHot()
  await dataLazyLoading(dom)
  const res = await getFooterMv()
  neteaseMv.value = formatMvData(res.data.data)
})

const tagChange = item => {
  current.value = item
  getNew(item)
}

const router = useRouter()
const toMvDetail = id => {
  router.push(`/videoDetail?id=${id}`)
}
</script>

<style scoped lang="less">
  .active {
    color: red;
    font-weight: 900;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tags {
      width: 300px;
      display: flex;
      justify-content: space-between;
      span {
        cursor: pointer;
      }
    }
  }

  .new-box, .hot-box, .wy-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .skeleton-item-box {
      height: 200px;
      .skeleton-item-image {
        width: 285px;
        height: 150px;
        margin-top: 20px;
      }
      .skeleton-item-p {
        height: 20px;
        width: 285px;
        margin-top: 5px;
      }
    }
  }
</style>
