<template>
  <nav class="nav">
    <titleTop>最新MV</titleTop>
    <div class="tags"><span
      v-for="(v,i) in tags"
      :key="i"
      :class="{active:current === v}"
      @click="tagChange(v)"
    >{{ v }}</span></div>
  </nav>
  <skeleton :count="8" :loading="newMV.length">
    <header class="header" style="height: 440px;">
      <videoCover :video-array="newMV" @goDetail="goMvDetail" />
    </header>
  </skeleton>
  <br>
  <titleTop>热播MV</titleTop>
  <skeleton :count="4" :loading="hotMv.length">
    <main class="main" style="height: 220px;">
      <videoCover :video-array="hotMv" @goDetail="goMvDetail" />
    </main>
  </skeleton>
  <br>
  <titleTop>网易出品</titleTop>
  <div ref="dom">
    <skeleton :count="8" :loading="footerMv.length">
      <footer class="footer" style="height: 440px;">
        <videoCover :video-array="footerMv" @goDetail="goMvDetail" />
      </footer>
    </skeleton>
  </div>
  <br>
  <div style="height: 850px;">
    <mvTopList />
  </div>
</template>

<script setup>
import skeleton from '../../children/skeleton.vue'
import { useRouter } from 'vue-router'
import mvTopList from '../../children/mvTopList.vue'
import { formatMvData } from '@/utlis/formatData.js'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import videoCover from '../../children/videoCover.vue'
import { getNewMv, getHotMv, getFooterMv } from '@/network/video.js'
import { onMounted, ref } from 'vue'

const current = ref('内地')
const tags = ref(['内地', '港台', '欧美', '日本', '韩国'])
const newMV = ref([])
const tagChange = item => {
  current.value = item
  getNewMv(item).then(res => {
    newMV.value = formatMvData(res.data.data)
  })
}
getNewMv().then(res => {
  newMV.value = formatMvData(res.data.data)
})

// 热门推荐
const hotMv = ref([])
getHotMv().then(res => {
  hotMv.value = formatMvData(res.data.result)
})

const dom = ref()
// 网易出品MV
const footerMv = ref([])
onMounted(async() => {
  await dataLazyLoading(dom)
  const res = await getFooterMv()
  footerMv.value = formatMvData(res.data.data)
})

// 去详情
const router = useRouter()
const goMvDetail = id => {
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
    }
  }

  .header, .main, .footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
