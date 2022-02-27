<template>
  <div class="markdown-body"  id="markdown-body" v-html="blogContent"></div>
  <ArticleDirectory></ArticleDirectory>
  <teleport to="#rightMenuTools">
    <MenuToolItem tip="下载该博客" icon-class="iconfont icon-download" @click="downloadBlog"></MenuToolItem>
  </teleport>
</template>

<script>
import {computed, shallowRef, provide, shallowReactive, nextTick, onBeforeUnmount} from "vue";
import {useRoute,useRouter} from "vue-router";
import {useStore} from 'vuex'
import {getPublishedBlogContentByIdApi,downloadBlogApi} from "@/api/blog";
import ArticleDirectory from "@/views/article/ArticleDirectory";
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";
import onLoadFinished from "@/hooks/onLoadFinished";
import lozadObserver from "@/plugin/lozadPlugin"

// 引入worker启动新线程解卡顿
import Worker from '@/plugin/parseMdToHTML.worker'

export default {
  name: "Article",
  components:{
    MenuToolItem,
    ArticleDirectory
  },
  setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const blogId = computed(()=>{
      return route.params.id || null
    })

    // 图片懒加载监听器
    let imageObserver = null
    onBeforeUnmount(()=>{
      if(imageObserver && imageObserver.destroy){
        imageObserver.destroy()
      }
    })

    // 渲染markdown文本和目录
    const blogContent = shallowRef('')
    const blogToc = shallowReactive([])
    // 将值传递给孙组件 DirectoryContent.vue
    provide('toc',blogToc)
    const renderMarkdown = async markdown=>{
      if(Array.isArray(markdown.toc)) {
        blogToc.splice(0, blogToc.length, ...markdown.toc)
      }
      blogContent.value = markdown.content
      await nextTick()
      // 启用懒加载
      imageObserver = lozadObserver();
      imageObserver.observe()
      // 关闭全局的加载状态
      store.commit('setLoadingStatus', false)
    }
    // work Api 开启线程
    let worker = undefined
    function startWork(content){
      if(worker === undefined){
        worker = new Worker()
        let timer = setTimeout(()=>{
          if(worker){
            stopWork()
          }
          clearInterval(timer)
        },6000)
        worker.addEventListener('message',event=>{
          stopWork()
          clearInterval(timer)
          renderMarkdown(event.data)
        })
        worker.postMessage(content)
      }
    }
    function stopWork(){
      if(worker){
        worker.terminate()
      }
      worker = undefined
    }

    // 获取博客的具体内容
    const getBlogContent = ()=>{
      return getPublishedBlogContentByIdApi(blogId.value)
        .then(res=>{
          startWork(res)
        })
        .catch(()=>{
          // 重定向到主页
          router.push({name: 'home'})
        })
    }

    // 自定义的钩子函数  获取博客内容
    onLoadFinished(async ()=>{
      await getBlogContent()
    },false)
    const downloadBlog = ()=>{
      downloadBlogApi(blogId.value)
    }

    return {
      blogContent,downloadBlog,renderMarkdown
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