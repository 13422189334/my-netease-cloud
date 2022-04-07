<template>
  <titleTop @click="toUnique">独家放送</titleTop>
  <div ref="dom">
    <el-skeleton :loading="!Boolean(unique.length)" animated class="skeleton" :count="3">
      <template #template>
        <div class="item">
          <el-skeleton-item variant="image" class="img" />
          <el-skeleton-item variant="p" class="p" />
        </div>
      </template>
      <template #default>
        <div class="box">
          <div v-for="item in unique" :key="item.id" class="cover" @click="toDetail(item.id)">
            <el-image :src="item.picUrl" class="image" />
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <br>
</template>

<script setup>
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { getUnique } from '@/network/radio.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const unique = ref([])
const dom = ref('')
onMounted(async() => {
  await dataLazyLoading(dom)
  const res = await getUnique()
  unique.value = res.data.result
})

const toDetail = id => {
  router.push('/videoDetail?id=' + id)
}
const toUnique = () => {
  router.push('/unique')
}
</script>

<style scoped lang="less">
.skeleton {
  height: 215px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .item {
    width: 33%;
  }
  .img {
    width:100%;
    height: 160px;
  }
  .p {
    width:100%;
  }
}
.box{
  width: 100%;
  margin-bottom: -30px;
  height: 215px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .cover{
    width: 32%;
    .name{
      text-align: center;
      margin-top: 10px;
    }
  }
  .image{
    width: 100%;
    height: 160px;
    border-radius: 10px;
  }
}
</style>
