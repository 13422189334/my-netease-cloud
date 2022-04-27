<template>
  <header>
    <div class="left">
      <el-popover
        placement="bottom-start"
        :width="550"
        trigger="hover"
      >
        <template #reference>
          <el-button type="success" size="mini" round>
            {{ currentTag }}
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </template>
        <div class="title" :class="{ active: currentTag === '全部视频' }" @click="change({ id: 0, name: '全部视频' })">全部视频</div>
        <el-divider class="divider"/>
        <section class="category">
          <nav
            v-for="item in allTags"
            :key="item.id"
            class="tag"
            :class="{ active: currentTag === item.name }"
            @click="change(item)"
          >{{ item.name }}
          </nav>
        </section>
      </el-popover>
    </div>
    <div class="right">
      <div
        v-for="item in hotTags"
        :key="item.id"
        :class="{ rightTag: true, active: currentTag === item.name }"
        @click="change(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </header>
  <el-skeleton :loading="!Boolean(videoArray.length)" :count="1" :animated="true">
    <template #template>
      <div class="video-box">
        <div v-for="item in 8" :key="item">
          <el-skeleton-item variant="image" class="skeleton-item-image" />
          <el-skeleton-item variant="p" class="skeleton-item-p" />
        </div>
      </div>
    </template>
    <template #default>
      <main class="video-box">
        <videoCover :width="'285px'" :video-array="videoArray" @toDetail="toVideoDetail" />
      </main>
    </template>
  </el-skeleton>
  <footer class="bottom-pages">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      :current-page="params.offset"
      @current-change="changePage"
    />
  </footer>
</template>

<script setup>
import videoCover from '../../components/videoCover.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { getVideoAllTag, getVideoTags, getAllVideo, getCategoryVideo } from '@/network/video.js'

const router = useRouter()
const toVideoDetail = id => {
  router.push(`/videoDetail?vid=${id}`)
}

const currentTag = ref('全部视频')
const allTags = ref([]) // 所有标签
const hotTags = ref([]) // 热门标签
const videoArray = ref([])
const params = reactive({
  id: '',
  offset: 1
})

const getVideoByCategory = () => {
  getCategoryVideo(params).then(res => {
    videoArray.value = res.data.datas.map(e => ({ ...e.data }))
  })
}

const getVideoByAll = () => {
  getAllVideo(params.offset).then(res => {
    videoArray.value = res.data.datas.map(e => ({ ...e.data }))
  })
}

onMounted(() => {
  getVideoAllTag().then(res => {
    allTags.value = res.data.data
  })
  getVideoTags().then(res => {
    hotTags.value = res.data.data
  })
  getVideoByAll()
})

/**
 * 点击分类标签事件
 * @param item
 */
const change = item => {
  if (params.id !== item.id) {
    params.offset = 1
  }
  params.id = item.id
  currentTag.value = item.name
  params.id ? getVideoByCategory() : getVideoByAll()
}

/**
 * 点击页码事件
 * @param value
 */
const changePage = value => {
  params.offset = value
  params.id ? getVideoByCategory() : getVideoByAll()
}
</script>

<style scoped lang="less">
  .bottom-pages {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .video-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 500px;

    .skeleton-item-image {
      width: 285px;
      height: 150px;
      margin-top: 20px;
    }
    .skeleton-item-p {
      height: 40px;
      width: 285px;
      margin-top: 5px;
    }
  }

  header {
    padding: 20px 0;
    /*width: 100%;*/
    display: flex;
    justify-content: space-between;

    .left {
      width: 40%;
    }

    .right {
      width: 60%;
      display: flex;
      justify-content: space-between;

      .rightTag {
        width: 80px;
        text-align: center;
        line-height: 30px;
        color: #656161;
        height: 30px;

        &:hover {
          color: #000;
          font-weight: 800;
          cursor: pointer;
        }
      }
    }

  }

  .active {
    border-radius: 30px;
    background: #fcebeb;
    color: red !important;
  }

  .title {
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

  .divider {
    margin: 10px 0 !important;
  }

  .category {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .tag {
      width: 80px;
      height: 30px;
      margin-top: 10px;
      text-align: center;
      line-height: 30px;
      color: rgba(49, 48, 48, 0.6);

      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
</style>
