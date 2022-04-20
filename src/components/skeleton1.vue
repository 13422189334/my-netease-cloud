<template>
  <el-skeleton :loading="!Boolean(loading)" :count="count" :animated="true" class="skeleton">
    <template #template>
      <el-skeleton-item v-if="show" variant="button" class="skeleton-item-button" />
      <div :style="{width: width.width,marginTop:top}" class="skeleton-item-box">
        <el-skeleton-item variant="image" :style="image" />
        <div :style="margin" class="skeleton-item-div">
          <el-skeleton-item v-for="item in row" :key="item" :variant="type" />
        </div>
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </el-skeleton>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  count: {
    type: Number,
    default: 1
  },
  loading: {
    type: [Number, String, Boolean],
    default: 0
  },
  image: {
    type: Object,
    default: () => ({
      width: '150px',
      height: '150px'
    })
  },
  margin: {
    type: Object,
    default: () => ({
      width: '990px',
      marginLeft: '50px'
    })
  },
  width: {
    type: Object,
    default: () => ({
      width: '100%'
    })
  },
  type: {
    type: String,
    default: 'h1'
  },
  row: {
    type: Number,
    default: 3
  },
  top: {
    type: String,
    default: '15px'
  },
  show: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="less" scoped>
  .skeleton {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    &-item-button {
      width: 50px;
      height: 50px;
      margin-top: 10px;
      border-radius: 50%;
    }

    &-item-box {
      display: flex;
      justify-content: flex-start;
    }

    &-item-div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }
</style>
