<template>
  <titleTop>{{ title }}</titleTop>
  <section class="videoDetail">
    <div class="left">
      <video class="w-90" preload controls :src="url" />
      <div class="info">
        <el-avatar :size="50" :src="detail.photo" />
        <span class="mgl-10">{{ detail.person }}</span>
      </div>
      <br>
      <el-collapse class="w-90">
        <el-collapse-item>
          <template #title>
            <h2 class="mgl-10">{{ detail.name }}</h2>
            <span class="mgl-10 silver">发布: {{ detail.time }}</span>
            <span class="mgl-10 silver">播放: {{ $formatNumber(detail.count) }}</span>
          </template>
          <div>{{ detail.desc }}</div>
        </el-collapse-item>
      </el-collapse>
      <div class="button-group">
        <el-button size="medium" round :icon="Pointer" disabled>赞 ({{ $formatNumber(detail.count) }})</el-button>
        <el-button size="medium" round :icon="FolderAdd" disabled>收藏 ( {{ $formatNumber(detail.subCount) }} )</el-button>
        <el-button size="medium" round :icon="Share" disabled>分享 ( {{ $formatNumber(detail.shareCount) }} )</el-button>
        <el-button size="medium" round :icon="Upload" disabled>下载</el-button>
      </div>
      <div class="w-90">
        <mvComment class="w-90" :comment="comment" @pageChange="pageChange" />
      </div>
    </div>
    <div v-if="similarMv.length" class="right">
      <span style="font-weight: 900;">相关推荐</span>
      <div v-for="item in similarMv" :key="item.id || item.vid" class="item">
        <mvCover
          :image="item.cover || item.coverUrl"
          :count="item.playCount || item.playTime"
          :label="item.artists ||item.creator"
          :time="item.duration"
          :name="item.name || item.title"
        />
      </div>
    </div>
    <div v-else class="right">
      <skeleton1
        :count="5"
        :image="{ width: '187px', height: '110px' }"
        :margin="{ width: '300px', marginLeft: '10px' }"
      />
    </div>
  </section>
</template>

<script setup>
import mvComment from '@/views/Detail/mv/components/mvComment.vue'
import mvCover from '@/views/Detail/mv/components/mvCover.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Pointer, FolderAdd, Share, Upload } from '@element-plus/icons-vue'
import {
  getVideoUrl,
  getVideoDetail,
  getMvDetail,
  getMvUrl,
  getSimilarMv,
  getSimilarVideo,
  getMvComment,
  getVideoComment
} from '@/network/video.js'
import { formatMvInfo, formatVideoInfo } from '@/utlis/formatData.js'

const route = useRoute()

const id = route.query.vid || route.query.id
const url = ref('')
const title = ref()
const similarMv = ref([]) // 类似视频、MV
const detail = ref({}) // 视频、MV 详情
const comment = ref([]) // 评论

if (Object.keys(route.query)[0] === 'vid') {
  title.value = '视频详情'
  getVideoDetail(id).then(res => {
    detail.value = formatVideoInfo(res)
  })
  getVideoUrl(id).then(res => {
    url.value = res.data.urls[0].url
  })
  getSimilarVideo(id).then(res => {
    similarMv.value = res.data.data
  })
  getVideoComment(id).then(res => {
    comment.value = res.data.comments
  })
} else {
  title.value = 'MV详情'
  getMvDetail(id).then(res => {
    detail.value = formatMvInfo(res)
  })
  getMvUrl(id).then(res => {
    url.value = res.data.data.url
  })
  getSimilarMv(id).then(res => {
    similarMv.value = res.data.mvs
  })
  getMvComment(id).then(res => {
    comment.value = res.data.hotComments
  })
}

const pageChange = page => {
  if (Object.keys(route.query)[0] === 'id') {
    getMvComment(id, page).then(res => {
      comment.value = res.data.comments
    })
  } else {
    getVideoComment(id, page).then(res => {
      comment.value = res.data.comments
    })
  }
}
</script>
<script>
export default {
  name: 'Video'
}
</script>
<style scoped lang="less">
  .mgl-10 {
    margin-left: 10px;
  }

  .w-90 {
    width: 90%;
  }

  .silver {
    color: silver;
  }

  .button-group {
    padding: 20px 0;
  }

  .videoDetail {
    display: flex;
    justify-content: space-between;

    .left {
      width: 60%;

      .info {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
    }

    .right {
      width: 40%;

      .item {
        width: 99%;
        height: 110px;
        margin-top: 15px;
      }
    }
  }
</style>
