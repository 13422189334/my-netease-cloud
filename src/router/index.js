import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', redirect: '/findMusic/recommend'
  },
  {
    path: '/search',
    meta: { name: '搜索' },
    redirect: '/search/song',
    component: () => import('@/views/Search/index.vue'),
    children: [
      { path: 'song', meta: { name: '单曲' }, component: () => import('@/views/Search/pages/song.vue') },
      { path: 'singer', meta: { name: '歌曲' }, component: () => import('@/views/Search/pages/singer.vue') },
      { path: 'album', meta: { name: '专辑' }, component: () => import('@/views/Search/pages/album.vue') },
      { path: 'video', meta: { name: '视频' }, component: () => import('@/views/Search/pages/video.vue') },
      { path: 'songMenu', meta: { name: '歌单' }, component: () => import('@/views/Search/pages/songMenu.vue') }
    ]
  },
  {
    path: '/unique',
    component: () => import('@/views/Aside/findMusic/pages/unique/index.vue')
  },
  {
    path: '/findMusic',
    meta: { name: '发现音乐' },
    component: () => import('@/views/Aside/findMusic/index.vue'),
    children: [
      { path: 'recommend', meta: { name: '个性推荐' }, component: () => import('@/views/Aside/findMusic/pages/recommend/index.vue') },
      { path: 'exclusive', meta: { name: '专属定制' }, component: () => import('@/views/Aside/findMusic/pages/exclusive/index.vue') },
      { path: 'songMenu', meta: { name: '歌单' }, component: () => import('@/views/Aside/findMusic/pages/songMenu/index.vue') },
      { path: 'leaderboard', meta: { name: '排行榜' }, component: () => import('@/views/Aside/findMusic/pages/leaderboard/index.vue') },
      { path: 'singer', meta: { name: '歌手' }, component: () => import('@/views/Aside/findMusic/pages/singer/index.vue') },
      {
        path: 'newMusic',
        name: '最新音乐',
        component: () => import('@/views/Aside/findMusic/pages/newMusic/index.vue'),
        redirect: '/findMusic/newMusic/song',
        children: [
          { path: 'song', meta: { name: '新歌速递' }, component: () => import('@/views/Aside/findMusic/pages/newMusic/pages/song/index.vue') },
          { path: 'disc', meta: { name: '新碟上架' }, component: () => import('@/views/Aside/findMusic/pages/newMusic/pages/disc/index.vue') }
        ]
      }
    ]
  },
  {
    path: '/video',
    meta: { name: '视频MV' },
    redirect: '/video/video',
    component: () => import('@/views/Aside/video/index.vue'),
    children: [
      { path: 'video', meta: { name: '视频' }, component: () => import('@/views/Aside/video/pages/video/index.vue') },
      { path: 'mv', meta: { name: 'MV' }, component: () => import('@/views/Aside/video/pages/mv/index.vue') },
      { path: 'allMV', meta: { name: '全部MV' }, component: () => import('@/views/Aside/video/pages/mv/all.vue') },
      { path: 'rank', meta: { name: 'MV排行榜' }, component: () => import('@/views/Aside/video/pages/rank/index.vue') }
    ]
  },
  {
    path: '/podcast',
    meta: { name: '播客' },
    redirect: '/podcast/radioCenter',
    component: () => import('@/views/Aside/podcast/index.vue'),
    children: [
      { path: 'radioCenter', meta: { name: '电台中心' }, component: () => import('@/views/Aside/podcast/pages/radioCenter/index.vue') },
      { path: 'voiceRank', meta: { name: '声音榜' }, component: () => import('@/views/Aside/podcast/pages/voiceRank/index.vue') },
      { path: 'freshRank', meta: { name: '新晋播客榜' }, component: () => import('@/views/Aside/podcast/pages/freshRank/index.vue') },
      { path: 'hotRank', meta: { name: '热门播客榜' }, component: () => import('@/views/Aside/podcast/pages/hotRank/index.vue') },
      { path: 'hourRank', meta: { name: '24小时节目榜' }, component: () => import('@/views/Aside/podcast/pages/hourRank/index.vue') }
    ]
  },
  {
    path: '/friend',
    meta: { name: '动态' },
    component: () => import('@/views/Aside/friend/index.vue')
  },
  {
    path: '/fm',
    meta: { name: '私人FM' },
    component: () => import('@/views/Aside/fm/index.vue')
  },
  {
    path: '/recentPlay',
    meta: { name: '最近播放' },
    component: () => import('@/views/Aside/recentPlay/index.vue')
  },
  {
    path: '/myPodcast',
    meta: { name: '我的播客' },
    component: () => import('@/views/Aside/myPodcast/index.vue')
  },
  {
    path: '/myCollect',
    meta: { name: '我的收藏' },
    redirect: '/myCollect/album',
    component: () => import('@/views/Aside/myCollect/index.vue'),
    children: [
      { path: 'album', meta: { name: '专辑' }, component: () => import('@/views/Aside/myCollect/pages/album/index.vue') },
      { path: 'singer', meta: { name: '歌手' }, component: () => import('@/views/Aside/myCollect/pages/singer/index.vue') },
      { path: 'video', meta: { name: '视频' }, component: () => import('@/views/Aside/myCollect/pages/video/index.vue') }
    ]
  },
  {
    path: '/myLike',
    meta: { name: '我喜欢的音乐' },
    component: () => import('@/views/Aside/myLike/index.vue')
  },
  {
    path: '/mySongList',
    meta: { name: '我的歌单' },
    component: () => import('@/views/Aside/mySongList/index.vue')
  },
  {
    path: '/program',
    component: () => import('@/views/RadioDetailed/program.vue')
  },
  {
    path: '/categoryList',
    component: () => import('@/views/RadioDetailed/categoryList.vue')
  },
  {
    path: '/songDetail',
    component: () => import('@/views/SongDetail/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/SongDetail/pages/SongList.vue')
      },
      {
        path: 'comment',
        component: () => import('@/views/SongDetail/pages/Comment.vue')
      },
      {
        path: 'collect',
        component: () => import('@/views/SongDetail/pages/Collect.vue')
      }
    ]
  },
  {
    path: '/SingerContent',
    component: () => import('@/views/SingerContent/SingerContent.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/SingerContent/pages/singerMusic.vue')
      },
      {
        path: 'album',
        component: () => import('@/views/SingerContent/pages/album.vue')
      },
      {
        path: 'mv',
        component: () => import('@/views/SingerContent/pages/MV.vue')
      },
      {
        path: 'singerDetail',
        name: 'singerDetail',
        component: () => import('@/views/SingerContent/pages/singerDetail.vue')
      },
      {
        path: 'similaritySinger',
        component: () => import('@/views/SingerContent/pages/similaritySinger.vue')
      }
    ]
  },
  {
    path: '/VideoDetail',
    component: () => import('@/views/VideoDetail/VideoDetail.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, y: 0 }
  }
})
import store from '@/store'
import eventBus from '@/utlis/eventbus.js'

router.beforeEach(to => {
  if (!store.state.login.profile && to.path !== '/findMusic/recommend') {
    eventBus.emit('toLogin')
    return '/findMusic/recommend'
  }
})

export default router
