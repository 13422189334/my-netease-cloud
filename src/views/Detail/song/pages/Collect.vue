<template>
  <section class="collect">
    <main v-for="item in collect" :key="item.userId">
      <el-avatar :size="100" :src="item.avatarUrl" />
      <div class="user">
        <p>{{ item.nickname }}</p>
        <p class="label">{{ item.signature }}</p>
      </div>
    </main>
  </section>
  <br>
  <div class="pages">
    <el-pagination
      v-if="collect.length"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="change"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { getSongListCollect } from '@/network/songList.js'

const store = useStore()
const id = computed(() => store.state.songDetail.commentID)

const collect = ref([])
const params = reactive({
  id: id.value,
  limit: 15,
  offset: 0
})
const total = ref()

/**
   * 获取收藏信息
   */
const getData = () => {
  getSongListCollect(params).then(res => {
    collect.value = res.data.subscribers
    total.value = res.data.total
  })
}

onMounted(async() => {
  getData()
})

const change = value => {
  params.offset = value
  getData()
}
</script>

<style scoped lang="less">
  .collect {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    main {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 33%;
      height: 100%;
      margin: 10px 0;

      .user {
        margin-left: 15px;

        .label {
          color: silver;
          font-size: 13px;
        }
      }
    }
  }

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
