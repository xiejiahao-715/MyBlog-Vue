import axios from "axios";

// 本地环境
// const baseURL = 'http://127.0.0.1:8080'
// 发布环境
const baseURL = 'https://123.56.104.224:8080/'

// baseURL配置不要在尾部加上 /
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})
service.interceptors.response.use(
    response=>{
      let res = response.data
      // 请求自定义处理
      if(response.config.defineHandler === true){
        return res
      }else {
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
      return Promise.reject(error)
    }
)
export default service