<template>
  <div class="top">
    <div>
      <el-image class="cover" :src="singerDetail.artist.cover" alt="img" />
    </div>
    <div class="content">
      <div class="A"><h2>{{ singerDetail.artist.name }}</h2></div>
      <div class="B">
        <el-link type="info">{{ singerDetail.identify?.imageDesc }}</el-link>
      </div>
      <div class="C">
        <el-button size="small" round :icon="FolderAdd" disabled>收藏</el-button>
        <el-button size="small" round :icon="User" disabled>个人主页</el-button>
      </div>
      <div class="D">
        <p>
          <span
            v-for="item in singerDetail.secondaryExpertIdentiy"
            :key="item.expertIdentiyId"
            class="mgl-25"
          >
            {{ item.expertIdentiyName }} : {{ item.expertIdentiyCount }}</span>
        </p>
        <el-collapse>
          <el-collapse-item title="点击展开更多">
            {{ singerDetail.artist.briefDesc }}
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>

</template>

<script setup>
import { defineProps } from 'vue'
import { FolderAdd, User } from '@element-plus/icons-vue'
defineProps({
  singerDetail: {
    type: Object
  }
})
</script>

<style scoped lang="less">
  .mgl-25 {
    margin-right: 25px;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: 100%;

    .cover {
      display: block;
      height: 200px;
      width: 210px;
      border-radius: 10px;
    }

    .content {
      margin-left: 20px;

      .A {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;

        h2 {
          display: inline;
          margin-left: 10px;
        }
      }

      .B {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;

        span {
          font-size: 14px;
          color: #748aad;
        }

        a {
          margin: 0 7px;
          text-decoration: none
        }
      }

      .D {
        margin-left: 5px;

        .tags {
          color: #85b9c8;
        }

        p {
          font-size: 12px;
          color: #656161;
        }
      }

    }
  }
</style>
