import gsap from 'gsap'
// cdn引入
// import ScrollTrigger from 'ScrollTrigger'

import ScrollTrigger from 'gsap/ScrollTrigger'

// 注册滚动监听插件
gsap.registerPlugin(ScrollTrigger)

export {
  gsap,
  ScrollTrigger
}