<template>
  <banner />
  <tags />

  <br>
  <headerRadio />
  <br>
  <el-card shadow="always" style="height: 340px;">
    <template #header>
      <span>猜你喜欢</span>
    </template>
    <skeleton2 :count="6" :loading="recommend.length">
      <section class="like">
        <div v-for="item in recommend" :key="item.id" @click="playLike(item)">
          <radio
            :image="item.picUrl"
            :name="item.name"
            :count="item.program.adjustedPlayCount"
          />
        </div>
      </section>
    </skeleton2>
  </el-card>
  <br>
  <!--  热门电台-->
  <el-card shadow="always" style="height: 820px;">
    <template #header>
      <span>本周上新</span>
    </template>
    <hotRadio />
  </el-card>
  <br>
  <!--  付费精选-->
  <payRadio />
</template>
<script setup>
import banner from './components/banner'
import tags from './components/tags'
import headerRadio from '../../children/headerRadio.vue'
import hotRadio from '../../children/hotRadio.vue'
import payRadio from '../../children/payRadio.vue'
import { getCategory, getRadio } from '@/network/radio.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 推荐电台
const recommend = ref([])
getRadio().then(res => {
  recommend.value = res.data.result
})
// // 分类
// const category = ref([])
// onMounted(async() => {
//   const res = await getCategory()
//   category.value = res.data.categories
// })
// const router = useRouter()
// const goCategoryList = (id, name) => {
//   router.push(`/categoryList?id=${id}&name=${name}`)
// }
const object = {
  al: { picUrl: '' },
  dt: '',
  id: '',
  name: ''
}
// 播放喜欢
const store = useStore()
const playLike = item => {
  object.al.picUrl = item.picUrl
  const { duration, id, name } = item.program.mainSong
  object.dt = duration
  object.id = id
  object.name = name
  store.commit('setSongDetail', object)
  store.commit('play', 0)
}

</script>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
