<template>
  <section>
    <el-input
      v-model="value"
      :clearable="true"
      type="textarea"
      placeholder="请输入内容"
      maxlength="140"
      show-word-limit
    />
    <div class="button">
      <el-button type="success" round disabled>评论</el-button>
    </div>
    <el-descriptions title="精彩评论" direction="vertical" :column="3">
      <div v-for="item in comment" :key="item.commentId">
        <el-descriptions-item :width="60">
          <el-avatar :size="50" :src="item.user.avatarUrl" />
        </el-descriptions-item>
        <el-descriptions-item>
          <div class="left">
            <p>
              <span class="user">
                {{ item.user.nickname }} ( {{ $formatTime(item.time) }} ):
              </span>
              {{ item.content }}
            </p>
          </div>
        </el-descriptions-item>
        <el-descriptions-item align="right">
          <div class="right">
            <i class="iconfont icon-zan" />
            <span class="good">{{ item.likedCount }}</span>
            <span class="solid">|</span>
            <i class="iconfont icon-fenxiang1" />
            <span class="solid">|</span>
            <i class="iconfont icon-pinglun" />
          </div>
        </el-descriptions-item>
      </div>
    </el-descriptions>
  </section>
  <div class="pages">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @current-change="change"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  comment: {
    type: Array
  }
})
import { ref } from 'vue'

const value = ref()

const emit = defineEmits(['pageChange'])
const change = value => {
  emit('pageChange', value)
}
</script>

<style scoped lang="less">
  .pages {
    display: flex;
    justify-content: center;
  }

  section {
    .button {
      margin-top: 5px;
      text-align: right;
    }

    &:deep (.el-textarea__inner) {
      min-height: 80px !important;
    }

    .left {
      height: 70px;
      font-size: 12px;
      /*display: flex;*/
      /*justify-content: flex-start;*/
      /*align-items: center;*/

      .user {
        color: #85b9e6;
        font-size: 12px;
      }

      .time {
        color: #949191;
        font-size: 12px;
      }
      .comment {
        margin-left: 10px;
        display: flex;
        /*align-items: center;*/

        .user {
          color: #85b9e6;
          font-size: 12px;
        }

        .time {
          color: #949191;
          font-size: 12px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .good {
        font-size: 12px;
      }

      .solid {
        padding: 0 5px;
        color: silver;
      }

      .iconfont {
        font-size: 20px;
        margin: 0 8px;
      }
    }
  }
</style>
