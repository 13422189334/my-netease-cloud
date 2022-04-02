<template>
  <section>
    <header>
      <div>搜索历史</div>
      <div class="history">
        <el-tag
          v-for="(item,index) in keywordList"
          :key="index"
          type="info"
          size="mini"
          closable
          class="tags"
          @close="close(index)"
          @click="search(item)"
        >{{ item }}</el-tag>
      </div>
    </header>
    <el-divider content-position="left">热搜榜</el-divider>
    <main>
      <nav v-for="(item,index) in hotSearch" :key="index" class="hotSearch" @click="search(item.searchWord)">
        <div class="index" :class="{active:index < 3}">{{ index + 1 }}</div>
        <div class="content">
          <div class="title">{{ item.searchWord }}</div>
          <div class="label">{{ item.content }}</div>
        </div>
      </nav>
    </main>
  </section>
</template>

<script setup>
import { getHotSearch } from '@/network/search.js'
import { ref, computed, onMounted } from 'vue'
import eventBus from '@/utlis/eventbus.js'
import { useStore } from 'vuex'
const store = useStore()

const hotSearch = ref([]) // 热搜曲目
const keywordList = computed(() => store.state.songDetail.keywordList) // 搜索关键字列表

/**
 * 初始化查询热搜曲目
 * */
onMounted(() => {
  getHotSearch().then(res => {
    hotSearch.value = res?.data.data
  })
})

/**
 * 搜索方法，调用事件总线统一查询方法
 * */
const search = keyword => {
  eventBus.emit('hotSearch', keyword)
}

/**
 * 根据角标移除搜索记录
 * */
const close = index => {
  store.commit('removeKeyword', index)
}
</script>

<style scoped lang="less">
.active{
  color: red;
}
section{
  height: 350px;
  overflow-y: auto;
  header{
    .history{
      margin-top: 5px;
      padding-right: 5px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .tags{
        border-radius: 20px;
        margin-left: 5px;
        margin-top: 5px;
      }
    }
  }
  main{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .hotSearch {
      width: 100%;
      height: 50px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background: #f1ecec;
      }
      .index {
        width: 20px;
        text-align: center;
        font-weight: 900;
      }
      .content {
        width: 90%;
        .title {
          font-weight: 700;
          .image {
            transform: scale(0.3);
          }
        }
        .label {
          width: 95%;
          color: silver;
          font-size: 12px;
          margin-top: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
