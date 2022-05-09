<template>
  <el-card class="box-card mgt-20">
    <div>
      <strong>语种:</strong>
      <span
        v-for="item in paramData.area"
        :key="item.id"
        :class="{ 'tag-item-1': true, 'mgl-20': true, active: params.area === item.id }"
        @click="change(item)"
      >
        {{ item.area }}
      </span>
    </div>
    <div class="category">
      <strong>分类:</strong>
      <span
        v-for="item in paramData.type"
        :key="item.id"
        :class="{ 'tag-item-1': true, 'mgl-20': true, active: params.type === item.id }"
        @click="change(item)"
      >
        {{ item.type }}
      </span>
    </div>
    <div class="tag-item-2">
      <strong>筛选:</strong>
      <span
        :class="{ 'mgl-12': true, active: params.initial === -1 }"
        @click="change(-1)"
      >
        热门
      </span>
      <span
        v-for="(item,index) in paramData.latter"
        :key="index"
        :class="{ 'mgl-20': true, active: params.initial === item }"
        @click="change(item)"
      >
        {{ item }}
      </span>
      <span :class="{ 'mgl-20': true, active: params.initial === 0 }" @click="change(0)">#</span>
    </div>
  </el-card>
  <skeleton2 :loading="singer.length" :count="10" :size="{ width: '210px', height: '220px' }">
    <div class="skeleton-box pdt-pdb-20">
      <div v-for="item in singer" :key="item.id" class="box">
        <el-image :src="item.img1v1Url" class="image" @click="toSingerDetail(item.id)" />
        <div>{{ item.name }}</div>
      </div>
    </div>
  </skeleton2>
  <div v-if="singer.length" class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="current"
      :total="1000"
      @current-change="changePages"
    />
  </div>
</template>

<script setup>
import { getSingerCategory } from '@/network/singer.js'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const paramData = reactive({
  area: [{ area: '全部', id: -1 }, { area: '华语', id: 7 }, { area: '欧美', id: 96 }, { area: '日本', id: 8 }, {
    area: '韩国',
    id: 16
  }, { area: '其他', id: 0 }],
  type: [{ type: '全部', id: -1 }, { type: '男歌手', id: 1 }, { type: '女歌手', id: 2 }, { type: '乐队', id: 3 }],
  latter: []
}) // 筛选条件
const current = ref(1) // 页码
const singer = ref([]) // 歌手数据
const params = reactive({
  limit: 10,
  offset: 0,
  initial: -1,
  type: -1,
  area: -1
})

/**
 * 获取歌手
 */
const getSinger = () => {
  getSingerCategory(params).then(res => {
    singer.value = res.data.artists
  })
}

/**
 * 获取字符集合
 */
const getLetter = () => {
  const array = []
  for (let i = 0; i < 26; i++) {
    array.push(String.fromCharCode(65 + i))
  }
  paramData.latter.push(...array)
}

onMounted(() => {
  getSinger()
  getLetter()
})

const changePages = value => {
  current.value = value
  params.offset = (value - 1) * 10
  getSinger()
}

const change = value => {
  if (Object.entries(value).flat(1)[0] === 'area') {
    params.area = value.id
  } else if (Object.entries(value).flat(1)[0] === 'type') {
    params.type = value.id
  } else {
    params.initial = value
  }
  changePages(1)
}

const router = useRouter()
const store = useStore()
const toSingerDetail = id => {
  store.commit('setSingerId', id)
  router.push(`/detail/singer`)
}

</script>

<style scoped lang="less">
  .active {
    color: red !important;
    font-weight: 900;
  }

  .mgt-20 {
    margin-top: 20px;
  }

  .mgl-12 {
    margin-left: 12px;
  }

  .mgl-20 {
    margin-left: 20px;
  }

  .pdt-pdb-20 {
    padding: 20px 0;
  }

  .box-card {
    height: 150px;

    .category {
      margin: 30px 0;
    }

    strong {
      color: rgba(49, 48, 48, 0.8);
    }

    .tag-item-1 {
      color: #656161;
    }

    .tag-item-2 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  .skeleton-box {
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px 0;

    .box {
      text-align: center;
    }

    .image {
      width: 210px;
      height: 220px;
      border-radius: 10px;

      &:hover {
        transition: all 1s;
        transform: translate3d(0, -5px, 0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, .8);
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
