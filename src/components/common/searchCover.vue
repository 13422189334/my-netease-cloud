<template>
  <section>
    <div v-for="item in data" :key="item.id" class="item" @click="toDetail(item.id)">
      <div class="left">
        <el-avatar shape="square" :size="50" :src="item.picUrl" />
        <span class="name">
          {{ item.name }}
          <span v-if="item.alias?.length">-</span>
          <template v-for="v in item.alias">{{ v }}</template>
        </span>
      </div>
      <div v-if="item.artist?.name" style="color: #656161;">{{ item.artist.name }}</div>
      <div v-if="item.accountId" class="right">
        <el-icon>
          <User />
        </el-icon>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { User } from '@element-plus/icons-vue'

defineProps({
  data: {
    type: Array
  }
})

const emit = defineEmits(['toDetail'])

const toDetail = id => {
  emit('toDetail', id)
}

</script>

<style scoped lang="less">
  .item {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    &:hover {
      background: #ededed;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .name {
      padding-left: 10px;
    }

    .right {
      padding-right: 20px;

      i {
        font-size: 30px;
        color: red;
      }
    }
  }
</style>
