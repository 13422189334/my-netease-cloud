<template>
  <header>
    <el-row :gutter="20">
      <el-col :span="boolean ? 1 : 3">
        <img v-if="!boolean" class="logo" src="../../assets/image/logo-top2.png" alt="logo">
        <svg v-else class="svg" aria-hidden="true">
          <use xlink:href="#icon-wangyiyunyinle" />
        </svg>
      </el-col>
      <el-col :span="6">
        <!--  搜索弹层-->
        <el-popover
          v-model:visible="isSearchPopup"
          placement="bottom"
          :width="320"
          trigger="focus"
        >
          <template #reference>
            <el-input
              v-model.trim="value"
              placeholder="请输入内容"
              clearable
              class="input-with-select"
              @keydown.enter="search"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="search" />
              </template>
            </el-input>
          </template>
          <!-- 搜索弹出层 -->
          <searchPopup :keyword="value" />
        </el-popover>
      </el-col>
      <el-col class="topContent" :span="boolean ? 13 : 11" style="text-align: center;">
        <span class="lyric">{{ lyric || $store.state.songDetail.songDetail.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-dropdown v-if="profile">
          <span class="el-dropdown-link aa" @click="userLogin">
            <el-avatar class="avatar" :size="40" :src="profile.avatarUrl"></el-avatar>
            <span class="nickname">{{profile.nickname}}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>设置</el-dropdown-item>
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

const router = useRouter()

const searchPopup = defineAsyncComponent(() => import('./components/searchPopup.vue'))
const login = defineAsyncComponent(() => import('./components/login.vue'))

const store = useStore()
const boolean = ref(store.state.boolean)
const value = ref()
const loginDialog = ref()

/**
 * 接收底部音乐推送的歌词
 **/
const lyric = ref()
eventBus.on('sync-lyric', value => {
  lyric.value = value
})

const profile = computed(() => store.state.login.profile) // 登录状态

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
    loginDialog.value.dialogVisible = true
  }
}
// 搜索
const isSearchPopup = ref(false)
const search = () => {
  if (value.value) {
    isSearchPopup.value = false
    router.push(`/search`)
    store.commit('setKeyword', value.value)
    getSearchResult({ keywords: value.value, type: 1 }).then(res => {
      store.commit('setSongMusic', res.data.result.songs)
    })
  }
}
eventBus.on('hotSearch', keyword => {
  value.value = keyword
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
    }

    .topContent {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

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
