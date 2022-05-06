<template>
  <skeleton1 :loading="podcastDetail !== null" :image="{ width: '220px', height: '220px' }" :row="5">
    <section class="top">
      <el-image class="cover" :src="podcastDetail.picUrl" alt="img" />
      <div class="content">
        <div class="A">
          <el-tag type="danger" size="mini">播客</el-tag>
          <h2 class="mgl-10">{{ podcastDetail.name }}</h2></div>
        <div class="B">
          <el-avatar class="img" :size="30" :src="podcastDetail.dj.avatarDetail?.identityIconUrl" />
          <el-link>{{ podcastDetail.dj.nickname }}</el-link>
          <p class="mgl-10">{{ $formatTime(podcastDetail.createTime) }} 创建</p>
        </div>
        <div class="C">
          <el-button
            v-for="button in buttons"
            :key="button.name"
            :size="button.size"
            :type="button.type"
            :icon="button.icon"
            :disabled="button.disabled"
            @click="button.handle"
            round
          >
            播放全部
          </el-button>
        </div>
        <div class="D">
          <p><el-tag type="danger" size="mini">{{ podcastDetail.secondCategory }}</el-tag></p>
          <p>电台 : {{ podcastDetail.programCount }}   播放 : {{ $formatNumber(podcastDetail.subCount) }}</p>
          <p v-if="podcastDetail.desc ? podcastDetail.desc.length < 80 : true ">{{ podcastDetail.desc }}</p>
          <el-collapse v-else>
            <el-collapse-item title="点击展开更多">
              <p>{{ podcastDetail.desc }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>
  </skeleton1>
  <el-divider content-position="left"><h2>声音</h2></el-divider>
  <section class="songs">
    <el-row
      v-for="(item,index) in songArray"
      :key="item.id"
      class="item-song"
      align="middle"
      @dblclick="current(item,index)"
    >
      <el-col :span="1">
        <div class="mgl-10">
          <span v-if="item.id === $store.state.songDetail.songDetail.id" class="iconfont icon-yangshengqi" />
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
      <el-col :span="5">
        <div class="label">{{ item.label }}</div>
      </el-col>
      <el-col :span="5">
        <div class="label">{{ $formatTime(item.album).slice(0,10) }}</div>
      </el-col>
      <el-col :span="1">
        <div class="label">{{ $formatTime(item.dt).slice(-5) }}</div>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { CaretRight, FolderAdd, Share } from '@element-plus/icons-vue'
import eventbus from '@/utlis/eventbus.js'
import { getProgram, getDjDetail } from '@/network/radio.js'

const route = useRoute()
const store = useStore()

const songArray = computed(() => store.state.songDetail.songArray)

const buttons = reactive([
  { name: '播放全部', disabled: false, type: 'danger', icon: CaretRight, size: 'medium', handle: () => current(songArray.value[0], 0) },
  { name: '收藏全部', disabled: true, type: 'default', icon: FolderAdd, size: 'medium' },
  { name: '分享', disabled: true, type: 'default', icon: Share, size: 'medium' }
])

const podcastDetail = ref(null)

onMounted(() => {
  getProgram(route.query.id).then(res => {
    const mapArray = res.data.programs.map(item => ({
      al: { picUrl: item.coverUrl },
      id: item.mainSong.id,
      name: item.name,
      dt: item.mainSong.duration,
      label: item.channels[0],
      album: item.createTime
    }))
    store.commit('setSongMusic', mapArray)
  })

  // 电台详情
  getDjDetail(route.query.id).then(res => {
    podcastDetail.value = res.data.data
  })
})

const current = (item, index) => {
  store.commit('setSongDetail', item)
  store.commit('play', index)
  eventbus.emit('playMusic')
}

</script>
<style scoped lang="less">
  .iconfont {
    color: red;
  }

  .label {
    color: #656161;
  }

  .mgl-10 {
    margin-left: 10px;
  }

  .top {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: 100%;

    .cover {
      display: block;
      height: 220px;
      width: 220px;
      border-radius: 10px;
    }

    .content {
      margin-left: 20px;

      .A {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;

      }

      .B {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;

        p {
          font-size: 14px;
          color: #748aad;
        }

        .el-link {
          margin: 0 7px;
        }
      }

      .D {
        margin-left: 5px;

        .tags {
          color: #85b9c8;
        }

        p {
          font-size: 12px;
          color: #656161;
        }
      }

    }
  }

  .songs :hover {
    background: #ededed;
    border-radius: 10px;
  }

  .item-song {
    margin-top: 5px;
    height: 60px;
  }

  .cover {
    width: 60px;
    height: 60px;
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
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
  }
</style>
