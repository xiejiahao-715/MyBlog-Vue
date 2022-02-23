<template>
  <div class="blogPost" v-if="blogPostInfo">
    <div class="blogTitle">
      <router-link :to="{name: 'article',params:{id: blogPostInfo.id}}">{{blogPostInfo.title}}</router-link>
      <div class="postSticky" v-if="blogPostInfo.isTop">置顶</div>
    </div>
    <div class="blogMeta">
      <i class="item iconfont icon-time"></i>发表于 {{ dateFormat(blogPostInfo.publishTime) }}
      <i class="item iconfont icon-browse"></i>阅读：{{ blogPostInfo.viewCount }}
      <i class="item iconfont icon-interactive"></i>评论：{{ blogPostInfo.commentCount }}
      <i class="item iconfont icon-blog-tag" v-if="blogCategory"></i>{{blogCategory}}
      <i class="item iconfont icon-hot" v-if="blogPostInfo.isHot"></i>
    </div>
    <div class="blogDesc">
      <p class="summary">摘要：{{blogPostInfo.summary}}</p>
      <router-link :to="{name: 'article',params:{id: blogPostInfo.id}}" class="blogHref">阅读全文 »</router-link>
    </div>
  </div>
</template>

<script>
import {dateFormat} from "@/utils";
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
  name: "BlogPost",
  props:{
    blogPostInfo: {
      type: Object,
      default: null
    }
  },
  setup(props){
    const store = useStore()
    const blogCategory = computed(()=>{
      if(props.blogPostInfo){
        return store.getters.getBlogCategoryTitleById(props.blogPostInfo.category)
      }else {
        return null
      }
    })
    return{
      dateFormat,blogCategory
    }
  }
}
</script>

<style scoped lang="scss">
.blogPost{
  margin-top: 3.5rem;
  padding-bottom: 3.3rem;
  word-break: break-word;
  border-bottom: #e9e9e9 1px solid;
  position: relative;
  .blogTitle{
    font-size: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    a{
      background-color: rgba(0,0,0,0);
      display: block;
      color: inherit;
      font-family: "Open Sans","Microsoft Jhenghei","Microsoft Yahei",sans-serif;
      font-size: 3.1rem;
      font-weight: 700;
      letter-spacing: -1px;
      word-wrap: break-word;
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
      position: relative;
      &:after{
        content: "";
        display: block;
        position: absolute;
        width: 100%; height: 2px;
        bottom: -3px;
        background-color: #8fd0cc;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
      }
      &:hover:after{
        transform: scaleX(1);
      }
    }
    .postSticky{
      font-size: 14px;
      color: #fff;
      padding: 1px 3px;
      border-radius: 3px;
      background-color: #6fa3ef;
      margin-left: 2px;
    }
  }
  .blogMeta{
    color: #888;
    margin-top: 10px;
    font-size: 14px;
    .item{
      margin: 0 5px;
      font-size: 15px;
    }
  }
  .blogDesc{
    font-feature-settings: 'liga' 1,'onum' 1,'kern' 1;
    line-height: 1.5em;
    word-wrap: break-word;
    word-break: break-all;
    margin: 20px 0 10px 0;
    font-family: "Noto Sans SC",serif;
    text-align: justify;
    font-size: 1.45em;
    .summary{
      margin-bottom: 20px;
    }
    .blogHref{
      border-bottom: 2px solid #666;
      font-size: 16px;
      transition-property: border;
      font-weight: 600;
      color: inherit;
      text-decoration: none;
    }
  }
  &:after{
    position: absolute;
    display: block;
    border: 1px solid #e9e9e9;
    margin-left: -5px;
    background-color: #FFFFFF;
    border-radius: 100%;
    box-shadow: rgba(255,255,255,.7) 0 0 0 5px;
    content: "";
    width: 7px;
    height: 7px;
    bottom: -5px;
    left: 50%;
  }
}
@media only screen and (max-width: 1200px){
  .blogPost{
    .blogTitle{
      a{font-size: 2.8rem;}
    }
    .blogDesc{
      .blogHref{
        font-size: 14px;
      }
    }
  }
}
@media only screen and (max-width: 720px){
  .blogPost{
    .blogTitle{
      a{font-size: 2.3rem;}
      .postSticky{font-size: 12px;}
    }
    .blogMeta{
      font-size: 12px;
      .item{font-size: 13px;}
    }
    .blogDesc{
      font-size: 12px;
      .blogHref{
        font-size: 13px;
        border-bottom: 1px solid #666;
      }
    }
  }
}
</style>