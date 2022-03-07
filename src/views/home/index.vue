<template>
  <BlogPostList
      v-model:current="pagination.current" v-model:limit="pagination.limit"
      :is-loading="isLoading"
      :total="pagination.total"
      :blog-post-list="blogInfoList"></BlogPostList>
</template>

<script>
import BlogPostList from "@/views/home/BlogPostList";
import { shallowReactive, shallowRef, watch} from "vue";
import {getPublishedBlogPageApi} from "@/api/blog";
import onLoadFinished from "@/hooks/onLoadFinished";
import jump from "@/plugin/jumpPlugin";
export default {
  name: 'home',
  components:{
    BlogPostList
  },
  setup(){
    const pagination = shallowReactive({
      current: 1,
      limit: 10,
      total: 0
    })
    const blogInfoList = shallowReactive([])
    const getBlogPagePublished = ()=>{
      return getPublishedBlogPageApi(pagination.current,pagination.limit)
        .then(res=>{
          if(res.data && Array.isArray(res.data.blog)){
            blogInfoList.splice(0,blogInfoList.length,...res.data.blog)
          }
          pagination.total = res.data.total
        })
    }
    const isLoading = shallowRef(false)
    watch([()=>pagination.current,()=>pagination.limit],()=>{
      isLoading.value = true
      getBlogPagePublished().finally(()=>{jump('#top-banner-end',{duration: 0});isLoading.value = false;})

    },{immediate:false,deep:true})

    onLoadFinished(async ()=>{
      await getBlogPagePublished()
    })

    return {
      blogInfoList,pagination,isLoading
    }
  }
}
</script>

<style scoped lang="scss">
</style>