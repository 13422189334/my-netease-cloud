<template>
  <div class="box" v-if="singer.length">
    <cover
      v-for="item in singer"
      :key="item.id"
      :image="item.picUrl"
      :name="item.name"
      @click="toSingerDetail(item.id)"
    />
  </div>
  <el-empty v-else description="暂无相似歌手" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSimiSinger } from '@/network/singer.js'

const store = useStore()
const id = computed(() => store.state.singer.singerId)
const singer = ref([])

watch(id, async(val) => {
  const res = await getSimiSinger(val)
  singer.value = res.data.artists
}, { immediate: true, deep: true })

const router = useRouter()
const toSingerDetail = singerId => {
  store.commit('setSingerId', singerId)
  router.push(`/detail/singer`)
}
</script>

<style scoped lang="less">
  .box {
    padding: 20px 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  /deep/ .cover {
    width: 285px;
    .image {
      width: 100%;
      height: 208px;
    }
  }
</style>
