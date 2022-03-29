import request from "@/utils/request";

export function getPublishedBlogPageApi(current,limit){
  return request({
    url: '/blog/published/page',
    params:{current,limit},
    method: 'get'
  })
}
export function getPublishedBlogPageByCategoryApi(current,limit,category){
  return request({
    url: '/blog/published/page',
    params:{current,limit,category},
    method: 'get'
  })
}

export function getPublishedBlogByIdApi(id){
  return request({
    url: '/blog/published/info',
    params:{id},
    method: 'get'
  })
}
export function getPublishedBlogContentByIdApi(id){
  return request({
    url: '/blog/published/content',
    params: {id},
    method: 'get'
  })
}

export function downloadBlogApi(id){
  let href = request.defaults.baseURL + request.getUri({
    url: '/blog/download',
    params:{id},
  })
  let link = window.document.createElement('a')
  link.style.display = 'none'
  link.href = href
  window.document.body.appendChild(link)
  link.click()
  link.remove()
}

// 获取二维码
export function getUnAccessLimitCodeSrcApi(){
  // 通过拼接时间戳达到刷新验证码的目的
  return request({
    url: '/blog/unAccessLimit/code',
    method: 'get',
  })
}

export function verifyUnAccessLimitCodeApi(code){
  return request({
    url: '/blog/unAccessLimit/verify',
    method: 'get',
    params: {
      code
    }
  })
}
