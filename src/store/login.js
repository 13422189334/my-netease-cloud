import {phoneLogin} from "@/network/login.js";
import {ElMessage} from 'element-plus'

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
    async login(context, payload) {
      let res = await phoneLogin(payload)
      if (res.data.code === 200) {
        context.commit('setUser', res.data.profile)
        ElMessage.success({
          message: '登陆成功',
          type: 'success',
        })
        new Promise(resolve => {
          resolve(true)
        })
      }
    }
  }
}

export default login
