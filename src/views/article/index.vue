<template>
  <div class="markdown-body"  id="markdown-body" v-html="blogContent"></div>
  <ArticleDirectory></ArticleDirectory>
  <teleport to="#rightMenuTools">
    <MenuToolItem tip="下载该博客" icon-class="iconfont icon-download" @click="downloadBlog"></MenuToolItem>
  </teleport>
</template>

<script>
import {computed, shallowRef, provide, shallowReactive, nextTick, onBeforeUnmount} from "vue";
import {useRoute} from "vue-router";
import {getPublishedBlogContentByIdApi,downloadBlogApi} from "@/api/blog";
import {parseMdToHTML} from "@/plugin/markedPlugin";
import ArticleDirectory from "@/views/article/ArticleDirectory";
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";
import onLoadFinished from "@/hooks/onLoadFinished";
import lozadObserver from "@/plugin/lozadPlugin"
export default {
  name: "Article",
  components:{
    MenuToolItem,
    ArticleDirectory
  },
  setup(){
    let imageObserver = null
    onBeforeUnmount(()=>{
      if(imageObserver && imageObserver.destroy){
        imageObserver.destroy()
      }
    })
    const route = useRoute()
    const blogId = computed(()=>{
      return route.params.id || null
    })
    const blogContent = shallowRef('')
    const blogToc = shallowReactive([])
    // 将值传递给孙组件 DirectoryContent.vue
    provide('toc',blogToc)
    const getBlogContent = ()=>{
      return getPublishedBlogContentByIdApi(blogId.value)
        .then(res=>{
          let markdown = parseMdToHTML(res)
          blogContent.value = markdown.content
          if(Array.isArray(markdown.toc)) {
            blogToc.splice(0, blogToc.length, ...markdown.toc)
          }
          // 图片懒加载
          nextTick().then(()=>{
            imageObserver = lozadObserver();
            // 启用懒加载
            imageObserver.observe()
          })
        })
    }
    // 自定义的钩子函数
    onLoadFinished(async ()=>{
      await getBlogContent()
    })
    const downloadBlog = ()=>{
      downloadBlogApi(blogId.value)
    }

    return {
      blogContent,downloadBlog
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.markdown-body{
  margin-top: 10px;
  pre{
    &::-webkit-scrollbar{
      height: 4px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 4px;
    }
  }
}
</style>