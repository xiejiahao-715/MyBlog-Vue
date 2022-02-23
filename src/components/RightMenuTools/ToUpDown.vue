<template>
  <MenuToolItem icon-class="iconfont icon-toUpDown" :tip="tipText" :icon-id="iconId" @click="toUpDownBtn"></MenuToolItem>
</template>

<script>
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";
import {onBeforeUnmount, onMounted, shallowRef,computed} from "vue";
import jump from "jump";
import {gsap} from '@/plugin/gsapPlugin'
import {throttle} from "@/utils";

export default {
  name: "ToUpDown",
  components:{
    MenuToolItem
  },
  setup(){
    let iconId = 'to-up-down-icon'
    // 是否为回到底部的按钮状态，为true则是
    const isToBottomStatus = shallowRef(true)
    const tipText = computed(()=>{
      return isToBottomStatus.value ? '跳至底部' : '回到顶部'
    })
    const toUpDownBtn = ()=>{
      let scrollTop = document.body.scrollTop ||window.pageYOffset || document.documentElement.scrollTop
      if(isToBottomStatus.value){
        let scrollHeight = document.documentElement.scrollHeight
        let clientHeight = document.documentElement.clientHeight
        let lastTop =scrollHeight - scrollTop - clientHeight
        jump(lastTop,{duration: 500})
      }else{
        jump(-scrollTop,{duration: 500})
      }
    }

    const changeStatus = throttle(() =>{
      let topBanner = window.document.getElementById('topBanner')
      let threshold = topBanner ? (topBanner.offsetHeight - 40) : -1
      let scrollTop = document.body.scrollTop ||window.pageYOffset || document.documentElement.scrollTop
      isToBottomStatus.value = scrollTop < threshold
      let deg = isToBottomStatus.value ? 0 : 180
      gsap.to(`#${iconId}`,{
        rotate: deg,
        duration: 0.5
      })
    },200)
    onMounted(()=>{
      window.addEventListener('scroll',changeStatus)
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('scroll',changeStatus)
    })
    return {
      toUpDownBtn,tipText,iconId
    }
  }
}
</script>

<style scoped>

</style>