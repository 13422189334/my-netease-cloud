<template>
  <div class="top">
    <el-popover
      placement="bottom-start"
      :width="650"
      trigger="hover"
    >
      <template #reference>
        <el-button type="success" size="small" round>
          {{ tagName }}<el-icon><ArrowRight/></el-icon>
        </el-button>
      </template>
      <section>
        <strong
          style="margin-left: 10px;"
          :class="{active: tagName === '全部歌单'}"
          @click="changeTag('全部歌单')"
        >
          全部歌单
        </strong>
        <el-divider />
        <section class="all-tags">
          <section class="tags-box" v-for="(item,index) in allTags" :key="index">
            <div class="left">
              <i :class="item.icon" />
              <span>{{ item.label }}</span>
            </div>
            <div class="right">
              <div
                v-for="(v,i) in item.list"
                :key="i"
                :class="{active:tagName === v.name}"
                class="tag"
                @click="changeTag(v.name)"
              >
                {{ v.name }}
                <span v-if="v.is" class="hot">hot</span>
              </div>
            </div>
          </section>
        </section>
      </section>
    </el-popover>
    <div class="hot-tags">
      <span
        v-for="item in hotTags"
        :key="item.id"
        class="hot-tags-item"
        @click="changeTag(item.name)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
  <section>
    <el-skeleton :loading="!Boolean(songList.length)" :count="1">
      <template #template>
        <div class="center">
          <div v-for="item in 15" :key="item" class="skeleton-item cover">
            <el-skeleton-item variant="image" class="image" />
            <div class="cover">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="h1" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="center">
          <coverPicture
            v-for="item in songList"
            :key="item.id"
            :label="item.name"
            :user="item.creator.nickname"
            :play-count="item.playCount"
            :image="item.coverImgUrl"
            @click="toDetail(item.id)"
          />
        </div>
      </template>
    </el-skeleton>
  </section>
  <div class="footer-pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="songTotal"
      @current-change="change"
    />
  </div>
</template>

<script setup>
import { getSongMenu, getSongMenuCategory, getSongMenuHotCategory } from '@/network/songList.js'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ArrowRight } from '@element-plus/icons-vue'
const router = useRouter()
const store = useStore()

const hotTags = ref([]) // 热门分类
const tagName = ref('全部歌单') // 选中的分类
const songList = ref([])
const songTotal = ref()
const params = reactive({
  order: 'hot',
  cat: '全部歌单',
  limit: 15,
  offset: 0
})

const allTags = reactive([
  { icon: 'iconfont icon-wangluo', label: '语种', list: [] },
  { icon: 'iconfont icon-fengge', label: '风格', list: [] },
  { icon: 'iconfont icon-kafei', label: '场景', list: [] },
  { icon: 'iconfont icon-iconweixiao', label: '情感', list: [] },
  { icon: 'iconfont icon-fenlei', label: '主题', list: [] }
])

onMounted(() => {
  // 获取热门分类
  getSongMenuHotCategory().then(res => {
    hotTags.value = res.data.tags
  })

  // 获取所有分类
  getSongMenuCategory().then(res => {
    res.data.sub.forEach(item => {
      if (item.category === 0) {
        allTags[0].list.push({ name: item.name, is: item.hot })
      } else if (item.category === 1) {
        allTags[1].list.push({ name: item.name, is: item.hot })
      } else if (item.category === 2) {
        allTags[2].list.push({ name: item.name, is: item.hot })
      } else if (item.category === 3) {
        allTags[3].list.push({ name: item.name, is: item.hot })
      } else {
        allTags[4].list.push({ name: item.name, is: item.hot })
      }
    })
  })

  // 获取歌曲
  getSongs()
})

const getSongs = () => {
  getSongMenu(params).then(res => {
    const { playlists, total } = res.data
    songList.value = playlists
    songTotal.value = total
  })
}

const changeTag = tag => {
  tagName.value = tag
  params.cat = tag
  getSongs()
}

const change = value => {
  params.offset = value
  getSongs()
}

const toDetail = id => {
  store.dispatch('getSongList', id)
  router.push('/songDetail')
}
</script>

<style scoped lang="less">
  .active {
    font-weight: 900;
    color: red !important;
    transition: all 1s;
  }

  .el-divider--horizontal {
    margin: 12px 0 24px 0;
  }

  .all-tags {
    width: 100%;

    .tags-box {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;

      .left {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: -10px;

        span {
          margin-left: 10px;
        }
      }

      .right {
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .tag {
          width: 16.6%;
          height: 50px;
          color: rgb(101, 97, 97);

          &:hover {
            color: red;
            transition: all 1s;
            font-weight: 600;
            cursor: pointer;
          }

          .hot {
            font-size: 10px;
            color: red;
          }
        }
      }
    }
  }

  .top {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hot-tags {
      width: 60%;
      display: flex;
      justify-content: space-between;

      &-item {
        color: #656161;

        &:hover {
          cursor: pointer;
          color: pink;
          transform: scale(1.1);
          transition: all 1s;
        }
      }
    }
  }

  .center {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .cover {
      margin-top: 15px;
    }

    .skeleton-item {
      width: 220px;

      .image {
        width: 220px;
        height: 220px;
      }
    }
  }

  .footer-pagination {
    display: flex;
    justify-content: center;
  }
</style>
