<template>
  <el-skeleton :loading="!Boolean(loading)" :count="count" :animated="true" class="skeleton">
    <template #template>
      <div class="skeleton-item">
        <el-skeleton-item variant="image" :style="size" />
        <el-skeleton-item variant="p" :style="{width:size.width}" style="margin: 10px 0;" />
        <br>
        <el-skeleton-item v-if="show" variant="p" :style="{width:size.width}" />
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
    type: Number,
    default: 0
  },
  size: {
    type: Object,
    default: () => ({
      width: '180px',
      height: '180px'
    })
  },
  show: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="less">
.skeleton {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &-item {
    margin-top: 10px;
  }
}
</style>
