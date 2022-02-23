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