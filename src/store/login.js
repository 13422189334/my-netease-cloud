import { phoneLogin } from '@/network/login.js'
import { ElMessage } from 'element-plus'

const login = {
  state: {
    profile: null
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload
    }
  },
  actions: {
    login(context, payload) {
      return new Promise(async(resolve, reject) => {
        const res = await phoneLogin(payload)
        if (res.data.code === 200) {
          context.commit('setUser', res.data.profile)
          ElMessage.success({
            message: '登陆成功',
            type: 'success'
          })
          resolve()
        } else {
          ElMessage.error({
            message: '用户名或密码错误',
            type: 'error'
          })
          reject()
        }
      })
    }
  }
}

export default login
