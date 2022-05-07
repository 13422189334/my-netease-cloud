<template>
  <el-skeleton class="skeleton" :loading="!Boolean(banners.length)" :count="1" animated>
    <template #template>
      <el-skeleton-item variant="image" class="skeleton-around" />
      <el-skeleton-item variant="image" class="skeleton-center" />
      <el-skeleton-item variant="image" class="skeleton-around" />
    </template>
    <template #default>
      <el-carousel trigger="click" indicator-position="outside" type="card" height="230px">
        <el-carousel-item v-for="item in banners" :key="item.targetId" :label="item.typeTitle" @click="clickBanner(item)">
          <el-image class="carousel-img" :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import eventbus from '@/utlis/eventbus.js'
import { getBanner } from '@/network/recommend.js'
import { getAlbumContent } from '@/network/comment.js'
import { formatAlbum } from '@/utlis/formatData.js'

const store = useStore()
const router = useRouter()

/**
 * 轮播图
 * */
const banners = ref([])
onMounted(() => {
  getBanner().then(res => {
    banners.value = res?.data.banners
  })
})

/**
 * 点击轮播图事件
 * */
const clickBanner = value => {
  if (value.targetType === 1) {
    store.dispatch('getSongDetailData', value.targetId).then(() => {
      eventbus.emit('playMusic')
    })
  } else if (value.url) {
    open(value.url)
  } else if (value.targetType === 10) {
    getAlbumContent(value.targetId).then(res => {
      store.commit('setSongList', formatAlbum(res.data.album))
      store.commit('setSongMusic', res.data.songs)
    })
    router.push('/detail/song')
  } else if (value.targetType === 1000) {
    store.dispatch('getSongList', value.targetId)
    router.push('/detail/song')
  } else if (value.targetType === 1004) {
    router.push(`/detail/mv?id=${value.targetId}`)
  }
}
</script>

<style scoped lang="less">
.skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-center {
    width: 50%;
    height: 220px;
    border-radius: 5px;
  }
  &-around {
    width: 25%;
    height: 190px;
  }
}
.carousel-img {
  width:100%;
  height: 220px;
  border-radius: 5px;
}
</style>
