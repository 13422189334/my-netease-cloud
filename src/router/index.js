import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', redirect: '/findMusic/recommend'
  },
  {
    path: '/search',
    component: () => import('@/views/Search/Search.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Search/pages/song.vue')
      },
      {
        path: 'singer',
        component: () => import('@/views/Search/pages/singer.vue')
      },
      {
        path: 'album',
        component: () => import('@/views/Search/pages/album.vue')
      },
      {
        path: 'video',
        component: () => import('@/views/Search/pages/video.vue')
      },
      {
        path: 'songMenu',
        component: () => import('@/views/Search/pages/songMenu.vue')
      }
    ]
  },
  {
    path: '/unique',
    component: () => import('@/views/Aside/findMusic/pages/unique/index.vue')
  },
  {
    path: '/findMusic',
    name: '发现音乐',
    component: () => import('@/views/Aside/findMusic/index.vue'),
    children: [
      { path: 'recommend', name: '个性推荐', component: () => import('@/views/Aside/findMusic/pages/recommend/index.vue') },
      { path: 'exclusive', name: '专属定制', component: () => import('@/views/Aside/findMusic/pages/exclusive/index.vue') },
      { path: 'songMenu', name: '歌单', component: () => import('@/views/Aside/findMusic/pages/songMenu/index.vue') },
      { path: 'leaderboard', name: '排行榜', component: () => import('@/views/Aside/findMusic/pages/leaderboard/index.vue') },
      { path: 'singer', name: '歌手', component: () => import('@/views/Aside/findMusic/pages/singer/index.vue') },
      {
        path: 'newMusic',
        name: '最新音乐',
        component: () => import('@/views/Aside/findMusic/pages/newMusic/index.vue'),
        redirect: '/findMusic/newMusic/song',
        children: [
          { path: 'song', name: '新歌速递', component: () => import('@/views/Aside/findMusic/pages/newMusic/pages/song/index.vue') },
          { path: 'disc', name: '新碟上架', component: () => import('@/views/Aside/findMusic/pages/newMusic/pages/disc/index.vue') }
        ]
      }
    ]
  },
  {
    path: '/video',
    name: '视频MV',
    redirect: '/video/radioCenter',
    component: () => import('@/views/Aside/video/index.vue'),
    children: [
      { path: 'video', component: () => import('@/views/Aside/video/pages/video/index.vue') },
      { path: 'mv', component: () => import('@/views/Aside/video/pages/mv/index.vue') },
      { path: 'allMV', component: () => import('@/views/Aside/video/pages/mv/all.vue') },
      { path: 'rank', component: () => import('@/views/Aside/video/pages/rank/index.vue') }
    ]
  },
  {
    path: '/podcast',
    name: '播客',
    redirect: '/podcast/radioCenter',
    component: () => import('@/views/Aside/podcast/index.vue'),
    children: [
      { path: 'radioCenter', name: '电台中心', component: () => import('@/views/Aside/podcast/pages/radioCenter/index.vue') },
      { path: 'voiceRank', name: '声音榜', component: () => import('@/views/Aside/podcast/pages/voiceRank/index.vue') },
      { path: 'freshRank', name: '新晋播客榜', component: () => import('@/views/Aside/podcast/pages/freshRank/index.vue') },
      { path: 'hotRank', name: '热门播客榜', component: () => import('@/views/Aside/podcast/pages/hotRank/index.vue') },
      { path: 'hourRank', name: '24小时节目榜', component: () => import('@/views/Aside/podcast/pages/hourRank/index.vue') }
    ]
  },
  {
    path: '/friend',
    name: '动态',
    component: () => import('@/views/Aside/friend/index.vue')
  },
  {
    path: '/fm',
    name: '私人FM',
    component: () => import('@/views/Aside/fm/index.vue')
  },
  {
    path: '/recentPlay',
    name: '最近播放',
    component: () => import('@/views/Aside/recentPlay/index.vue')
  },
  {
    path: '/myPodcast',
    name: '我的播客',
    component: () => import('@/views/Aside/myPodcast/index.vue')
  },
  {
    path: '/myCollect',
    name: '我的收藏',
    redirect: '/myCollect/album',
    component: () => import('@/views/Aside/myCollect/index.vue'),
    children: [
      { path: 'album', name: '专辑', component: () => import('@/views/Aside/myCollect/pages/album/index.vue') },
      { path: 'singer', name: '歌手', component: () => import('@/views/Aside/myCollect/pages/singer/index.vue') },
      { path: 'video', name: '视频', component: () => import('@/views/Aside/myCollect/pages/video/index.vue') }
    ]
  },
  {
    path: '/myLike',
    name: '我喜欢的音乐',
    component: () => import('@/views/Aside/myLike/index.vue')
  },
  {
    path: '/mySongList',
    name: '我的歌单',
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
  if (!store.state.login.profile && to.path !== '/findMusic') {
    eventBus.emit('toLogin')
    return '/findMusic'
  }
})

export default router
