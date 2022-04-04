<template>
  <header>
    <el-row :gutter="20">
      <!--  logo  -->
      <el-col :span="boolean ? 1 : 3">
        <img v-if="!boolean" class="logo" src="../../assets/image/logo-top2.png" alt="logo">
        <svg v-else class="svg" aria-hidden="true">
          <use xlink:href="#icon-wangyiyunyinle" />
        </svg>
      </el-col>
      <el-col :span="6">
        <!--  搜索弹层  -->
        <el-popover
          placement="bottom"
          :width="320"
          trigger="click"
        >
          <template #reference>
            <el-input
              v-model.trim="keyword"
              placeholder="请输入内容"
              clearable
              @keydown.enter="search"
            >
              <template #append>
                <el-button :icon="Search" @click="search" />
              </template>
            </el-input>
          </template>
          <!-- 热搜榜 - 结果 -->
          <searchPopup :keyword="keyword" />
        </el-popover>
      </el-col>
      <el-col :span="boolean ? 13 : 11" class="topContent">
        <!--  歌词  -->
        <span class="lyric">{{ lyric || $store.state.songDetail.songDetail.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-dropdown v-if="profile">
          <span class="el-dropdown-link" @click="userLogin">
            <el-avatar class="avatar" :size="40" :src="profile.avatarUrl"></el-avatar>
            <span class="nickname">{{profile.nickname}}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span v-else class="el-dropdown-link" @click="userLogin">
          <el-avatar
            class="avatar"
            :size="40"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span class="nickname">请登录</span>
        </span>
      </el-col>
    </el-row>
  </header>

  <login ref="loginDialog" />
</template>

<script setup>
import eventBus from '@/utlis/eventbus.js'
import { getLogout } from '@/network/login.js'
import { getSearchResult } from '@/network/search.js'
import { ref, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()

const searchPopup = defineAsyncComponent(() => import('./components/searchPopup.vue'))
const login = defineAsyncComponent(() => import('./components/login.vue'))

const store = useStore()
const boolean = ref(store.state.boolean) // 侧边栏是否收缩
const keyword = ref() // 搜索关键词
const lyric = ref() // 显示的歌词
const loginDialog = ref() // 登录弹窗
const profile = computed(() => store.state.login.profile) // 登录状态

/**
 * 接收底部音乐推送的歌词
 **/
eventBus.on('sync-lyric', value => {
  lyric.value = value
})

/**
 * 登录函数，打开登录弹窗
 * */
const logout = () => {
  getLogout().then(res => {
    console.log(res)
  })
  localStorage.clear()
  router.go(0)
}

/**
 * 登录函数，打开登录弹窗
 * */
const userLogin = () => {
  if (!profile.value) {
    // 修改login组件内部 defineExpose 暴露出来的dialogVisible
    loginDialog.value.dialogVisible = true
  }
}

/**
 * 搜索
 * */
const search = () => {
  if (keyword.value) {
    store.commit('setKeyword', keyword.value)
    getSearchResult({ keywords: keyword.value, type: 1 }).then(res => {
      store.commit('setSongMusic', res.data.result.songs)
    }).finally(() => {
      router.push(`/search`)
    })
  } else {
    router.push(`/findMusic`)
  }
}

/**
 * 热搜的事件总线
 * */
eventBus.on('hotSearch', key => {
  console.log(key)
  keyword.value = key
  search()
})

</script>

<style scoped lang="less">
  header {
    z-index: 1000;
    background-color: white;

    .logo {
      width: 120px;
      height: 60px;
    }

    .svg {
      width: 30px;
      height: 60px;
    }

    .el-row {
      height: 60px;
      display: flex;
      align-items: center;
    }

    .topContent {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      .lyric {
        font-weight: 600;
        font-size: 30px;
        margin-bottom: 0px;
        cursor: pointer;
        background-image: -webkit-linear-gradient(bottom, red, #ff5f60, #f0c41b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: '楷体', serif;
      }
    }

    .el-dropdown {
      vertical-align: middle;

      &-link {
        .avatar {
          vertical-align: middle;
        }
        .nickname {
          vertical-align: middle;
          /*align-items: center;*/
          margin-left: 5px;
          font-size: 15px;
        }
      }
    }
  }
</style>
