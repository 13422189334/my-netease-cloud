<template>
  <div class="top">
    <div class="date">
      <span class="el-icon-monitor" />
      <div class="time">{{ date }}</div>
    </div>
    <div class="title">
      <h3>每日歌曲推荐</h3>
      <p>根据你的音乐口味生成, 每日6:00更新</p>
    </div>
  </div>
  <div class="button-group">
    <el-button type="danger" round :icon="CaretRight" @click="playAll">播放全部</el-button>
    <el-button disabled round :icon="FolderAdd" @click="like">收藏全部</el-button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import eventbus from '@/utlis/eventbus.js'
import { throttle } from '@/utlis/throttle.js'
import { CaretRight, FolderAdd } from '@element-plus/icons-vue'

const date = ref()
onMounted(() => {
  date.value = new Date(Date.now()).getDate()
})

const playAll = throttle(() => {
  eventbus.emit('playAll')
}, 100)
</script>

<style scoped lang="less">
.top{
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  .title{
    p{
      color: #878787;
      font-size: 13px;
    }
  }
  .date{
    width: 100px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    position: relative;
    .time{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-55%,-55%);
      color: #ec4141;
      font-size: 30px;
      font-weight: 900;
    }
    .el-icon-monitor{
      font-size: 80px;
      color: #ec4141;
    }
  }
}
.button-group {
  margin-left: 10px;
  margin-bottom: 20px;
}
</style>
