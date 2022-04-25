<template>
  <skeleton1 :image="{width:'170px',height:'170px'}" :loading="true">
    <header>
      <div>
        <el-image class="cover" :src="profile.avatarUrl" alt="img" />
      </div>
      <div class="content">
        <div class="A"><h2>{{ profile.nickname + '喜欢的音乐' }}</h2></div>
        <div class="B">
          <el-link type="info">{{ profile.nickname }}</el-link>
        </div>
        <div class="C">
          <el-button
            v-for="(button, bIndex) in buttons"
            :key="bIndex"
            size="medium"
            :type="button.type"
            round
            :icon="button.icon"
            :disabled="button.disabled"
            @click="button.handle"
          >
            {{ button.name }}
          </el-button>
        </div>
      </div>
    </header>
  </skeleton1>
  <SongList />
</template>

<script setup>
import SongList from '@/views/SongDetail/pages/SongList.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { CaretRight, FolderAdd, Share, Upload } from '@element-plus/icons-vue'
import { getLikeMusic, getSongDetail } from '@/network/song.js'
import eventbus from '@/utlis/eventbus.js'

const store = useStore()
const profile = computed(() => store.state.login.profile)

const buttons = ref([
  { type: 'danger', icon: CaretRight, disabled: false, name: '播放全部', handle: () => play() },
  { type: 'default', icon: FolderAdd, disabled: true, name: '收藏全部' },
  { type: 'default', icon: Share, disabled: true, name: '分享' },
  { type: 'default', icon: Upload, disabled: true, name: 'VIP下载' }
])

const play = () => {
  store.commit('setSongDetail', store.state.songDetail.songArray[0])
  store.commit('play', 0)
  eventbus.emit('playMusic')
}

onMounted(async() => {
  getLikeMusic(profile.value.userId).then(res => {
    getSongDetail(res.data.ids.join()).then(musicData => {
      store.commit('setSongMusic', musicData.data.songs)
    })
  })
})

</script>

<style scoped lang="less">
header{
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  .cover{
    display: block;
    height: 170px;
    width: 170px;
    border-radius: 10px;
  }
  .content{
    margin-left: 20px;
    .A{
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      h2{
        display: inline;
        margin-left: 10px;
      }
    }
    .B{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      span{
        font-size: 14px;
        color: #748aad;
      }
      a{
        margin: 0 7px;
        text-decoration:none
      }
    }
  }
}
</style>
