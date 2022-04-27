<template>
  <el-card>
    <div v-for="(item,index) in tags" :key="index" :class="{ tags: true, center: index === 1 }">
      <div>{{ item.type }}:</div>
      <div
        v-for="(v,i) in item.tag"
        :key="i"
        :class="{ active: params[item.params] === v.value, item: true }"
        @click="change(v)"
      >{{ v.name }}
      </div>
    </div>
  </el-card>
  <el-skeleton :count="1" :loading="!Boolean(mvArray?.length)" animated>
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
      <section class="video">
        <horizontalCover :width="'285px'" :video-array="mvArray" @toDetail="toDetail" />
      </section>
    </template>
  </el-skeleton>
  <el-divider @click="loading">点击加载更多</el-divider>
</template>

<script setup>
import horizontalCover from '@/views/Aside/video/components/horizontalCover.vue'
import { getAllMv } from '@/network/video.js'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const tags = [
  {
    params: 'area',
    type: '地区',
    tag: [
      { type: 0, value: '', name: '全部' },
      { type: 0, value: '内地', name: '内地' },
      { type: 0, value: '港台', name: '港台' },
      { type: 0, value: '欧美', name: '欧美' },
      { type: 0, value: '日本', name: '日本' },
      { type: 0, value: '韩国', name: '韩国' }
    ]
  },
  {
    params: 'type',
    type: '类型',
    tag: [
      { type: 1, value: '', name: '全部' },
      { type: 1, value: '官方版', name: '官方版' },
      { type: 1, value: '原生', name: '原生' },
      { type: 1, value: '现场版', name: '现场版' },
      { type: 1, value: '网易出品', name: '网易出品' }
    ]
  },
  {
    params: 'order',
    type: '排序',
    tag: [
      { type: 2, value: '', name: '上升最快' },
      { type: 2, value: '最热', name: '最热' },
      { type: 2, value: '最新', name: '最新' }
    ]
  }
]

const params = reactive({
  area: '',
  type: '',
  order: '',
  limit: 12,
  offset: 0
})

const mvArray = ref([])
const getMv = (cb) => {
  getAllMv(params).then(res => {
    const result = res.data.data.map(item => ({
      coverUrl: item.cover,
      vid: item.id,
      cover: item.playCount,
      title: item.name,
      nickname: item.artists.map(e => e.name).join('、'),
      durationms: item.durationms
    }))
    typeof cb === 'function' && cb(result)
  })
}

const valueCallBack = (param) => (mvArray.value = param)
const addCallBack = (param) => mvArray.value.push(...param)

onMounted(() => {
  getMv(valueCallBack)
})

const loading = () => {
  params.offset += 12
  getMv(addCallBack)
}

const change = value => {
  if (value.type === 0) {
    params.area = value.value
  } else if (value.type === 1) {
    params.type = value.value
  } else {
    params.order = value.value
  }
  getMv(valueCallBack)
}

const router = useRouter()
const toDetail = id => {
  router.push(`/videoDetail?id=${id}`)
}
</script>

<style scoped lang="less">
  .el-card {
    margin-top: 20px;
  }

  .center {
    padding: 20px 0;
  }

  .tags {
    display: flex;
    justify-content: flex-start;

    .item {
      width: 100px;
      text-align: center;
      cursor: pointer;
    }
  }

  .active {
    color: red;
  }

  .list {
    border: 1px solid red;

    li {
      width: 100%;
      height: 50px;
      background: pink;
      margin-top: 20px;
    }
  }

  .video {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
