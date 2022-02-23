import request from "@/utils/request";

export function getWebsiteInfoApi(id = 1){
  return request({
    url: `/info/website?id=${id}`,
    method: 'get'
  })
}

export function getSocialsApi(){
  return request({
    url: `/info/socials`,
    method: 'get'
  })
}

export function getBlogCategoryApi(){
  return request({
    url: '/blogCategory',
    method: 'get'
  })
}

export function getRandomBannerImageApi(){
  return request({
    url: '/bannerImage',
    method: 'get'
  })
}