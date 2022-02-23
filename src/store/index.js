import { createStore } from 'vuex'
import {getTimeInterval} from "@/utils"
import {getSocialsApi,getWebsiteInfoApi,getBlogCategoryApi} from "@/api/baseInfo";

let timer = null
export default createStore({
  state: {
    // 网站存活的时间间隔
    runTimeInterval: '',
    // 是否处于加载状态
    loading: true,
    // 联系方式
    socials: null,
    // 网站的基本信息
    websiteInfo: null,
    // 博客的分类信息
    blogCategory: null
  },
  getters:{
    // 通过分类的id查询出博客分类的名称
    getBlogCategoryTitleById: state => id =>{
      if (Array.isArray(state.blogCategory) && id){
        let category = state.blogCategory.find(item=>item.id === id)
        if(category && category.title){
          return category.title
        }
      }
      return null
    },
    getWebsiteName(state){
      return (state.websiteInfo && state.websiteInfo.name) || '浮生Blog'
    },
    getWebsiteSlogan(state){
      return (state.websiteInfo && state.websiteInfo.slogan) || '树林中有两条路，我选择了人迹罕至的那一条。'
    },
    getWebsiteNotice(state){
      return (state.websiteInfo && state.websiteInfo.notice) || 'Two roads diverged in a wood and I took the one less traveled by.'
    }
  },
  mutations: {
    initRunTimeInterval(state,runStart){
      if(Number.isFinite(runStart) && !(timer && state.runTimeInterval)){
        clearInterval(timer)
        timer = setInterval(()=>{
          state.runTimeInterval = getTimeInterval(runStart)
        },1000)
      }
    },
    setSocials(state,value){
      state.socials = value
    },
    setWebsiteInfo(state,value){
      state.websiteInfo = value
    },
    setBlogCategory(state,value){
      state.blogCategory = value
    },
    setLoadingStatus(state,value){
      state.loading = value
    }
  },
  actions: {
    getSocials({commit}){
      getSocialsApi().then(res=>{
        commit('setSocials',res.data.socials)
      })
    },
    getWebsiteInfo({commit}){
      getWebsiteInfoApi().then(({data})=>{
        commit('setWebsiteInfo',data.info)
        if(data.info && data.info.createdTime){
          commit('initRunTimeInterval',data.info.createdTime)
        }
      })
    },
    getBlogCategory({commit}){
      getBlogCategoryApi().then(res=>{
        commit('setBlogCategory',res.data.categories)
      })
    }
  },
  modules: {
  }
})
