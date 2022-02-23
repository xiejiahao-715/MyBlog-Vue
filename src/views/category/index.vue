<template>
  <div class="category-title">
    <span style="margin-right: 10px">当前分类:</span>
    <el-tag>{{categoryTitle}}</el-tag>
  </div>
  <BlogPostList
      ref="test"
      v-model:current="pagination.current"
      v-model:limit="pagination.limit"
      :is-loading="isLoading"
      :blog-post-list="blogPostList"
      :total="pagination.total"></BlogPostList>
</template>

<script>
import BlogPostList from "@/views/home/BlogPostList";
import {useRoute} from 'vue-router'
import {computed, nextTick, shallowReactive, shallowRef, watch} from "vue";
import {useStore} from 'vuex'
import {getPublishedBlogPageByCategoryApi} from "@/api/blog"
import onLoadFinished from "@/hooks/onLoadFinished";
export default {
  name: "Category",
  components:{
    BlogPostList
  },
  setup(){
    // 获取分类的中文名称
    const route = useRoute()
    const store = useStore()
    const categoryId = computed(()=>{
      return route.params.id ? Number.parseInt(route.params.id) : null
    })
    const categoryTitle = computed(()=>{
      let title = store.getters.getBlogCategoryTitleById(categoryId.value)
      if(title){
        document.title = '分类 - ' + title
      }
      return store.getters.getBlogCategoryTitleById(categoryId.value)
    })
    // 分页信息
    const pagination = shallowReactive({
      current: 1,
      limit: 10,
      total: 0
    })
    const isLoading = shallowRef(false)

    const blogPostList = shallowReactive([])
    const getBlogPostList = ()=>{
      return getPublishedBlogPageByCategoryApi(pagination.current,pagination.limit,categoryId.value)
        .then(res=>{
          if(res.data && Array.isArray(res.data.blog)){
            blogPostList.splice(0,blogPostList.length,...res.data.blog)
            pagination.total = res.data.total
          }
        })
    }
    watch([()=>pagination.current,()=>pagination.limit],async ()=>{
      isLoading.value = true
      getBlogPostList().finally(()=>{ isLoading.value = false})
    },{immediate:false,deep:true})
    // 路由上分类id改变时
    watch(categoryId,async ()=>{
      // 回到第1页
      if(pagination.current === 1){
        await getBlogPostList()
      }else{
        pagination.current = 1
      }
      await nextTick()
      store.commit('setLoadingStatus', false)
    })

    onLoadFinished(async ()=>{
      await getBlogPostList()
    })

    return {
      categoryTitle,
      pagination,blogPostList,isLoading
    }
  }
}
</script>

<style scoped lang="scss">
.category-title{
  display: flex;
  align-items: center;
  height: 38px;
  font: normal normal 16px/35px "Microsoft YaHei";
  margin: 10px 0 0 0;
  ::v-deep .el-tag__content{
    font: normal normal 16px/35px "Microsoft YaHei";
  }
}
</style>