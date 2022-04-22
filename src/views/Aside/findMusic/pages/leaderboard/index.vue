<template>
  <skeleton1 :count="4" :loading="topList.length" :margin="{ width: '95%', marginLeft: '5px' }">
    <section class="section">
      <h2>官方榜</h2>
      <main v-for="item in topList.slice(0,4)" :key="item.id" class="box-card" @click="toDetail(item.id)">
        <div v-if="item.tracks.length" class="cover">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="top">
          <div v-for="(value,index) in item.tracks" :key="index" class="top-item">
            <span>
              <span class="index">{{ index + 1 }}</span>{{ value.first }}
            </span>
            <span class="right">{{ value.second }}</span>
          </div>
        </div>
      </main>
      <el-divider class="divider" content-position="left"><h2>全球榜</h2></el-divider>
      <div v-for="item in topList.slice(4)" :key="item.id">
        <div class="coverBottom">
          <img class="img-topList" :src="item.coverImgUrl" alt="" @click="toDetail(item.id)">
        </div>
      </div>
    </section>
  </skeleton1>
</template>
<script setup>
import { getTopList } from '@/network/topList.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const topList = ref([])
onMounted(() => {
  getTopList().then(res => {
    topList.value = res.data.list
  })
})

const toDetail = id => {
  store.dispatch('getSongList', id)
  router.push('/songDetail')
}
</script>

<style lang="less" scoped>
  .coverBottom {
    width: 100%;
    position: relative;

    .img-topList {
      width: 200px;
      margin-right: 35px;
      margin-top: 20px;
      height: 200px;
      float: left;
      border-radius: 10px;
      display: block;

      &:hover {
        transition: all 1s;
        transform: translate3d(0, -10px, 0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, .8);
      }
    }
  }

  .section {
    .box-card {
      display: flex;
      justify-content: flex-start;
      margin-top: 15px;

      .cover {
        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
        }

        &:hover img {
          transition: all 1s;
          transform: rotate(360deg);
        }
      }

      .top {
        width: 100%;
        height: 150px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .top-item {
          height: 33.3%;
          width: 100%;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            background: #f1ecec;
          }

          .index {
            margin-right: 20px;
            color: red;
            font-weight: 900;
          }

          .right {
            color: #656161;
          }
        }
      }
    }
  }

  .divider {
    margin: 44px 0 24px 0;
  }
</style>
