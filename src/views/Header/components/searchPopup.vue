<template>
  <keep-alive>
    <component v-loading="loading" :is="current[index]" :keyword="keyword" :search-data="searchData"/>
  </keep-alive>
</template>

<script setup>
import { watch, ref, defineProps } from 'vue'
import { getSearchSuggest } from '@/network/search.js'
import hotSearch from './hotSearch.vue'
import searchSuggest from './searchSuggest.vue'

const index = ref(0) // 组件切换下标
const current = [hotSearch, searchSuggest] // 组件切换列表
const loading = ref(false) // 切换时loading状态
const searchData = ref({}) // 接口数据

/**
 * 搜索框传入的关键字
 * */
const props = defineProps({
  keyword: {
    type: String
  }
})

let timeOut
/**
 * 简易防抖节流
 * */
watch(() => props.keyword, newValue => {
  if (newValue) {
    if (timeOut) clearTimeout(timeOut)
    loading.value = true
    timeOut = setTimeout(() => {
      if (newValue !== '' && newValue.length > 1) {
        getSearchSuggest(newValue).then(res => {
          searchData.value = res.data.result
        }).finally(() => {
          index.value = 1
          loading.value = false
        })
      }
    }, 500)
  } else {
    index.value = 0
  }
})
</script>

<style scoped lang="less">

</style>
