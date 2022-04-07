<template>
  <titleTop @click="toNewMusic">最新音乐</titleTop>
  <section ref="dom">
    <el-skeleton :loading="!Boolean(newMusicData.length)" animated>
      <template #template>
        <div class="newMusic">
          <div v-for="item in 12" :key="item" class="item">
            <div class="left">
              <el-skeleton-item class="left" variant="image" />
            </div>
            <div class="right">
              <el-skeleton-item variant="p" class="title" />
              <el-skeleton-item variant="p" class="tags" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="newMusic">
          <nav v-for="item in newMusicData" :key="item.id" class="item" @dblclick="playMusic(item)">
            <div class="left" @click="playMusic(item)">
              <el-image :src="item.album.picUrl" class="image" />
              <img class="icon" src="@/assets/image/play.png" alt="">
            </div>
            <div class="right">
              <div class="title">{{ item.name }}</div>
              <div class="tags">
                <el-tag v-if="item.mvid" class="mr-10" size="mini" type="danger" @click="toMv(item.mvid)">MV</el-tag>
                <span v-for="i in item.artists.map(v => v.name)" :key="i.id" class="hover">
                  {{ i }}
                </span>
              </div>
            </div>
          </nav>
        </div>
      </template>
    </el-skeleton>
  </section>
</template>

<script setup>
import { getNewMusic } from '@/network/song.js'
import { dataLazyLoading } from '@/utlis/dataLazyLoading.js'
import { formatNewMusic } from '@/utlis/formatData.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import eventbus from '@/utlis/eventbus.js'

const router = useRouter()
const store = useStore()

const newMusicData = ref([])
const dom = ref('')
onMounted(async() => {
  await dataLazyLoading(dom)
  const res = await getNewMusic()
  newMusicData.value = res.data.data.slice(0, 12)
})

const toNewMusic = () => {
  router.push('/findMusic/newMusic')
}

const toMv = id => {
  router.push(`/videoDetail?id=${id}`)
}
/**
 * 播放歌曲的事件总线
 * */
const playMusic = item => {
  store.commit('setSongDetail', ...formatNewMusic([item]))
  eventbus.emit('playMusic')
}
</script>

<style scoped lang="less">
.mr-10 {
  margin-right: 10px;
}
.hover:hover{
  color: rgba(49, 48, 48, 0.8);
}
.hover:after {
  content: ' / ';
}
.hover:nth-last-child(1):after {
  content: '';
}
.newMusic{
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item{
    width: 33%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    &:hover{
      background: #ededed;
    }
    .left{
      width: 50px;
      height: 50px;
      position: relative;
      .image{
        border-radius: 10px;
      }
      .icon{
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .right{
      width: 80%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .tags{
        color: silver;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .title{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

&:deep (.item){
  width: 33%;
}
&:deep (.left){
  width: 50px;
  height: 50px;
}
</style>
