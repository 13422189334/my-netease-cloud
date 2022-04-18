<template>
  <!--专属定制-->
  <skeleton1 :loading="songList.length">
    <songCard :song-detail="songList[0]" />
  </skeleton1>
  <div class="title">
    <span>精品歌单</span>
    <!--  弹出框-->
    <el-popover
      placement="bottom"
      :width="530"
      trigger="hover"
    >
      <template #reference>
        <el-button
          type="success"
          round
          size="small"
          :icon="ColdDrink"
        >{{ tagTitle }}</el-button>
      </template>
      <p class="all" :class="{ top: true, active:current === -1}" @click="select(undefined,-1)">全部歌单</p>
      <el-divider />
      <ul class="tags">
        <li
          v-for="(item,index) in tags"
          :key="item.id"
          class="tag"
          :class="{active:current === index}"
          @click="select(item.name,index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </el-popover>
  </div>
  <!--  歌单列表-->
  <skeleton1
    :count="12"
    :loading="songList.length"
    :width="{ width: '33%' }"
    :margin="{ width:'222px', marginLeft: '10px' }"
  >
    <main class="main">
      <section v-for="item in songList" :key="item.id" class="cover" @click="toSongListDetail(item.id)">
        <div class="left">
          <img class="img" :src="item.coverImgUrl" :alt="item.name">
          <i class="iconfont icon-bofang" />
          <div class="right-top">
            <el-icon>
              <CaretRight />
            </el-icon>
            <span>{{ $formatNumber(item.playCount) }}</span>
          </div>
        </div>
        <div class="label">
          <a class="name">{{ item.name }}</a>
          <p class="tags">{{ item.creator.nickname }}</p>
          <p class="tags" v-if="item.copywriter">{{ item.copywriter }}</p>
          <p class="tags">
            <el-tag size="mini" type="danger">{{ item.tag }}</el-tag>
          </p>
        </div>
      </section>
    </main>
  </skeleton1>
  <div v-if="songList.length" @click="load">
    <el-affix target=".main" :offset="60">
      <el-divider>点击加载更多</el-divider>
    </el-affix>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, reactive, ref } from 'vue'
import { CaretRight, ColdDrink } from '@element-plus/icons-vue'
import songCard from './components/songCard.vue'
import { getExclusiveSong, getSongListTags } from '@/network/songList.js'

const store = useStore()

const tags = ref([]) // 标签集合
const isShow = ref(false) // 是否显示标签集合
const current = ref(-1) // 分页
const tagTitle = ref('全部歌单')
const songList = ref([]) // 歌单集合
const params = reactive({
  cat: '',
  limit: 12,
  before: undefined
})

onMounted(() => {
  getSongList()
  getTagList()
})

/**
 * 加载更多
 */
const load = () => {
  getSongList()
}

const getSongList = (boolean) => {
  getExclusiveSong(params).then(res => {
    if (boolean) {
      songList.value = res.data.playlists
    } else {
      songList.value.push(...res.data.playlists)
    }
    const len = res.data.playlists.length
    params.before = res.data.playlists[len - 1].updateTime
  })
}

/**
 * 获取标签
 */
const getTagList = () => {
  getSongListTags().then(res => {
    console.log('res', res)
    tags.value = res?.data.tags
  })
}

const select = (tag, index) => {
  isShow.value = false
  if (index === -1) {
    tagTitle.value = '全部歌单'
  } else {
    tagTitle.value = tag
  }
  params.cat = tag
  params.before = ''
  current.value = index
  getSongList(true)
}
// 点击精品歌单跳转
const router = useRouter()
const toSongListDetail = id => {
  store.dispatch('getSongList', id)
  router.push('/songDetail')
}
</script>

<style scoped lang="less">
  .active {
    color: red;
    font-weight: 900 !important;
  }
  .title {
    padding: 20px 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 900;
      font-size: 20px;
    }

    .top {
      padding: 0 40px;
    }

    .tag:hover {
      cursor: pointer;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .cover {
    width: 32%;
    display: flex;
    justify-content: flex-start;
    height: 160px;

    .left {
      position: relative;

      &:hover .iconfont {
        opacity: 1;
        transition: all 1s;
      }

      .iconfont {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 30px;
        opacity: 0;
        color: white;
      }

      .right-top {
        font-size: 12px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 5px;
        top: 3px;
        color: white;
      }
    }

    .label {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      /*justify-content: space-between;*/

      p {
        color: #625c5c;
        font-size: 15px;
      }

      .tags {
        font-size: 12px;
      }
    }

    .img {
      width: 150px;
      height: 150px;
      display: block;
      border-radius: 10px;
    }
  }

  .all {
    font-weight: 600;

    &:hover {
      color: red;
    }
  }

  .tags {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .tag {
      width: 20%;
      height: 45px;
      font-weight: 500;

      &:hover {
        color: red;
      }
    }
  }
</style>
