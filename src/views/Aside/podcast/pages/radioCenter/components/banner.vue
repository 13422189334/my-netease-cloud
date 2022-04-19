<template>
  <el-skeleton :loading="!Boolean(banners.length)" :count="3" :animated="true" class="box">
    <template #template>
      <el-skeleton-item variant="image" class="banner" />
    </template>
    <template #default>
      <div class="box">
        <el-image v-for="item in banners" :key="item.id" class="banner" :src="item.pic" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDjBanner } from '@/network/radio.js'

/**
 * 轮播图
 * */
const banners = ref([])
onMounted(() => {
  getDjBanner().then(res => {
    banners.value = res.data.data
  })
})

</script>

<style scoped lang="less">
.box{
  display: flex;
  justify-content: space-between;
  .banner {
    width: 32%;
    border-radius: 10px;
    height: 150px;
  }
}
</style>
