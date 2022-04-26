<template>
  <el-dialog
    v-model="isShow"
    center
    append-to-body
    title="新建歌单"
    width="30%"
  >
    <template #default>
      <el-input v-model="title" placeholder="请输入新歌单标题" />
      <el-checkbox v-model="checked" label="设置为隐私歌单" />
    </template>
    <template #footer>
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
import { createSongList } from '@/network/topList.js'

defineProps({
  id: {
    type: Number,
    default: 7217824552
  }
})
const emit = defineEmits(['create'])
const isShow = ref(false)
const title = ref('')
const checked = ref(false)
const confirm = () => {
  if (title.value) {
    isShow.value = false
    createSongList(title.value, checked.value ? 10 : '').then(res => {
      if (res.data.code === 200) {
        ElMessage.success({
          type: 'success',
          message: '新建歌单成功'
        })
        emit('create')
      }
    })
  } else {
    ElMessage.warning({
      type: 'warning',
      message: '歌单名不能为空'
    })
  }
}

defineExpose({
  isShow
})
</script>
