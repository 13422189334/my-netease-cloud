<template>
  <skeleton1
    :count="10"
    :loading="songMenu.length"
    :image="{ width: '70px', height: '70px' }"
    :row="1"
    :margin="{ width: '95%', marginLeft: '10px' }"
  >
    <div v-for="item in songMenu" :key="item.id" class="item" @click="toDetail(item.id)">
      <div class="left">
        <el-avatar shape="square" :size="70" :src="item.picUrl" />
        <span class="name">{{ item.name }}</span>
      </div>
      <div>{{ item.num }}首</div>
      <div class="right">
        {{ item.label }}
      </div>
    </div>
  </skeleton1>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSearchResult } from '@/network/search.js'
import { formatSongMenuData } from '@/utlis/formatData.js'

const songMenu = ref([])

const store = useStore()
const keywords = computed(() => store.state.songDetail.keywords)

onMounted(() => {
  getSearchResult({ keywords: keywords.value, type: 1000 }).then(res => {
    songMenu.value = formatSongMenuData(res.data.result.playlists)
  })
})

const router = useRouter()
const toDetail = id => {
  store.dispatch('getSongList', id)
  router.push('/detail/song')
}
</script>

<style scoped lang="less">
  .item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    color: #656161;

    &:hover {
      background: #ededed;
    }

    .left {
      width: 50%;
      display: flex;
      align-items: center;
    }

    .name {
      padding-left: 10px;
    }

    .right {
      width: 20%;

      i {
        font-size: 30px;
        color: red;
      }
    }
  }
</style>
