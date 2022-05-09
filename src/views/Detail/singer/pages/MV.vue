<template>
  <main v-if="data.length" class="box">
    <div v-for="item in data" :key="item.id" class="cover" @click="toDetail(item.id)">
      <el-image :src="item.imgurl" class="image" />
      <div class="title">{{ item.name }}</div>
      <div class="count">
        <el-icon :size="15"><CaretRight/></el-icon>
        <span>{{ $formatNumber(item.playCount) }}</span>
      </div>
      <span class="time">{{ $formatTime(item.duration).slice(-5) }}</span>
    </div>
  </main>

  <el-empty v-else description="暂无MV" />
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSingerMV } from '@/network/singer.js'

const router = useRouter()
const store = useStore()
const id = computed(() => store.state.singer.singerId)
const data = ref([])

watch(id, async(val) => {
  const res = await getSingerMV(val)
  data.value = res.data.mvs
}, { immediate: true, deep: true })
const toDetail = id => {
  router.push(`/detail/mv?id=${id}`)
}
</script>

<style scoped lang="less">
  .box {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .cover {
      width: 285px;
      position: relative;
      text-align: center;
      margin-bottom: 5px;

      .title {
        margin-top: 5px;
        color: rgba(49, 48, 48, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .image {
        width: 100%;
        height: 160px;
        border-radius: 10px;
      }

      .count {
        position: absolute;
        color: white;
        font-size: 15px;
        top: 4px;
        right: 6px;

        span {
          font-size: 15px;
        }
      }

      .time {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #f1ecec;
      }
    }
  }
</style>
