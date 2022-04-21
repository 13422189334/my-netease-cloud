<template>
  <nav class="item">
    <el-row
      v-for="(item,index) in array"
      :key="item.id"
      class="item-newSong"
      align="middle"
      @click="toDetail(item.id)"
      @dblclick="current(item,index)"
    >
      <el-col :span="1">
        <div style="margin-left: 10px;">
          <span v-if="item.id === songId" class="iconfont icon-yangshengqi" />
          <span v-else>{{ index + 1 }}</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="cover">
          <el-image :src="item.al.picUrl" class="image" />
          <img class="icon" src="@/assets/image/play.png" alt="">
        </div>
      </el-col>
      <el-col :span="10">
        <div>{{ item.name }}</div>
      </el-col>
      <el-col :span="7">
        <div class="label">{{ item.label }}</div>
      </el-col>
      <el-col :span="3">
        <div class="label">
          <el-tag type="success">{{ item.album }}</el-tag>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="label">
          <el-progress
            status="warning"
            :show-text="false"
            :percentage="Math.floor(item.long / item.home * 100)"
          />
        </div>
      </el-col>
    </el-row>
  </nav>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue'
import { useStore } from 'vuex'
defineProps({
  array: {
    type: Array
  }
})

const store = useStore()
const songId = computed(() => store.state.songDetail.songDetail.id)

const currentIndex = ref()
const emit = defineEmits(['toDetail', 'current'])

const current = (item, index) => {
  currentIndex.value = index
  emit('current', { item, index })
}

const toDetail = id => {
  emit('toDetail', id)
}
</script>

<style scoped lang="less">
  .iconfont {
    color: red;
  }

  .label {
    color: #656161;
  }

  .item-newSong {
    margin-top: 5px;
  }

  .item :hover {
    background: #ededed;
    border-radius: 10px;
  }

  .cover {
    width: 80px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 50%;
    }

    .image {
      width: 70px;
      height: 70px;
      border-radius: 10px;
    }
  }
</style>
