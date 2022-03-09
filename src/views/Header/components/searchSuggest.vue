<template>
  <header>搜
    <el-link type="primary">"{{ keyword }}"</el-link>
    相关的结果：
  </header>
  <br>
  <main v-if="searchData.songs?.length">
    <div v-for="nav in navList" :key="nav.order">
      <nav class="nav title">
        {{ nav.title }}
        <svg class="svg" aria-hidden="true">
          <use :xlink:href="nav.icon" />
        </svg>
      </nav>
      <nav v-for="item in searchData[nav.order]" :key="item.id" class="nav" @click="nav.click(item)">
        {{ nav.formatter(item) }}
      </nav>
    </div>
  </main>
  <div v-else class="none">
    暂无数据
  </div>
</template>

<script setup>
import eventBus from '@/utlis/eventbus.js'
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatAlbum } from '@/utlis/formatData.js'
import { getAlbumContent } from '@/network/comment.js'

defineProps({
  keyword: {
    type: String
  },
  searchData: {
    type: Object
  }
})

const router = useRouter()
const store = useStore()

/**
 * 点击搜索结果nav跳转方法
 * */
const goSearch = ({ id, type }) => {
  switch (type) {
    case 0:
      eventBus.emit('hotSearch', id)
      break
    case 1:
      store.commit('setSingerId', id)
      router.push(`/SingerContent`)
      break
    case 2:
      getAlbumContent(id).then(res => {
        store.commit('setSongList', formatAlbum(res.data.album))
        store.commit('setSongMusic', res.data.songs)
        router.push('/songDetail')
      })
      break
    case 3:
      store.dispatch('getSongList', id)
      router.push('/songDetail')
      break
  }
}

/**
 * 搜索结果nav集合模版
 * */
const navList = [
  {
    title: '单曲',
    icon: '#icon-yinle',
    order: 'songs',
    formatter: (item) => {
      return `${item.name} - ${item.artists[0].name}`
    },
    click: (item) => {
      goSearch({ id: item.name, type: 0 })
    }
  },
  {
    title: '歌手',
    icon: '#icon-user',
    order: 'artists',
    formatter: (item) => {
      return `${item.name}`
    },
    click: (item) => {
      goSearch({ id: item.id, type: 1 })
    }
  },
  {
    title: '专辑',
    icon: '#icon-zhuanjiguangpan',
    order: 'albums',
    formatter: (item) => {
      return `${item.name} - ${item.artist.name}`
    },
    click: (item) => {
      goSearch({ id: item.id, type: 2 })
    }
  },
  {
    title: '歌单',
    icon: '#icon-gedan',
    order: 'playlists',
    formatter: (item) => {
      return `${item.name}`
    },
    click: (item) => {
      goSearch({ id: item.id, type: 3 })
    }
  }
]

</script>

<style scoped lang="less">
  .title {
    background: #f1ecec;
  }

  .nav {
    padding: 5px;

    &:hover {
      background: #f5f5f5;
    }
  }

  .svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .none {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
