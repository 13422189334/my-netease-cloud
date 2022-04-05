<template>
  <skeleton1 :margin="{width: '900px',marginLeft:'20px'}" :loading="songList.boolean" :image="{width:'220px',height:'220px'}" :row="5">
    <header>
      <div>
        <el-image class="cover" :src="songList?.coverImgUrl" alt="img" />
      </div>
      <div class="content">
        <div class="A"><el-tag type="danger" size="mini">歌单</el-tag><h2>{{ songList.name }}</h2></div>
        <div class="B">
          <el-avatar v-if="songList.creator.avatarUrl" class="img" :size="30" :src="songList?.creator?.avatarUrl " />
          <a href="">{{ songList?.creator.nickname }}</a>
          <span style="margin-left: 10px;">{{ $formatTime(songList.createTime) }} 创建</span>
        </div>
        <div class="C">
          <el-button size="medium" type="danger"  round :icon="CaretRight" @click="playAll">播放全部</el-button>
          <el-button size="medium" disabled round :icon="FolderAdd" @click="like">收藏全部({{ $formatNumber(songListData?.bookedCount) || '888' }})</el-button>
          <el-button size="medium" disabled round :icon="Share">分享({{ songListData?.shareCount || '999' }})</el-button>
          <el-button size="medium" disabled round :icon="Upload">VIP下载</el-button>
        </div>
        <div class="D">
          <p>标签: <span v-for="(item,index) in songList.tags" :key="index" class="tags">{{ item }} / </span></p>
          <p>歌曲:{{ songList?.trackCount }} 播放: {{ $formatNumber(songList?.playCount) }}</p>
          <p v-if="songList.description ? songList.description.length < 80 : '' ">{{ songList.description }}</p>
          <el-collapse v-else>
            <el-collapse-item title="点击展开更多">
              <p>{{ songList?.description }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </header>
  </skeleton1>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { CaretRight, FolderAdd, Upload, Share } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import eventbus from '@/utlis/eventbus.js'
import { debounce } from '@/utlis/debounce.js'
import { throttle } from '@/utlis/throttle.js'

const store = useStore()
const songList = computed(() => store.state.songDetail.songList)
const songListData = computed(() => store.state.songDetail.commentData)

const like = debounce(() => {
  store.state.songDetail.commentID
  ElMessage({
    message: '收藏成功!',
    center: true,
    type: 'success'
  })
})

const playAll = throttle(() => {
  eventbus.emit('playAll')
}, 100)
</script>

<style scoped lang="less">
header{
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  .cover{
    display: block;
    height: 220px;
    width: 220px;
    border-radius: 10px;
  }
  .content{
    margin-left: 20px;
    .A{
      width: 100%;
      height: 40px;
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
    .D{
      margin-left: 5px;
      .tags{
        color: #85b9c8;
      }
      p{
        font-size: 12px;
        color: #656161;
      }
    }

  }
}
</style>
