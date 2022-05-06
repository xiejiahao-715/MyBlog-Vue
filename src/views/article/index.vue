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
import {ElMessageBox} from 'element-plus'
import addCopyCode from '@/plugin/CopyCodePlugin'

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

    // 图片的内容
    const blogContent = shallowRef('')
    // 图片目录
    const blogToc = shallowReactive([])
    // 将值传递给孙组件 DirectoryContent.vue
    provide('toc',blogToc)
    // 图片懒加载监听器
    let imageObserver = null
    onBeforeUnmount(()=>{
      if(imageObserver && imageObserver.destroy){
        imageObserver.destroy()
      }
    })
    // 渲染markdown文本和目录，开启图片的懒加载，启用图片预览
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
      // 为code代码块添加一键复制功能
      addCopyCode("#markdown-body")
    }
    // work Api 开启新线程 避免highlight.js解析卡顿
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
    // 停止work线程
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
        }).catch(()=>{
          // 重定向到主页
          router.push({name: 'home'})
        })
    }
    // 自定义的钩子函数  获取博客内容
    onLoadFinished(async ()=>{
      await getBlogContent()
    },false)

    // 下载博客的接口
    const downloadBlog = ()=>{
      ElMessageBox.confirm('下载的博客为.md格式，与所有图片一起包含在压缩包中，需要查看请先解压','下载说明',{
        type: 'info',
        confirmButtonText: '下载',
        cancelButtonText: '取消',
        draggable: true,
        roundButton: true,
      }).then(()=>{
        downloadBlogApi(blogId.value)
      }).catch(()=>{})
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
  border-radius: 6px;
  // 导入hljs提供的主题，需手动将css文件转为scss文件
  @import "~@/assets/css/markdown/hljs/atom-one-dark-reasonable.scss";
  pre{
    margin-bottom: 16px;
    code{
      // 隐藏code的滚动条
      &::-webkit-scrollbar{
        display: none;
      }
      &::-webkit-scrollbar-thumb{
        display: none;
      }
      padding: 16px;
      font-size: 85%;
      line-height: 1.45;
      border-radius: 6px;
    }
  }
  img{
    cursor: url(~@/assets/img/cursor-check.ico),pointer;
  }
}
</style>
