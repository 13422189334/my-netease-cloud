<template>
  <h3 class="h3">动态</h3>
  <el-button type="danger" size="medium" round :icon="Edit" disabled="">发动态</el-button>
  <el-divider content-position="right">网易云动态</el-divider>
  <skeleton1 :count="8" :loading="event.length" :image="{width:'90px',height:'90px'}" :margin="{ width: '90%' }" :row="1">
    <el-card v-for="item in event" :key="item.id" shadow="hover" style="margin-top: 15px;">
      <section class="box-card">
        <aside>
          <el-avatar :size="50" :src="item.user.avatarUrl" />
        </aside>
        <main>
          <div>
            <el-link type="primary">{{ item.user.nickname }}</el-link>
            <span class="time">分享单曲</span></div>
          <div class="time" style="margin: 5px 0;">{{ $formatTime(item.showTime) }}</div>
          <div class="text">{{ JSON.parse(item.json).msg }}</div>
        </main>
      </section>
    </el-card>
  </skeleton1>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { getFriend } from '@/network/user.js'

const event = ref([])
onMounted(() => {
  getFriend().then(res => {
    event.value = res.data.event
  })
})
</script>

<style scoped lang="less">
  .h3 {
    display: inline-block;
    margin-right: 10px;
  }

  .box-card {
    display: flex;
    justify-content: flex-start;

    main {
      margin-left: 10px;

      .time {
        font-size: 14px;
        color: #bebbbb;
      }

      .text {
        color: rgb(101, 97, 97);
      }
    }
  }
</style>
