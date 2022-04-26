<template>
  <skeleton :loading="profile?.avatarUrl.length">
    <div class="info-box">
      <div>
        <el-image class="cover" :src="profile?.avatarUrl" alt="img" />
      </div>
      <div class="content">
        <div class="A">
          <el-tag type="danger" size="mini">歌单</el-tag>
          <h2>我的歌单</h2>
        </div>
        <div class="B">
          <el-link type="info">{{ profile?.nickname }}</el-link>
        </div>
        <div class="C">
          <el-button
            v-for="(menu, mIndex) in menus"
            :key="mIndex"
            size="medium"
            :type="menu.type"
            round
            :icon="menu.icon"
            :disabled="menu.disabled"
            @click="menu.handle"
          >
            {{ menu.name }}
          </el-button>
        </div>
      </div>
    </div>
  </skeleton>
  <el-divider><h2>我的歌单列表</h2></el-divider>
  <el-checkbox v-if="canDel" v-model="checkAll">全选</el-checkbox>
  <div class="song-box">
    <div v-for="item in songArray" :key="item.id" class="box">
      <el-image :src="item.coverImgUrl" class="image-cover" @click="toDetail(item)" />
      <div class="label">{{ item.name }}</div>
      <el-checkbox v-if="canDel" v-model="item.checkbox" />
    </div>
  </div>
  <!--  对话框-->
  <createSongDialog ref="dialog" @create="getUserSongs" />
</template>

<script setup>
import createSongDialog from './components/createSongDialog.vue'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Delete, Share, SetUp } from '@element-plus/icons-vue'
import { detailSongList } from '@/network/topList.js'
import { getUserSongList } from '@/network/user.js'

const store = useStore()
const router = useRouter()
const profile = computed(() => store.state.login.profile) // 个人信息
const songArray = ref([]) // 歌单

/**
 * 按钮组，控制按钮显示隐藏及可操作性
 * */
const menus = computed(() => {
  const hasCheck = songArray.value.some(item => item?.checkbox === true)
  return [
    { type: 'danger', disabled: false, icon: Edit, handle: () => openCreatedDialog(), name: '新建歌单' },
    !canDel.value && { type: 'default', disabled: false, icon: SetUp, handle: () => setup(), name: '管理歌单' },
    canDel.value && { type: 'default', disabled: false, icon: SetUp, handle: () => setup(), name: '取消管理' },
    canDel.value && { type: 'default', disabled: !hasCheck, icon: Delete, handle: () => del(), name: '删除歌单' },
    {
      type: 'default', disabled: true, icon: Share, handle: () => {
      }, name: '分享歌单'
    }
  ].filter(Boolean)
})

/**
 * 查询用户歌单
 * */
const getUserSongs = () => {
  const params = {
    uid: profile.value.userId,
    timestamp: Date.now()
  }
  getUserSongList(params).then(res => {
    const playList = res.data.playlist || []
    songArray.value = playList.map(e => ({ ...e, checkbox: false }))
  })
}

onMounted(() => {
  getUserSongs()
})

/**
 * 跳转详情
 * */
const toDetail = item => {
  if (item.name === profile.value.nickname + '喜欢的音乐') {
    router.push('/myLike')
  } else {
    store.dispatch('getSongList', item.id)
    router.push('/songDetail')
  }
}

/**
 * 新建歌单
 * */
const dialog = ref()
const openCreatedDialog = () => {
  dialog.value.isShow = true
}

/**
 * 管理歌单，开启 删除歌单 等相关操作
 * */
const canDel = ref(false)
const setup = () => {
  canDel.value = !canDel.value
}

const checkAll = computed({
  get: () => songArray.value.length && songArray.value.every(item => item?.checkbox), // 是否有选中的歌单可以用于删除
  set: (newValue) => {
    songArray.value = songArray.value.map(item => ({ ...item, checkbox: newValue }))
  }
})

const del = () => {
  ElMessageBox.confirm('此操作将永久删除该歌单, 是否继续?', '提示', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
  }).then(() => {
    const arr = []
    songArray.value.forEach(item => {
      if (item?.checkbox) {
        arr.push(item.id)
      }
    })
    detailSongList(arr.join(',')).then(res => {
      if (res.data.code === 200) {
        ElMessage({ type: 'success', message: '删除成功!' })
        getUserSongs()
        setup()
      }
    })
  }).catch(() => {
    ElMessage({ type: 'info', message: '已取消删除' })
  })
}
</script>

<style scoped lang="less">
  .song-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .box {
      width: 18%;
      height: 320px;
      text-align: center;
      margin: 10px;

      .image-cover {
        width: 100%;
        height: 220px;
        border-radius: 10px;

        &:hover {
          transition: all 1s;
          transform: translate3d(0, -5px, 0);
          box-shadow: 1px 1px 20px;
        }
      }

      .label {
        width: 100%;
        height: 30px;
        text-align: center;
        margin-top: 5px;
      }
    }
  }

  .info-box {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: 100%;

    .cover {
      display: block;
      height: 150px;
      width: 150px;
      border-radius: 10px;

      .info {
        margin-left: 5px;
      }
    }

    .content {
      margin-left: 20px;

      .A {
        width: 100%;
        height: 30px;
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
        margin: 10px 0;
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
    }
  }
</style>
