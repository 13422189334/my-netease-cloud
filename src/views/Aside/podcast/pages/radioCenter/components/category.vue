<template>
  <el-card shadow="always" class="category-card">
    <template #header>
      <span>分类列表</span>
    </template>
    <el-skeleton :loading="!Boolean(category.length)" :count="18" :animated="true" class="category">
      <template #template>
        <div class="item">
          <el-skeleton-item variant="image" class="skeleton-image" />
          <el-skeleton-item variant="p" class="skeleton-p" />
        </div>
      </template>
      <template #default>
        <div class="category">
          <div v-for="item in category" :key="item.id" class="item" @click="toCategoryList(item.id,item.name)">
            <el-image :src="item.pic56x56Url" />
            <div class="tags">{{ item.name }}</div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategory } from '@/network/radio.js'
import { useRouter } from 'vue-router'

/**
 * 分类
 * */
const category = ref([])
onMounted(async() => {
  const res = await getCategory()
  category.value = res.data.categories
})
const router = useRouter()
const toCategoryList = (id, name) => {
  router.push(`/detail/category?id=${id}&name=${name}`)
}
</script>

<style scoped lang="less">
  .category-card {
    height: 170px;
  }
  .category{
    display: flex;
    justify-content: space-between;
    height: 70px;
    text-align: center;
    .tags {
      font-size: 12px;
      color: silver;
      cursor: pointer;
    }
    .item, .skeleton-image {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    .skeleton-p {
      width: 50px;
      margin-top: 5px;
    }
  }
</style>
