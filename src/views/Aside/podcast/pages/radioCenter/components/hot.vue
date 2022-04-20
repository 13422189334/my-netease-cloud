<template>
  <el-card class="box-card" shadow="always" type="text">
    <template #header>
      <div class="clearfix">
        <span>热门推荐</span>
        <el-pagination
          small
          :hide-on-single-page="false"
          layout="prev,pager,next"
          :total="100"
          @current-change="change"
        />
      </div>
    </template>
    <skeleton2 :count="6" :loading="hotRadio.length">
      <div class="radio-list">
        <radio
          v-for="item in hotRadio"
          :key="item.id"
          class="radio-item"
          :image="item.picUrl"
          :count="item.subCount"
          :name="item.name"
          @click="toDetail(item.id)"
        />
      </div>
    </skeleton2>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHotRadio } from '@/network/radio.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const hotRadio = ref([]) // 热门播客

onMounted(() => {
  change(1)
})

const change = value => {
  getHotRadio(value * 6).then(res => {
    hotRadio.value = res.data.djRadios
  })
}

const toDetail = id => {
  router.push(`/program?id=${id}`)
}
</script>

<style scoped lang="less">
  .box-card {
    height: 340px;
    margin-top: 20px;
  }

  .clearfix, .radio-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .radio-item {
    cursor: pointer;
  }
</style>
