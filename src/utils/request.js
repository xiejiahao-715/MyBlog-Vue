import axios from "axios";
import router from "@/router";

// 本地环境
// const baseURL = 'http://127.0.0.1:8080'
// 发布环境
// const baseURL = 'https://123.56.104.224:8080/'
// 域名
const baseURL = 'https://www.xiejiahao.top:8080/'

// baseURL配置不要在尾部加上 /
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})
service.interceptors.response.use(
    response=>{
      // 请求自定义处理
      if(response.config.defineHandler === true){
        return response
      }else {
        let res = response.data
        if (res && ((res.success === true && res.code === 200)
            || (response.status === 200 && response.headers['content-type'] === 'application/octet-stream'))) {
          return res
        } else {
          let error = (res && res.message) || 'error'
          return Promise.reject(error)
        }
      }
    },
    error => {
      // 防爬验证
      if (error.response.status === 509) {
        router.push({name: '509'})
      }
      return Promise.reject(error)
    }
)
export default service
