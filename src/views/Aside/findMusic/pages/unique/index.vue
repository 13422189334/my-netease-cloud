<template>
  <h3>独家放送</h3>
  <skeleton2 :count="12" :size="{width:'384px',height:'142px'}" :loading="unique.length">
    <div class="box">
      <div v-for="item in unique" :key="item.id" class="cover" @click="toDetail(item.id)">
        <el-image :src="item.picUrl" class="image" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </skeleton2>

  <br>
  <el-divider v-if="unique.length" @click="load">点击加载更多</el-divider>
</template>

<script setup>
import { getUniqueList } from '@/network/radio.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const unique = ref([])
getUniqueList(12).then(res => {
  unique.value = res.data.result
})

const toDetail = id => {
  router.push('/detail/mv?id=' + id)
}
let offset = 0
const load = () => {
  offset += 12
  getUniqueList(12, offset).then(res => {
    unique.value.push(...res.data.result)
  })
}
</script>

<style scoped lang="less">
.box{
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
    .name{
      text-align: center;
    }
  .image{
    border-radius: 10px;
  }
}
</style>
