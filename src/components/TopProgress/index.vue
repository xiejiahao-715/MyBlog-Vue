<template>
  <template></template>
</template>
<script>
import {onBeforeUnmount, onMounted} from "vue";
import ToProgress from "toprogress";
import {getScrollPercent, throttle} from "@/utils";

export default {
  name: 'TopProgress',
  props:{
    'z-index':{
      type: Number || 'auto',
      default: 'auto'
    }
  },
  setup(props){
    // 设置顶部导航条
    let setScrollProgress = null
    onMounted(()=>{
      let id = 'top-progress-bar'
      if(!document.getElementById(id)) {
        const progressBar = new ToProgress({
          id: id,
          color: '#77B6FF',
          height: '2px',
          duration: 0.2
        })
        let progressBarDom = window.document.getElementById(id);
        if (progressBarDom) {
          progressBarDom.style.zIndex = props.zIndex + ''
          setScrollProgress = throttle(() => {
            progressBar.setProgress(getScrollPercent())
          }, 100)
          window.addEventListener('scroll', setScrollProgress)
        }
      }
    })
    onBeforeUnmount(()=>{
      if(setScrollProgress){
        window.removeEventListener('scroll',setScrollProgress)
      }
    })
    return {}
  }
}
</script>

<style scoped>

</style>