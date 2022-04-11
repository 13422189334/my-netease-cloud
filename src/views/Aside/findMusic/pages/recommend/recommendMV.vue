<template>
  <br>
  <titleTop @click="toMv">推荐MV</titleTop>
  <section ref="dom">
    <el-skeleton animated :loading="!Boolean(mvList.length)">
      <template #template>
        <div class="mv">
          <div v-for="item in 4" :key="item" class="box">
            <el-skeleton-item variant="image" class="img" />
            <el-skeleton-item variant="p" class="label" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="mv">
          <div v-for="item in mvList" :key="item.id" class="box" @click="toMvDetail(item.id)">
            <el-image :src="item.picUrl" class="img" />
            <div class="label">
              {{ item.name }}
              <div style="color: #bebbbb;">
                <template v-for="i in item.artists">{{ i.name }}</template>
              </div>
            </div>
            <div class="top">
              <span>{{ item.playCount }}</span>
              <el-icon class="top-icon">
                <CaretRight />
              </el-icon>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { getRecommendMV } from '@/network/mv.js'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { useRouter } from 'vue-router'

const mvList = ref([])
const dom = ref('')

onMounted(async() => {
  await dataLazyLoading(dom)
  const res = await getRecommendMV()
  mvList.value = res.data.result
})
const router = useRouter()
const toMvDetail = id => {
  router.push(`videoDetail?id=${id}`)
}

const toMv = () => {
  router.push('/video')
}
</script>

<style scoped lang="less">
  .mv {
    width: 100%;
    height: 270px;
    display: flex;
    justify-content: space-between;

    .box {
      width: 24%;
      height: 200px;
      position: relative;

      &:hover {
        transition: all 1s;
        transform: translate3d(0, 0px, 0);
        box-shadow: 10px 10px 10px rgba(0, 0, 0, .8);
        border-radius: 10px;
      }

      .top {
        position: absolute;
        right: 10px;
        top: 3px;
        color: #f1ecec;

        &-icon {
          font-size: 20px;
        }
        span {
          font-size: 20px;
        }
      }

      .label {
        width: 100%;
        height: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
      }

      .img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

  }
</style>
