<template>
  <div v-for="item in videoArray" :key="item.vid" class="video" @click="toDetail(item.vid)">
    <div class="top" :style="{ width: width }">
      <el-image :src="item.coverUrl" class="image" />
      <div class="play">
        <i class="el-icon-caret-right" />
        <span class="playCount">{{ $formatNumber(item.cover) }}</span>
      </div>
      <span v-if="item.durationms" class="time">{{ $formatTime(item.durationms).slice(-5) }}</span>
    </div>
    <div class="bottom" :style="{ width: width }">
      <div class="name">{{ item.title }}</div>
      <div class="label">{{ item.creator?.nickname }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  videoArray: {
    type: Array
  },
  width: {
    type: String,
    default: '100%'
  }
})
const emit = defineEmits(['toDetail'])
const toDetail = id => {
  emit('toDetail', id)
}
</script>

<style scoped lang="less">
  .video {
    width: 24%;
    height: 200px;
    margin-top: 20px;

    .top {
      width: 100%;
      height: 150px;
      position: relative;

      .play {
        position: absolute;
        color: white;
        right: 10px;
        top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        i {
          font-size: 25px;

          .playCount {
            font-size: 15px;
          }
        }
      }

      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: white;
      }

      .image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .bottom {
      text-align: center;
      height: 40px;
      width: 100%;
      margin-top: 5px;

      .name {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #656161;
      }

      .label {
        color: silver;
        margin-top: 4px;
      }
    }
  }
</style>
