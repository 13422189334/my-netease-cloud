<template>
  <!--歌曲列表-->
  <el-table
    :data="tableData"
    stripe
    size="small"
    highlight-current-row
    style="width: 100%;"
    @row-dblclick="handleCurrentChange"
  >
    <el-table-column width="45">
      <template #default="scope">
        <svg v-if="scope.row.id === playName" style="width: 15px;height: 15px;" class="svg" aria-hidden="true"><use xlink:href="#icon-yangshengqi" /></svg>
        <span v-else>{{ scope.row.index }}</span>
      </template>
    </el-table-column>
    <el-table-column ref="dom" width="45">
      <template #default="scope">
        <i v-if="isLike(scope.row.id)" style="color: red; font-size: 14px;" class="iconfont icon-xihuan" />
        <i v-else title="喜欢" class="iconfont icon-aixin" style="font-size: 15px;" />
      </template>
    </el-table-column>
    <el-table-column width="40"><i title="下载" class="iconfont icon-xiazai" style="font-size: 15px;" /></el-table-column>
    <el-table-column prop="name" label="音乐标题" width="400">
      <template #default="scope">
        <span class="music-title" :class="{active:scope.row.id === playName}">{{ scope.row.name }}</span>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { getLikeMusic } from '@/network/song.js'
import eventBus from '@/utlis/eventbus.js'

const store = useStore()
const router = useRouter()

const tableData = computed(() => store.state.songDetail.songArray)
const playDetail = computed(() => store.state.songDetail.songDetail.id)
const current = ref(-1)
const handleCurrentChange = row => {
  if (row.id === playDetail.value) return
  const index = tableData.value.findIndex(item => item.id === row.id)
  current.value = index
  store.commit('setSongDetail', row)
  store.commit('play', index)
  eventBus.emit('playMusic')
}

const toDetail = id => {
  router.push(`/videoDetail?id=${id}`)
}

const playName = computed(() => store.state.songDetail.songDetail.id)

const isLike = id => store.state.singer.likeMusic.includes(id)

eventBus.on('playAll', () => {
  handleCurrentChange(tableData.value[0])
})
</script>

<style scoped lang="less">
.active{
  color: red;
  font-weight: 900;
}
.music-title{
  margin-right: 5px;
}

</style>
