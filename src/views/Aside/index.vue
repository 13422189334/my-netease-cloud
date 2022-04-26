<template>
  <el-menu :collapse="boolean" class="aside" :default-active="$route.path" router popper-append-to-body>
    <el-menu-item
      v-for="menuItem in menus"
      :index="menuItem.index"
      :key="menuItem.index"
    >
      <i :class="menuItem.icon"/>
      <template #title>{{ menuItem.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  style: {
    type: Object,
    remark: '同步父组件sidebar的宽度样式'
  }
})

const store = useStore()
const boolean = computed(() => store.state.boolean)
const iconMarginRight = computed(() => store.state.boolean ? '0px' : '10px')

const menus = ref([
  { index: '/findMusic/recommend', icon: 'iconfont icon-yinle1', title: '发现音乐' },
  { index: '/podcast', icon: 'iconfont icon-faxian', title: '播客' },
  { index: '/friend', icon: 'iconfont icon-tianjiapengyou', title: '动态' },
  { index: '/video', icon: 'iconfont icon-FM_weixuanze', title: '视频MV' },
  { index: '/FM', icon: 'iconfont icon-FM_weixuanze', title: '私人FM' },
  { index: '/RecentPlay', icon: 'iconfont icon-time', title: '最近播放' },
  { index: '/myPodcast', icon: 'iconfont icon-tuijian', title: '我的播客' },
  { index: '/myCollect', icon: 'iconfont icon-shoucang', title: '我的收藏' },
  { index: '/myLike', icon: 'iconfont icon-aixin', title: '我喜欢的音乐' },
  { index: '/mySongList', icon: 'iconfont icon-gedan', title: '我的歌单' }
])

</script>

<style scoped lang="less">
  /deep/.el-menu-tooltip__trigger {
    padding: 0 24px !important;
  }
  .iconfont {
    margin-right: v-bind('iconMarginRight');
    font-size: 20px;
  }

  .aside {
    height: 100%;
    width: v-bind('props.style.width');
    position: fixed;
  }

  .is-active {
    font-weight: 900;
  }
</style>
