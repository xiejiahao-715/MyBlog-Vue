import request from "@/utils/request";

// 获取网站信息
export function getWebsiteInfoApi(id = 1){
  return request({
    url: `/info/website?id=${id}`,
    method: 'get'
  })
}
// 获取社交信息
export function getSocialsApi(){
  return request({
    url: `/info/socials`,
    method: 'get'
  })
}
// 获取分类信息
export function getBlogCategoryApi(){
  return request({
    url: '/blogCategory',
    method: 'get'
  })
}
// 获取随机banner图的url
export function getRandomBannerImageApi(){
  return request({
    url: '/bannerImage',
    method: 'get'
  })
}