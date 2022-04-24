<template>
  <div class="header">
    <div>
      <span class="title">最近播放</span>
      <span class="total">共100首</span>
    </div>
    <el-button type="danger" :icon="CaretRight" round>播放全部</el-button>
  </div>
  <SongList />
</template>

<script setup>
import SongList from '@/views/SongDetail/pages/SongList.vue'
import { CaretRight } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { getPlayInfo } from '@/network/user.js'

const store = useStore()
onMounted(() => {
  const id = store.state.login.profile.userId
  getPlayInfo(id).then(res => {
    store.commit('setSongMusic', res.data.allData.map(item => item.song))
  })
})
</script>

<style scoped lang="less">
  .title {
    font-size: 25px;
    font-weight: 900;
    margin-right: 10px;
  }
  .total {
    color: #bebbbb;
  }
  .el-button {
    margin: 20px 0;
  }
</style>

