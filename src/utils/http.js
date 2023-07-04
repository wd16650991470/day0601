import axios from "axios"
import { getToken } from "./auth"
import router from "@/router"
import { MessageBox } from "element-ui"
const api = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net',
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
})
// // 添加请求拦截器
// api.interceptors.request.use(
//   function (config) {
//     // 在发送请求之前做些什么
//     return config
//   },
//   function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )

// // 添加响应拦截器
// api.interceptors.response.use(
//   function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response
//   },
//   function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error)
//   }
// )

/**
 * 请求拦截
 */
api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken() // 请求头带上token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截
 */
api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.status === 2) {
      // 401, token失效
      // resetLoginInfo()
      router.push({
        name: "login"
      })
    }
    return response.data
  },
  (error) => {
    let title = ""
    let message = ""

    if (error && error.response) {
      message = error.response.data.message
      // 401, token失效
      if (error.response.data.status === 2) {
        router.push(
          {
            name: "login"
          }
          // () => {
          //   // resetLoginInfo()
          // }
        )
      }
      switch (
        error.response.status // 跨域存在获取不到状态码的情况
      ) {
        case 400:
          title = "错误请求"
          break
        case 401:
          title = "资源未授权"
          break
        case 403:
          title = "禁止访问"
          break
        case 404:
          title = "未找到所请求的资源"
          break
        case 405:
          title = "不允许使用该方法"
          break
        case 408:
          title = "请求超时"
          break
        case 500:
          title = "内部服务器错误"
          break
        case 501:
          title = "未实现"
          break
        case 502:
          title = "网关错误"
          break
        case 503:
          title = "服务不可用"
          break
        case 504:
          title = "网关超时"
          break
        case 505:
          title = "HTTP版本不受支持"
          break
        default:
          title = error.response.status
      }
      return MessageBox.alert(message, title, {
        type: "warning"
      })
    } else {
      // 跨域获取不到状态码或者其他状态进行的处理
      return MessageBox.alert("请联系系统管理员, 或稍后再试!", "未知错误", {
        type: "error"
      })
    }
  }
)

export default api
