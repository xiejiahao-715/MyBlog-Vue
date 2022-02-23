<template>
  <teleport to="body">
    <div class="article-directory" ref="articleDirectoryRef" :style="positionInfo">
      <el-scrollbar max-height="55vh">
        <DirectoryContent></DirectoryContent>
      </el-scrollbar>
    </div>
  </teleport>
  <!-- 将组件分发到指定位置 -->
  <teleport to="#articleDirectoryController">
    <MenuToolItem icon-class="iconfont icon-directory" tip="文章目录" @click="controlVisible"></MenuToolItem>
  </teleport>
</template>

<script>
import {onBeforeUnmount, onMounted, ref, shallowReactive, shallowRef} from "vue";
import { getTopBoundaryToBodyLeft,getRightBoundaryToBodyLeft} from "@/utils/elementDistance";
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";
import DirectoryContent from "@/views/article/DirectoryContent";
import {gsap} from '@/plugin/gsapPlugin'
export default {
  name: "ArticleDirectory",
  components: {MenuToolItem,DirectoryContent},
  props:{
    // 菜单的父容器，菜单会紧紧靠着该父容器的右边
    parentElementSelector: {
      type: String,
      default: '#main'
    },
    // 宽度单位px
    directoryDefaultWidth:{
      type: Number,
      default: 260
    },
    directoryMinWidth :{
      type:Number,
      default: 200
    }
  },
  setup(props){
    const articleDirectoryRef = ref()
    let articleDirectoryDisplay = 'block'

    // 是否开启了固定定位
    const isFixed = shallowRef(false)
    // 定位信息
    const positionInfo = shallowReactive({
      position: 'absolute',
      top: 0,
      right: 0,
      width: 0
    })
    // 目录是否为显示状态
    const isShow = shallowRef(null)
    function showDirectory(){
      gsap.fromTo(articleDirectoryRef.value,{opacity:0,display: 'none'},{opacity:1,duration: .5,display: articleDirectoryDisplay})
      isShow.value = true
    }
    function hideDirectory(){
      gsap.fromTo(articleDirectoryRef.value,{opacity:1,display: articleDirectoryDisplay},{opacity: 0,duration: .5,display: 'none'})
      isShow.value = false
    }
    // 通过点击按钮控制组件的显示与隐藏
    function controlVisible(){
      if(isShow.value === true){
        hideDirectory()
      }else if(isShow.value === false){
        showDirectory()
      }
    }
    // 模拟sticky布局
    // 窗口大小发生变化要重定义top的值
    let resizeHandler = null
    let scrollHandler = null
    onMounted(()=>{
      let parentElement = document.querySelector(props.parentElementSelector)
      resizeHandler = ()=>{
        // 右边剩余的空间宽度
        let rightWidth = document.documentElement.clientWidth - getRightBoundaryToBodyLeft(parentElement)
        let right = rightWidth - props.directoryDefaultWidth
        if(isShow.value === true && rightWidth <= props.directoryMinWidth){
          hideDirectory()
        } else if(isShow.value === false && rightWidth >props.directoryMinWidth){
          showDirectory()
        } else if(isShow.value === null){ // 初始化状态
          let directory = articleDirectoryRef.value
          if(rightWidth <= props.directoryMinWidth){
            isShow.value = false
            directory.style.display = 'none'
          }else{
            isShow.value = true
            directory.style.display = articleDirectoryDisplay
          }
        }
        positionInfo.right = (right >0 ? right : 5) + 'px'
        positionInfo.width = (rightWidth > props.directoryMinWidth &&rightWidth < props.directoryDefaultWidth ? rightWidth  : props.directoryDefaultWidth) -10  + 'px'
        if(isFixed.value === false) {
          positionInfo.top = getTopBoundaryToBodyLeft(parentElement) + 10 + 'px'
        }
      }
      scrollHandler = ()=>{
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        let topBoundaryToBody = getTopBoundaryToBodyLeft(parentElement) + 10
        if(scrollTop >= topBoundaryToBody){
          isFixed.value = true
          positionInfo.position = 'fixed'
          positionInfo.top = 10 + 'px'
        }else {
          isFixed.value = false
          positionInfo.position = 'absolute'
          positionInfo.top = topBoundaryToBody + 'px'
        }
      }
      // 初始化位置
      resizeHandler()
      scrollHandler()
      window.addEventListener('resize',resizeHandler)
      window.addEventListener('scroll',scrollHandler)
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('resize',resizeHandler)
      window.removeEventListener('scroll',scrollHandler)
    })
    return {
      positionInfo,articleDirectoryRef,controlVisible
    }
  }
}
</script>


<style scoped lang="scss">
.article-directory{
  background-color: hsla(0,0%,100%,.9);
  box-shadow: 0 4px 11px -2px rgb(37 44 97/15%),0 1px 3px 0 rgb(93 100 148/20%);
  color: #000;
  -webkit-box-shadow: 0 4px 11px -2px rgb(37 44 97/15%),0 1px 3px 0 rgb(93 100 148/20%);
}
</style>