import axios from "axios";
import {path} from "@/assets/song/path.js";
import {ElLoading} from 'element-plus'
import {ElMessage} from 'element-plus'


let timer
let loadingInstance

export function request(config) {
  const instance = axios.create({
    baseURL: `https://music-zlq.vercel.app`,
    timeout: 10000,
    withCredentials: true
  })

  instance.interceptors.request.use(config => {
    if (!path.includes(config.url)) {
      // console.log(config.url)
      loadingInstance = ElLoading.service({
        fullscreen: true,
        spinner: 'el-icon-loading',
        text: '拼命加载中...',
        body: true,
        background: 'rgba(0,0,0,0.0)'
      })
    }
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  }, error => {
  })

  instance.interceptors.response.use(response => {
    loadingInstance?.close()
    if (response.data.code === '301') {
      localStorage.clear()
      ElMessage({
        message: '请刷新重新登录',
        type: 'error',
      })
    }
    return response
  }, error => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      ElMessage({
        message: '网络异常请重新刷新',
        type: 'error',
      })
    }, 1000)
  })

  return instance(config)
}
