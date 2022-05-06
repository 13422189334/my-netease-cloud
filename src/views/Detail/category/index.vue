<template>
  <el-divider content-position="left"><h2>{{ $route.query.name }}</h2></el-divider>
  <el-skeleton :loading="!Boolean(categoryArray.length)" :count="1" animated class="box" >
    <template #template>
      <div class="category">
        <div class="box" v-for="item in 10" :key="item">
          <div class="left">
            <el-skeleton-item variant="image" class="image"/>
          </div>
          <div class="right">
            <el-skeleton-item variant="p" class="name"/>
            <el-skeleton-item variant="p" class="label"/>
            <el-skeleton-item variant="p" class="order"/>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <section class="category">
        <main v-for="item in categoryArray" :key="item.id" class="box" @click="toPodcastDetail(item.id)">
          <div class="left">
            <el-image class="image" :src="item.picUrl" />
          </div>
          <div class="right">
            <div class="name">{{ item.name }}</div>
            <div class="label">{{ item.rcmdtext }}</div>
            <div class="order">声音: {{ item.programCount }} 收藏: {{ item.subCount }}</div>
          </div>
        </main>
      </section>
    </template>
  </el-skeleton>
</template>
<script>
export default {
  name: 'Category'
}
</script>
<script setup>
import { getCategoryRadio } from '@/network/radio.js'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const categoryArray = ref([])
const route = useRoute()

onMounted(() => {
  getCategoryRadio(route.query.id).then(res => {
    categoryArray.value = res.data.djRadios
  })
})

const router = useRouter()
const toPodcastDetail = id => {
  router.push(`/detail/podcast?id=${id}`)
}
</script>

<style scoped lang="less">
  .category {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .box {
      width: 49%;
      height: 150px;
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;

      .left {
        width: 25%;
        height: 100%;

        .image {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }

      .right {
        width: 67%;
        height: 100%;
        margin-left: 3%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .label {
          color: #656161;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order {
          color: #7a6c6c;
        }
      }
    }
  }
</style>
