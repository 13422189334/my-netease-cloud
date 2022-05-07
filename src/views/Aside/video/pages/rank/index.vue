<template>
  <header>
    <div>
      <titleTop>MV排行榜</titleTop>
    </div>
    <div class="right">
      <span
        v-for="(item,index) in tags"
        :key="index"
        :class="{ active: current === item }"
        @click="change(item)"
      >
        {{ item }}
      </span>
    </div>
  </header>
  <el-skeleton
    :loading="!Boolean(mvArray.length)"
    :count="1"
    :animated="true"
  >
    <template #template>
      <section>
        <div v-for="item in 10" :key="item" class="mvTopList">
          <el-skeleton-item variant="h1" class="num" />
          <div class="skeleton-item-box">
            <el-skeleton-item variant="image" class="skeleton-item-image" />
            <div class="right">
              <el-skeleton-item variant="h1" class="skeleton-item-p" />
              <el-skeleton-item variant="h1" class="skeleton-item-p" />
            </div>
          </div>
        </div>
      </section>
    </template>
    <template #default>
      <section>
        <main v-for="(item,index) in mvArray" :key="item.id" class="mvTopList" @click="toMvDetail(item.id)">
          <div :class="{ active: index < 3 }" class="num">
            {{ index &lt; 9 ? `0${index + 1}` : index + 1 }}
          </div>
          <verticalCover
            :image="item.cover"
            :count="item.score"
            :label="item.artists"
            :name="item.name"
          />
        </main>
      </section>
    </template>
  </el-skeleton>
  <el-divider v-if="isShow && mvArray.length > 9" @click="loading">点击加载更多</el-divider>
  <el-divider v-else>没有数据了</el-divider>
</template>

<script setup>
import verticalCover from '@/views/Aside/video/components/verticalCover.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMvTopList } from '@/network/video.js'

const isShow = ref(true)
const current = ref('内地') // 当前分类
const offset = ref(0)
const tags = ref(['内地', '港台', '欧美', '日本', '韩国']) // 右侧分类
const mvArray = ref([])

const getMvList = () => {
  getMvTopList(current.value).then(res => {
    mvArray.value = res.data.data
  })
}

onMounted(() => {
  getMvList()
})

/**
 * 切换分类
 * @param item
 */
const change = item => {
  current.value = item
  offset.value = 0
  getMvList()
}

const router = useRouter()
const toMvDetail = id => {
  router.push(`/detail/mv?id=${id}`)
}

const loading = () => {
  offset.value += 10
  getMvTopList(current.value, offset.value).then(res => {
    mvArray.value.push(...res.data.data)
  }).catch(() => {
    isShow.value = false
  })
}
</script>

<style scoped lang="less">
  .active {
    color: red;
    font-weight: 900;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      width: 47%;
      display: flex;
      justify-content: space-evenly;
    }
  }

  section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .mvTopList {
      width: 45%;
      height: 130px;
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .num {
        width: 30px;
        font-size: 25px;
        margin-right: 10px;
        font-weight: 900;
      }

      .skeleton-item-box {
        display: flex;
        flex-direction: row;
        .skeleton-item-image {
          width: 292px;
          height: 130px;
        }
        .skeleton-item-p {
          width: 321px;
        }
        .right {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
      }
    }
  }
</style>
