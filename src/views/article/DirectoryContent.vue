<template>
  <div class="directory-content" v-if="Array.isArray(directoryList) && directoryList.length > 0">
    <div class="directory-item"
         v-for="(item,index) in directoryList" :key="item.id"
         @click="toAnchor(item.id)" :class="{'focus': activeIndex === index}">
      <span :style="{'margin-left': (item.level-1) * 8 + 'px'}">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
import {inject, onBeforeUnmount, onMounted, shallowRef} from 'vue'
import jump from "@/plugin/jumpPlugin";
import {getTopBoundaryToBodyLeft} from "@/utils/elementDistance";
export default {
  name: "DirectoryContent",
  setup(){
    // 包含目录项的数组 shallowReactive对象
    const directoryList = inject('toc')
    // 当前浏览的目录项的下标
    const activeIndex = shallowRef(-1)
    // 锚点定位到目标标题
    // 定位到元素顶部距离窗口下面 offset的距离
    const offset = 20
    const toAnchor = anchorId=>{
      jump(`#${anchorId}`,{
        offset: -offset,
        duration: 500
      })
    }
    const scrollHandler = ()=>{
      // 加2为了消除误差
      let scrollTop =  (document.documentElement.scrollTop || window.pageYOffset ||document.body.scrollTop) + 2 + offset
      let i
      for(i=0;i<directoryList.length;i++){
        let directory = document.getElementById(directoryList[i].id)
        if(directory){
          let directoryTopToBody = getTopBoundaryToBodyLeft(directory)
          if(scrollTop < directoryTopToBody){
            activeIndex.value = i -1;
            break;
          }
        }
      }
      if(i === directoryList.length){
        activeIndex.value = i - 1
      }
    }
    onMounted(()=>{
      window.addEventListener('scroll',scrollHandler)
    })
    onBeforeUnmount(()=>{
      window.addEventListener('scroll',scrollHandler)
    })
    return{
      directoryList,toAnchor,activeIndex
    }
  }
}
</script>

<style scoped lang="scss">
.directory-content{
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .directory-item{
    margin: 2px 0;
    padding: 2px 0 2px 10px;
    height: 24px;
    font-size: 1.55rem;
    line-height: 1.6;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover,&.focus{
      background-color: rgba(80,80,80,.04);
      color: #807dd4;
    }
    &:hover::after,&.focus::after{
      content: "";
      z-index: 1;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      border-left: 3px solid #807dd4;
    }
  }
}
</style>