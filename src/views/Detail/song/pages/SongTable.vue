<template>
  <el-table
    :data="songArray"
    stripe
    size="small"
    highlight-current-row
    @row-dblclick="handleCurrentChange"
  >
    <el-table-column width="45">
      <template #default="scope">
        <svg v-if="scope.row.id === currentId" class="id" aria-hidden="true">
          <use xlink:href="#icon-yangshengqi" />
        </svg>
        <span v-else>{{ scope.row.index }}</span>
      </template>
    </el-table-column>
    <el-table-column width="45">
      <template #default="scope">
        <i v-if="isLike(scope.row.id)" class="iconfont icon-xihuan icon red-icon" />
        <i v-else title="喜欢" class="iconfont icon-aixin icon" />
      </template>
    </el-table-column>
    <el-table-column width="40">
      <i title="下载" class="iconfont icon-xiazai icon"/>
    </el-table-column>
    <el-table-column prop="name" label="音乐标题" width="400">
      <template #default="scope">
        <span class="mr-5" :class="{ active: scope.row.id === currentId }">{{ scope.row.name }}</span>
        <el-tag v-if="scope.row.mv" type="danger" size="mini" @click="toDetail(scope.row.mv)">MV</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="歌手" width="275">
      <template #default="scope">
        {{ scope.row.ar?.map(item => item.name).join(' / ') }}
      </template>
    </el-table-column>
    <el-table-column label="歌手专辑" width="300">
      <template #default="scope">
        {{ scope.row.al.name }}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="时长">
      <template #default="scope">
        {{ $formatTime(scope.row.dt).slice(-5) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import eventBus from '@/utlis/eventbus.js'

const store = useStore()
const router = useRouter()

const songArray = computed(() => store.state.songDetail.songArray)
const currentId = computed(() => store.state.songDetail.songDetail.id)

/**
 * 双击事件
 * */
const handleCurrentChange = (row) => {
  if (row.id === currentId.value) return
  const index = songArray.value.findIndex(item => item.id === row.id)
  store.commit('setSongDetail', row)
  store.commit('play', index)
  eventBus.emit('playMusic')
}

/**
 * 跳转详情
 */
const toDetail = id => {
  router.push(`/detail/mv?id=${id}`)
}

/**
 * 是否是收藏歌曲
 * @param id
 * @returns {boolean}
 */
const isLike = id => store.state.singer.likeMusic.includes(id)

eventBus.on('playAll', () => {
  handleCurrentChange(songArray.value[0])
})
</script>

<style scoped lang="less">
  .active {
    color: red;
    font-weight: 900;
  }

  .mr-5 {
    margin-right: 5px;
  }

  .id {
    width: 15px;
    height: 15px;
  }

  .icon {
    font-size: 15px;
  }

  .red-icon {
    color: red;
  }
</style>
