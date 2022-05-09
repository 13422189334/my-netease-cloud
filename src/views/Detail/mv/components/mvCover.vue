<template>
  <div class="cover" @click="toDetail">
    <div class="left">
      <el-image :src="image" class="image" />
      <div class="play">
        <i class="el-icon-caret-right" />
        <el-icon><CaretRight/></el-icon>
        <span class="playCount">{{ $formatNumber(count) }}</span>
      </div>
      <span v-if="time" class="time">{{ $formatTime(time).slice(-5) }}</span>
    </div>
    <div class="right">
      <div class="name">{{ name }}</div>
      <div v-if="Array.isArray(label)" class="label">
        {{ label.map(v => v.name || v.userName ).join(' , ')}}
      </div>
      <div v-else class="label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CaretRight } from '@element-plus/icons-vue'
const props = defineProps({
  mvId: {
    type: Number
  },
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

const router = useRouter()
const route = useRoute()
const toDetail = () => {
  router.replace(`/detail/mv?${Object.keys(route.query)[0]}=${props.mvId}`)
}
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
        right: 4px;
        top: 1px;
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
