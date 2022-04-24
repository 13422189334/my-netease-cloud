<template>
  <header class="header">
    <navTabs @change="change" />
    <div>
      <el-button
        v-for="(button, bIndex) in buttons"
        :key="bIndex"
        :type="button.type"
        :size="button.size"
        :icon="button.icon"
        :disabled="button.disabled"
        @click="button.handle"
        round
      >
        {{ button.name }}
      </el-button>
    </div>
  </header>
  <skeleton1 :count="8" :loading="songArray.length" :image="{width:'70px',height:'70px'}" :row="1" show>
    <nav class="item">
      <el-row
        v-for="(item,index) in songArray"
        :key="item.id"
        class="item-newSong"
        align="middle"
        @dblclick="current(item, index)"
      >
        <el-col :span="1">
          <div style="margin-left: 10px;">
            <span v-if="item.id === $store.state.songDetail.songDetail.id" class="iconfont icon-yangshengqi" />
            <span v-else>{{ index+1 }}</span>
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
        <el-col :span="3">
          <div class="label">{{ item.label }}</div>
        </el-col>
        <el-col :span="7">
          <div class="label">{{ item.album }}</div>
        </el-col>
        <el-col :span="1">
          <div class="label">{{ $formatTime(item.dt).slice(-5) }}</div>
        </el-col>
      </el-row>
    </nav>
  </skeleton1>
</template>

<script setup>
import navTabs from '../../components/navTabs.vue'
import { computed, reactive } from 'vue'
import { VideoPlay, FolderAdd } from '@element-plus/icons-vue'
import eventbus from '@/utlis/eventbus.js'
import { getNewMusic } from '@/network/song.js'
import { formatNewMusic } from '@/utlis/formatData.js'
import { useStore } from 'vuex'

// 默认为当前播放歌单的前20首
const songArray = computed(() => store.state.songDetail.songArray.slice(0, 20))

// 按钮集合
const buttons = reactive([
  { type: 'danger', size: 'mini', icon: VideoPlay, name: '播放全部', disabled: false, handle: () => current(songArray.value[0], 0) },
  { type: 'success', size: 'mini', icon: FolderAdd, name: '收藏全部', disabled: true }
])

/**
 * 播放歌曲  全部播放：默认第一个
 * @param item
 * @param index
 */
const current = (item, index) => {
  store.commit('setSongDetail', item)
  store.commit('play', index)
  eventbus.emit('playMusic')
}

const store = useStore()

// 调整分类
const change = value => {
  getNewMusic(value.type).then(res => {
    store.commit('setSongMusic', formatNewMusic(res?.data?.data))
  })
}

</script>

<style scoped lang="less">
  .iconfont {
    color: red;
  }

  .label {
    color: #656161;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
  }
</style>
