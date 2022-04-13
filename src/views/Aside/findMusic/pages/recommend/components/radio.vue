<template>
  <titleTop @click="toPodcast">热门播客</titleTop>
  <div ref="dom" >
    <section v-if="!radioData.length" class="skeleton-box">
      <div v-for="i in 6" :class="['skeleton-box-item', i % 2 === 0 ? 'double' : '']">
        <el-skeleton animated>
          <template #template>
            <section class="skeleton-item">
              <el-skeleton-item variant="image" class="img" />
              <div class="box">
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
              </div>
            </section>
          </template>
        </el-skeleton>
      </div>
    </section>
    <div v-else class="radio-box">
      <coverBox
        v-for="item in radioData"
        :image="item.picUrl"
        :tags="item.category"
        :label="item.dj.nickname"
        :time="item.createTime"
        :key="item.id"
        :count="item.subCount"
        :title="item.name"
        @click="toDetail(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { getRadioRecommend } from '@/network/radio.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const dom = ref('')
const radioData = ref([])

onMounted(async() => {
  const res = await getRadioRecommend()
  radioData.value = res.data.data
  await dataLazyLoading(dom)
})

const toDetail = id => {
  router.push(`/program?id=${id}`)
  window.scrollTo(0, 0)
}

const toPodcast = () => {
  router.push('/podcast')
  window.scrollTo(0, 0)
}
</script>

<style scoped lang="less">
.radio-box{
  height: 360px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.skeleton-box {
  height: 360px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &-item {
    width: 49%;
  }

  .double {
    margin-left: 20px;
  }

  .skeleton-item {
    display: flex;
    justify-content: flex-start;
    .img {
      width: 100px;
      height: 100px;
    }
    .box {
      width: 70%;
      height: 100px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }
}

</style>
