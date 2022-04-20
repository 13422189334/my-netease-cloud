<template>
  <el-card shadow="always" class="box-card">
    <template #header>
      <div class="card-header">
        <span>付费精选</span>
      </div>
    </template>
    <section ref="dom" class="payRadio">
      <skeleton2 :count="6" :loading="payRadio.length">
        <radio
          v-for="item in payRadio"
          :key="item.id"
          :image="item.picUrl"
          :count="item.score"
          :name="item.name"
          @click="toDetail(item.id)"
        />
      </skeleton2>
    </section>
  </el-card>
</template>

<script setup>
import { getGoodRadio } from '@/network/radio.js'
import { onMounted, ref } from 'vue'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const dom = ref('')
const payRadio = ref([])

onMounted(async() => {
  await dataLazyLoading(dom)
  const res = await getGoodRadio()
  payRadio.value = res.data.data.list
})

const toDetail = id => {
  router.push(`/program?id=${id}`)
}
</script>

<style scoped lang="less">
  .box-card {
    margin-top: 20px;
  }

  .payRadio {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
