<template>
  <div class="cover">
    <div class="left">
      <el-image :src="image" class="image" />
      <div class="play">
        <i class="el-icon-caret-right" />
        <span class="playCount">{{ $formatNumber(count) }}</span>
      </div>
      <span v-if="time" class="time">{{ $formatTime(time).slice(-5) }}</span>
    </div>
    <div class="right">
      <div class="name">{{ name }}</div>
      <div v-if="Array.isArray(label)" class="label">
        <div v-for="(v,i) in label" :key="i">{{ v.name || v.userName }}</div>
      </div>
      <div v-else class="label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  image: {
    type: String
  },
  name: {
    type: String
  },
  time: {
    type: Number
  },
  label: {
    type: [String, Array]
  },
  count: {
    type: Number
  }
})
</script>

<style scoped lang="less">
  .cover {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;

    .left {
      width: 40%;
      height: 100%;
      position: relative;

      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: white;
      }

      .play {
        position: absolute;
        color: white;
        right: 2px;
        top: 2px;
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

      .image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .right {
      margin-left: 4%;
      width: 55%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        width: 100%;
        height: 40px;
        line-height: 20px;
        color: #656161;
      }

      .label {
        width: 100%;
        height: 20px;
        color: silver;
      }
    }
  }
</style>
