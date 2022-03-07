<template>
  <div class="blog-introduce" v-if="blogInfo">
    <div class="title">{{ blogTitle }}<span class="blink"> _</span></div>
    <div class="meta">
      <i class="item iconfont icon-time"></i>{{dateFormat(blogInfo.publishTime,'yyyy-M-d hh:mm:ss')}}
      <i class="item iconfont icon-browse"></i>{{ blogInfo.viewCount }}
      <i class="item iconfont icon-interactive"></i>{{blogInfo.commentCount}}
      <i class="item iconfont icon-blog-tag" v-if="blogCategory"></i>{{blogCategory}}
    </div>
    <div class="update-time" v-if="blogInfo.updateTime && blogInfo.publishTime !== blogInfo.updateTime">{{'最近更新: '+ dateFormat(blogInfo.updateTime)}}</div>
  </div>
</template>

<script>
import {getPublishedBlogByIdApi} from "@/api/blog";
import {computed, onBeforeMount,  shallowRef} from "vue";
import {useRoute} from "vue-router";
import {consoleText} from "@/hooks/consoleText";
import {dateFormat} from "@/utils";
import {useStore} from 'vuex'
export default {
  name: "BlogIntroduce",
  setup(){
    const route = useRoute()
    const blogId = computed(()=>{
      return route.params.id || null
    })
    const blogInfo = shallowRef(null)
    const blogTitle = shallowRef('')
    const getBlogInfo = ()=>{
      return getPublishedBlogByIdApi(blogId.value)
        .then(res=>{
          blogInfo.value  = res.data.blog
          consoleText(blogTitle,res.data.blog.title)
          // 修改标题
          document.title = res.data.blog.title
        })
    }
    onBeforeMount(()=>{
      getBlogInfo()
    })
    const store = useStore()
    const blogCategory = computed(()=>{
      if(blogInfo.value && blogInfo.value.category){
        return store.getters.getBlogCategoryTitleById(blogInfo.value.category)
      }else {
        return null
      }
    })
    return{
      blogInfo,blogTitle,dateFormat,blogCategory
    }
  }
}
</script>

<style scoped lang="scss">
.blog-introduce{
  position: relative;
  width: 80%;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  color: #FFFFFF;
  .title{
    font-size: 3.55rem;
    letter-spacing: -1px;
    font-weight: 700;
    font-family: "Open Sans",sans-serif;
    text-shadow: 0 3px 6px rgba(0,0,0,.3);
    .blink{
      animation: blink 1s linear infinite;
      -webkit-animation: blink 1s linear infinite;
      -moz-animation: blink 1s linear infinite;
      -o-animation: blink 1s linear infinite;
    }
  }
  .meta{
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,.9);
    font-family: Noto Sans SC,serif;
    text-shadow: 0 3px 6px rgb(0 0 0 / 50%);
    margin-bottom: 10px;
    .item{
      margin: 0 5px;
    }
  }
  .update-time{
    display: inline;
    font-size: 15px;
    background-color: #6fa3ef;
    border-radius: 4px;
    padding: 0 5px;
  }
}
@media only screen and (max-width: 1200px) {
  .blog-introduce{
    .title{
      font-size: 3.3rem;
    }
    .meta{
      font-size: 15px;
    }
  }
}
@media only screen and (max-width: 720px) {
  .blog-introduce{
    .title{
      font-size: 2.8rem;
    }
    .meta{
      font-size: 13px;
      margin-bottom: 5px;
    }
    .update-time{
      font-size: 12px;
    }
  }
}
@keyframes blink{
  0%{opacity: 1;}
  100%{opacity: 0;}
}
@-webkit-keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
@-moz-keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
@-ms-keyframes blink {
  0% {opacity: 1; }
  100% { opacity: 0;}
}
@-o-keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>