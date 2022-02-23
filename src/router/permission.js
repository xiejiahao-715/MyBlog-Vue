import store from "@/store";
import router from "@/router";

let timer = null
router.beforeEach((to,from,next)=>{
  store.commit('setLoadingStatus',true);
  if(timer){
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(()=>{
    if(store.state.loading === true){
      store.commit('setLoadingStatus',false)
    }
  },6000)
  if(to.matched.length === 0){
    // 不匹配的路由 直接返回首页
    next('/')
  }else {
    if(to.meta.title){
      document.title = to.meta.title
    }
    next()
  }
})