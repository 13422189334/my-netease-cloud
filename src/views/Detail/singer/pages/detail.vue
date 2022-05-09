<template>
  <div class="detail" v-if="singerDetail.length">
    <el-descriptions v-for="(item, index) in singerDetail" :key="index" :title="item.ti" size="small">
      <el-descriptions-item>
        <p v-for="(v, i) in item.txt" :key="i">● {{ v }}</p>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <el-empty v-else description="暂无歌手介绍" />
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { getSingerDesc } from '@/network/singer.js'

const store = useStore()
const id = computed(() => store.state.singer.singerId)
const singerDetail = ref([])

watch(id, async(val) => {
  const res = await getSingerDesc(val)

  const introduction = res.data.introduction
  introduction.forEach(item => {
    item.txt = item.txt.replaceAll('●', '').split('\n')
  })
  singerDetail.value = introduction
}, { immediate: true, deep: true })
</script>

<style scoped lang="less">
  /deep/ .el-descriptions__header {
    margin: 0!important;
  }
  /deep/ .el-descriptions__label {
    display: none;
  }
  .detail {
    padding: 20px 0;
  }
</style>
