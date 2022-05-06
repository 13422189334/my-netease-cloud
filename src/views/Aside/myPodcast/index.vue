<template>
  <h4>收藏的播客({{ radio.length }})</h4>
  <el-skeleton
    :count="8"
    :loading="load"
    animated
  >
    <template #template>
      <div class="skeleton-item-box">
        <el-skeleton-item variant="image" class="skeleton-item-image" />
        <el-skeleton-item variant="p" class="skeleton-item-p"/>
      </div>
    </template>
    <template #default>
      <div v-if="radio.length">
        <navContent
          v-for="item in radio"
          :key="item.id"
          :image="item.picUrl"
          :name="item.name"
          :label="item.dj.nickname"
          :album="'声音 ' + item.programCount"
          @click="toDetail(item.id)"
        />
      </div>
      <div v-else>
        <el-empty :image-size="300"></el-empty>
      </div>
    </template>

  </el-skeleton>
</template>

<script setup>
import navContent from '@/views/Aside/myCollect/components/navContent.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserRadio } from '@/network/radio.js'

const router = useRouter()
const radio = ref([])
const load = ref(true)
onMounted(() => {
  getUserRadio().then(res => {
    radio.value = res.data.djRadios
    load.value = false
  })
})

const toDetail = id => {
  router.push(`/detail/podcast?id=${id}`)
}
</script>

<style scoped lang="less">
 .skeleton-item-box {
   margin-top: 5px;
   height: 80px;
   display: flex;
   flex-direction: row;
   align-items: center;

   .skeleton-item-image {
     width: 80px;
     height: 80px;
     border-radius: 10px;
   }
   .skeleton-item-p {
     margin-left: 20px;
     width: 80%;
   }
 }
</style>
