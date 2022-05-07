<template>
  <section>
    <el-input
      v-model="content"
      :autofocus="focus"
      :clearable="true"
      type="textarea"
      placeholder="请输入内容"
      maxlength="140"
      show-word-limit
    />
    <div class="button">
      <el-button type="success" round @click="sendComment">评论</el-button>
    </div>
    <br>
    <el-descriptions v-if="comment.length" title="精彩评论" direction="vertical" :column="2">
      <template #extra>
        <el-button type="info" round size="mini" :icon="RefreshLeft" @click="changeComment">
          {{ boolean ? '热门评论' : '最新评论' }}
        </el-button>
      </template>
      <div v-for="item in comment" :key="item?.commentId">
        <el-descriptions-item>
          <main class="left">
            <el-avatar :size="50" :src="item?.user.avatarUrl" />
            <div class="comment">
              <p>
                <span class="user">
                  {{ item?.user.nickname }}:
                </span>
                {{ item.content }}
              </p>
              <p class="time">{{ $formatTime(item.time) }}</p>
            </div>
          </main>
        </el-descriptions-item>
        <el-descriptions-item align="right">
          <div class="right">
            <span class="good">{{ item.likedCount }}</span>
            <i class="iconfont icon-zan" />
            <span class="solid">|</span>
            <i class="iconfont icon-fenxiang1" />
            <span class="solid">|</span>
            <i class="iconfont icon-pinglun" @click="reply(item)" />
          </div>
        </el-descriptions-item>
      </div>
    </el-descriptions>
    <el-empty v-else description="还没有评论, 快来抢沙发~" />
  </section>
  <div class="pages">
    <el-pagination
      v-if="comment.length"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { RefreshLeft } from '@element-plus/icons-vue'
import { getComment, getSendComment } from '@/network/comment.js'
import eventBus from '@/utlis/eventbus.js'

const store = useStore()
const id = computed(() => store.state.songDetail.commentID)
const params = reactive({
  id: id.value,
  type: 2,
  limit: 10,
  offset: 0,
  timestamp: Date.now()
})

const comment = ref([])
const hotComment = ref([]) // 热门评论
const newComment = ref([]) // 最新评论
const total = ref() // 评论总数

/**
 * 获取歌曲评论
 */
const getComments = () => {
  getComment(params).then(res => {
    comment.value = res.data.comments
    newComment.value = res.data.comments
    hotComment.value = res.data.hotComments
    total.value = res.data.total
    store.commit('setCount', res.data.total)
  })
}

onMounted(() => {
  getComments()
})

/**
 * 分页组件翻页
 * @param value
 */
const currentChange = value => {
  params.offset = value
  getComment(params).then(res => {
    comment.value = res.data.comments
  })
}

/**
 * 切换热评评论
 */
const boolean = ref(false)
const changeComment = () => {
  boolean.value = !boolean.value
  comment.value = boolean.value ? hotComment.value : newComment.value
}

const content = ref('') // 评论内容
const focus = ref(false) // 自动获取焦点
const commentParams = reactive({
  t: 1,
  type: 2,
  id: id.value,
  content: '',
  timestamp: Date.now(),
  commentId: ''
})

/**
 * 发送评论
 * @returns {Promise<void>}
 */
const sendComment = async() => {
  commentParams.content = content.value
  await getSendComment(commentParams)
  const res = await getComment(params)
  comment.value = res.data.comments
  content.value = ''
  commentParams.commentId = ''
  eventBus.emit('get-song-detail')
  ElMessage.success({
    message: '评论成功',
    type: 'success'
  })
}

/**
 * 评论别人的评论
 * @param item
 */
const reply = item => {
  content.value = '回复' + item.user.nickname + ': '
  commentParams.commentId = item.commentId
  focus.value = true
}
</script>

<style scoped lang="less">
  .pages {
    display: flex;
    justify-content: center;
  }

  section {
    padding: 20px 10px;

    .button {
      margin-top: 10px;
      text-align: right;
    }

    &:deep (.el-textarea__inner) {
      min-height: 80px !important;
    }

    .left {
      height: 70px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .comment {
        margin-left: 10px;

        .user {
          color: #85b9e6;
        }

        .time {
          color: #949191;
          font-size: 12px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .good {
        font-size: 15px;
      }

      .solid {
        padding: 0 5px;
        color: silver;
      }

      .iconfont {
        font-size: 20px;
        margin: 0 8px;
      }
    }
  }
</style>
