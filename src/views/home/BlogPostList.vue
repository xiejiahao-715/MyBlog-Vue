<template>
  <div class="blogPostList" ref="loadingWrapRef" v-if="blogPostList">
    <BlogPost v-for="blog in blogPostList" :key="blog.id" :blog-post-info="blog"
              class="blog" scroll-trigger="true" style="visibility: hidden"></BlogPost>
  </div>
  <!-- 自带分页组件 -->
  <el-pagination
      background
      layout="prev, pager ,next ,total, jumper"
      v-model:currentPage="currentValue"
      v-model:pageSize="limitValue"
      :total="total">
  </el-pagination>
</template>

<script>
import {computed, ref, watch, nextTick, onBeforeUnmount} from "vue";
import BlogPost from '@/components/BlogPost'
import useLoading from "@/hooks/useLoading"
import {ScrollTrigger,gsap} from '@/plugin/gsapPlugin'
import {getRightBoundaryToBodyLeft,getLeftBoundaryToBodyRight} from "@/utils/elementDistance";

export default {
  name: 'BlogPostList',
  components:{
    BlogPost
  },
  emits: ['update:current','update:limit'],
  props:{
    blogPostList:{
      type: Array,
      default: null
    },
    current:{
      type: Number,
      default: 1
    },
    limit:{
      type: Number,
      default: 5,
    },
    total:{
      type: Number,
      default: 0
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props,{emit}){
    const currentValue = computed({
      get(){return props.current},
      set(value) {emit('update:current',value)}
    })
    const limitValue = computed({
      get(){return props.limit},
      set(value) {emit('update:limit',value)}
    })

    const loadingWrapRef = ref()
    const isLoadingValue = computed(()=>{
      return props.isLoading
    })
    useLoading(loadingWrapRef,isLoadingValue)

    // 存储滚动监听实例
    let scrollTriggerList = []
    const killAllScrollTrigger = ()=>{
      if(Array.isArray(scrollTriggerList) && scrollTriggerList.length>0) {
        scrollTriggerList.forEach(item => {
          item.kill()
        })
        scrollTriggerList.splice(0, scrollTriggerList.length)
      }
    }
    onBeforeUnmount(()=>{
      killAllScrollTrigger()
    })
    const slideInAnimate = (target,direction)=>{
      let translateX = 0;
      if(direction === 'right'){
        translateX = getLeftBoundaryToBodyRight(target)
      }else if(direction === 'left'){
        translateX = -getRightBoundaryToBodyLeft(target)
      }else{
        return
      }
      console.log(translateX)
      gsap.fromTo(target,{x: translateX,visibility: 'visible'},{
        duration: .6,
        x: 0
      })
    }
    // 监听数据的改变添加 滚动监听动画
    watch(()=>props.blogPostList,()=>{
      nextTick().then(()=>{
        // 清空之前的滚动监听
        killAllScrollTrigger()
        if(loadingWrapRef.value) {
          let nodeList = loadingWrapRef.value.querySelectorAll(".blogPostList>.blog[scroll-trigger='true']")
          for(let i=0;i<nodeList.length;i++){
            let target = nodeList[i]
            let direction = i%2===0 ? 'left' : 'right'
            let scrollTrigger = ScrollTrigger.create({
              trigger: target,
              start: 'top bottom',
              once: true,
              onEnter(){
                slideInAnimate(target,direction)
              }
            })
            scrollTriggerList.push(scrollTrigger)
          }
        }
      })
    },{immediate: false,deep: true})
    return {
      loadingWrapRef,
      currentValue,limitValue
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.el-pagination {
  margin-top: 15px;
  .el-pagination__total {
    margin-left: 10px;
  }
}
.blogPostList{
  min-height: 300px;
  position: relative;
  ::v-deep .el-loading-mask{
    .el-loading-spinner{
      .circular{
        height: 100px;
        width: 100%;
        animation: none;
      }
      .el-loading-text{
        font-size: 20px;
      }
    }
  }
}
</style>