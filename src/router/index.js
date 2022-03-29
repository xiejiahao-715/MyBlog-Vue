import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: ()=>import('@/views/layout'),
    children:[{
      path: '',
      name: 'home',
      component: ()=>import('@/views/home'),
      meta: {title: '首页',useHomeIntroduce: true,isHome:true}
    },{
      path: 'article/:id(\\d+)',
      name: 'article',
      meta: {title: '文章',useBlogIntroduce: true},
      component: ()=>import('@/views/article')
    },{
      path: 'category/:id(\\d+)',
      name: 'category',
      meta: {title: '分类',useHomeIntroduce: true,isHome: true},
      component: ()=>import('@/views/category')
    }]
  },
  {
    path: '/509',
    component: ()=>import('@/views/509'),
    name: '509',
    meta: {title: '检测到ip恶意访问'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
