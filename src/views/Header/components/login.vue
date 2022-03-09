<template>
  <el-dialog
    v-model="dialogVisible"
    top="30vh"
    center
    :append-to-body="true"
    :modal="false"
    :title="title"
    width="25%"
  >
    <section>
      <nav @click="changeType">
        <el-link type="danger">{{ isPassword ? '扫码登录' :'账号登录' }}</el-link>
      </nav>
      <div v-if="isPassword">
        <el-form
          label-width="60px"
          label-position="left"
          :model="formLabelAlign"
        >
          <el-form-item label="手机号">
            <el-input v-model="formLabelAlign.phone" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" type="password" />
          </el-form-item>
        </el-form>
        <div class="form-footer">
          <el-button type="primary" @click="login">登陆</el-button>
        </div>
      </div>
      <!--      扫码登录-->
      <div v-else class="scan">
        <el-image :src="image" class="image" @click="getLoginImg">
          <template #error>
            <div class="image-slot">
              <el-skeleton :animated="true">
                <template #template>
                  <el-skeleton-item class="skeleton" variant="image" />
                </template>
              </el-skeleton>
            </div>
          </template>
        </el-image>
      </div>
    </section>

  </el-dialog>
</template>

<script setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import eventBus from '@/utlis/eventbus.js'
import { ElMessage } from 'element-plus'
import { getKey, createLogin, checkLogin, getInfo } from '@/network/login.js'

const store = useStore()

const title = ref('登录') // 登录标题
const image = ref('') // 照片
const isPassword = ref(true) // 是否密码登录
const dialogVisible = ref(false) // 弹窗状态

let timer

/**
 * 改变登录类型
 * */
const changeType = () => {
  clearInterval(timer)
  isPassword.value = !isPassword.value
  if (!isPassword.value) {
    getLoginImg()
  } else {
    title.value = '登录'
  }
}

/**
 * 扫码登录
 * 1. getKey() 方法获取 unikey
 * 2. createLogin() 根据 unikey 获取 qrurl
 * 3. 设置二维码url
 * 4. 每三秒轮询 checkLogin() 查看扫码结果 （ 801：等待扫描  802:授权中  803：授权登陆成功 ）
 * */
async function getLoginImg() {
  const res = await getKey()
  const key = res.data.data.unikey
  const result = await createLogin(key)
  image.value = `https://api.pwmqr.com/qrcode/create/?url=${result.data.data.qrurl}`
  timer = setInterval(() => {
    checkLogin(key).then(res => {
      title.value = res.data.message
      if (res.data.code === 803) {
        dialogVisible.value = false
        clearInterval(timer)
        ElMessage.success({
          message: '登陆成功',
          type: 'success'
        })
        getInfo().then(res => {
          store.commit('setUser', res.data.profile)
        })
      } else if (res.data.code === 800) {
        clearInterval(timer)
        image.value = ''
      } else if (res.data.code === 802) {
        image.value = res.data.avatarUrl
      }
    })
  }, 3000)
}

/**
 * 时间总线 - 打开登录弹窗
 * */
eventBus.on('toLogin', () => {
  clearInterval(timer)
  dialogVisible.value = true
})

/**
 * 登录信息
 * */
const formLabelAlign = reactive({
  phone: '',
  password: ''
})

/**
 * 登录方法
 * */
const login = () => {
  clearInterval(timer)
  store.dispatch('login', formLabelAlign).then(() => {
    dialogVisible.value = false
    store.dispatch('getUserNumber')
    eventBus.emit('login')
  })
}

/**
 * 暴露参数给父组件
 * */
defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less">
  .el-button--primary {
    width: 50%;
  }

  section {
    position: relative;
  }

  nav {
    position: absolute;
    left: 0;
    top: -55px;
  }

  .form-footer {
    text-align: center;
  }

  .scan {
    display: flex;
    justify-content: center;

    .image {
      width: 250px;
      height: 250px;
    }

    .image-slot {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: #f1ecec;

      .skeleton {
        width: 250px;
        height: 250px;
      }
    }
  }
</style>
