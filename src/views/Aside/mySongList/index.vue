<template>
  <skeleton :loading="profile?.avatarUrl.length">
    <header>
      <div><el-image class="cover" :src="profile?.avatarUrl" alt="img" /></div>
      <div class="content">
        <div class="A">
          <el-tag type="danger" size="mini">歌单</el-tag>
          <h2>我的歌单</h2>
        </div>
        <div class="B">
          <el-link type="info">{{ profile?.nickname }}</el-link>
        </div>
        <div class="C">
          <el-button size="medium" type="danger" round :icon="Edit" @click="createSongList">新建歌单</el-button>
          <el-button v-if="!canDel" size="medium" round :icon="SetUp" @click="setup">管理歌单</el-button>
          <el-button v-else size="medium" round :icon="SetUp" @click="setup">取消管理</el-button>
          <el-button :disabled="isDisabled" size="medium" round :icon="Delete" @click="detail">删除歌单</el-button>
          <el-button :disabled="true" size="medium" round :icon="Share">分享歌单</el-button>
        </div>
      </div>
    </header>
  </skeleton>
  <el-divider><h2>我的歌单列表</h2></el-divider>
  <el-checkbox v-model="checkAll">全选</el-checkbox>
  <br>
  <footer>
    <div v-for="item in mySongMenu" :key="item.id" class="box">
      <el-checkbox v-model="item.checkbox" />
      <el-image :src="item.coverImgUrl" class="image-cover" @click="toDetail(item)"/>
      <div class="label">{{ item.name }}</div>
    </div>
  </footer>
  <!--  对话框-->
  <myDialog ref="dialog" @create="create" />
</template>

<script setup>

import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { detailSongList } from '@/network/topList.js'
import { getUserSongList } from '@/network/user.js'
import myDialog from './components/myDialog.vue'
import { Edit, Delete, Share, SetUp } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const profile = computed(() => store.state.login.profile) // 个人信息
const mySongMenu = ref([]) // 歌单

/**
 * 查询用户歌单
 * */
onMounted(() => {
  const params = {
    uid: profile.value.userId,
    timestamp: Date.now()
  }
  getUserSongList(params).then(res => {
    const playList = res.data.playlist || []
    mySongMenu.value = playList.map(e => ({ ...e, checkbox: false }))
  })
})


const toDetail = item => {
  if (item.name === '我喜欢的音乐') {
    router.push('/likeMusic')
  } else {
    store.dispatch('getSongList', item.id)
    router.push('/songDetail')
  }
}
// 新建歌单
const dialog = ref()
const createSongList = () => {
  dialog.value.isShow = true
}



/**
 * 管理歌单，开启 删除歌单 等相关操作
 * */
const canDel = ref(false)
const setup = () => {
  canDel.value = !canDel.value
}

const isDisabled = computed(() => mySongMenu.value.every(item => !item?.checkbox)) // 是否有选中的歌单可以用于删除

// 删除歌单
// const isShow = ref(false)
const checkAll = computed({
  get() {
    return mySongMenu.value.length && mySongMenu.value.every(item => item?.checkbox)
  },
  set(newValue) {
    mySongMenu.value.forEach(item => item.checkbox = newValue)
  }
})

const is = ref(false)
const detail = () => {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
  }).then(() => {
    const arr = []
    mySongMenu.value.forEach(item => {
      if (item?.checkbox) {
        arr.push(item.id)
        console.log(item.id)
      }
    })
    detailSongList(arr.join(',')).then(res => {
      if (res.data.code === 200) {
        ElMessage({
          type: 'success', message: '删除成功!'
        })
        create()
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info', message: '已取消删除'
    })
  })
}
</script>

<style scoped lang="less">
footer{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .box{
    width:  18%;
    height: 320px;
    text-align: center;
    margin: 10px;
    .image-cover{
      width: 100%;
      height: 220px;
      border-radius: 10px;
      &:hover{
        transition: all 1s;
        transform: translate3d(0,-5px,0);
        box-shadow: 1px 1px 20px;
      }
    }
    .label{
      width: 100%;
      height: 30px;
      text-align: center;
      margin-top: 5px;
    }
  }
}

header{
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  .cover{
    display: block;
    height: 150px;
    width: 150px;
    border-radius: 10px;
    .info{
      margin-left: 5px;
    }
  }
  .content{
    margin-left: 20px;
    .A{
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      h2{
        display: inline;
        margin-left: 10px;
      }
    }
    .B{
      width: 100%;
      height: 50px;
      display: flex;
      margin: 10px 0;
      align-items: center;
      span{
        font-size: 14px;
        color: #748aad;
      }
      a{
        margin: 0 7px;
        text-decoration:none
      }
    }
  }
}
</style>
