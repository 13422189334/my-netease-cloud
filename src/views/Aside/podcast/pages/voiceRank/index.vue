<template>
  <skeleton1
    :count="8"
    :loading="songArray.length"
    :image="{ width: '70px', height: '70px' }"
    :margin="{ width: '95%', marginLeft: '5px' }"
    :row="1"
  >
    <topList :array="songArray" @current="current"/>
  </skeleton1>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import topList from '../../components/topList.vue'
import { getTopList } from '@/network/radio.js'
import { formatData } from '@/utlis/formatData.js'
import eventbus from '@/utlis/eventbus.js'

const store = useStore()
const songArray = ref([])

onMounted(() => {
  getTopList().then(res => {
    const mapArray = formatData(res.data.toplist)
    songArray.value = mapArray
    store.commit('setSongMusic', mapArray)
  })
})

const current = ({ item, index }) => {
  store.commit('setSongDetail', item)
  store.commit('play', index)
  eventbus.emit('playMusic')
}
</script>
