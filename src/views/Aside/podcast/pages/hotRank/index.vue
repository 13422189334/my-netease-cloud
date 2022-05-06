<template>
  <skeleton1
    :count="8"
    :loading="songArray.length"
    :image="{ width: '70px', height: '70px' }"
    :margin="{ width: '95%', marginLeft: '5px' }"
    :row="1"
  >
    <topList :array="songArray" @toDetail="toDetail" />
  </skeleton1>
</template>

<script setup>
import { useRouter } from 'vue-router'
import topList from '../../components/topList.vue'
import { getNewTopList } from '@/network/radio.js'
import { formatNewData } from '@/utlis/formatData.js'
import { ref, onMounted } from 'vue'

const songArray = ref([])
onMounted(() => {
  getNewTopList('hot').then(res => {
    songArray.value = formatNewData(res.data.toplist.slice(0, 30))
  })
})

const router = useRouter()
const toDetail = id => {
  router.push(`/detail/podcast?id=${id}`)
}
</script>
