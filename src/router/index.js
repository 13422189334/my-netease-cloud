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
    path: '/program',
    component: () => import('@/views/RadioDetailed/program.vue')
  },
  {
    path: '/categoryList',
    component: () => import('@/views/RadioDetailed/categoryList.vue')
  },
  {
    path: '/video',
    component: () => import('@/views/Aside/video/video.vue'),
    children: [
      {
        path: 'video',
        component: () => import('@/views/Aside/video/pages/videoContent.vue')
      },
      {
        path: '',
        component: () => import('@/views/Aside/video/pages/MV.vue')
      },
      {
        path: 'allMV',
        component: () => import('@/views/Aside/video/pages/allMV.vue')
      },
      {
        path: 'mvTopList',
        component: () => import('@/views/Aside/video/pages/mvTopList.vue')
      }
    ]
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
    path: '/friend',
    component: () => import('@/views/Aside/friend/friend.vue')
  },
  {
    path: '/FM',
    component: () => import('@/views/Aside/Fm/FM.vue')
  },
  {
    path: '/RecentPlay',
    component: () => import('@/views/Aside/RecentPlay/RecentPlay.vue')
  },
  {
    path: '/myPodcast',
    component: () => import('@/views/Aside/myPodcast/myPodcast.vue')
  },
  {
    path: '/myCollect',
    component: () => import('@/views/Aside/myCollect/MyCollect.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Aside/myCollect/pages/album.vue')
      },
      {
        path: 'singer',
        component: () => import('@/views/Aside/myCollect/pages/singer.vue')
      },
      {
        path: 'video',
        component: () => import('@/views/Aside/myCollect/pages/video.vue')
      },
      {
        path: 'professional',
        component: () => import('@/views/Aside/myCollect/pages/professional.vue')
      }
    ]
  },
  {
    path: '/likeMusic',
    component: () => import('@/views/Aside/likeMusic/likeMusic.vue')
  },
  {
    path: '/mySongList',
    component: () => import('@/views/Aside/mySongList/index.vue')
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
