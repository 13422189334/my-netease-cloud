<template>
  <el-card shadow="always" class="box-card">
    <template #header>
      <span>猜你喜欢</span>
    </template>
    <skeleton2 :count="6" :loading="recommend.length">
      <section class="radio-list">
        <radio
          v-for="item in recommend"
          :key="item.id"
          class="radio-item"
          :image="item.picUrl"
          :name="item.name"
          :count="item.program.adjustedPlayCount"
          @click="play(item)"
        />
      </section>
    </skeleton2>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getRadio } from '@/network/radio.js'
import eventBus from '@/utlis/eventbus.js'
const store = useStore()

const recommend = ref([])// 热门播客

onMounted(() => {
  getRadio().then(res => {
    recommend.value = res.data.result
  })
})

const object = reactive({
  al: { picUrl: '' },
  dt: '',
  id: '',
  name: ''
})

/**
 * 播放歌曲
 * @param item
 */
const play = item => {
  const { duration, id, name } = item.program.mainSong
  object.al.picUrl = item.picUrl
  object.dt = duration
  object.id = id
  object.name = name
  store.commit('setSongDetail', object)
  store.commit('play', 0)
  eventBus.emit('playMusic')
}
</script>

<style scoped lang="less">

  .box-card {
    height: 340px;
    margin-top: 20px;
  }
  .radio-list{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .radio-item {
    cursor: pointer;
  }
</style>
