<template>
  <section class="tags-box">
    <span
      v-for="(item,index) in tabs"
      :key="index"
      :class="{ active: current === item.name }"
      @click="change(item)"
    >
      {{ item.name }}
    </span>
  </section>

</template>

<script setup>
import { ref, defineEmits } from 'vue'

const current = ref('全部')
const tabs = ref([
  { name: '全部', area: 'ALL', type: 0 },
  { name: '华语', area: 'ZH', type: 7 },
  { name: '欧美', area: 'EA', type: 96 },
  { name: '韩国', area: 'KR', type: 16 },
  { name: '日本', area: 'JP', type: 8 }
])

const emit = defineEmits(['change'])
const change = value => {
  current.value = value.name
  emit('change', value)
}
</script>

<style scoped lang="less">
  .tags-box {
    display: flex;
    justify-content: flex-start;
    color: #656161;

    & span:not(:nth-child(1)) {
      margin-left: 20px;
    }
  }

  .active {
    font-weight: 900;
    color: black;
  }

</style>
