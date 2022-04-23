<template>
  <teleport to="body">
    <div id="live2d-wrapper"></div>
  </teleport>
</template>

<script>

import {onBeforeUnmount, onMounted, shallowRef} from "vue";
import {throttle} from "@/utils";

export default {
  // 看板娘组件
  name: "L2Dwidget",
  props:{
    zIndex: {
      type: Number,
      default: 1070
    }
  },
  setup(props){
    // 是否加载完整
    const initComplete =  shallowRef(false);
    let resizeHandler = null
    // 模板名称
    const modelName = "haruto"
    // 模板的父路径 线上环境
    const publicPath = "https://cdn.jsdelivr.net/gh/xiejiahao-715/Resource@1.0.1/"
    // 本地测试环境
    // let publicPath = process.env.BASE_URL

    onBeforeUnmount(()=>{
      window.removeEventListener('resize',resizeHandler)
      initComplete.value = false
    })
    onMounted(()=>{
      import('live2d-widget-xjh').then(({L2Dwidget})=>{
        let modelPath = "live2d-widget-model-" + modelName
        setTimeout(()=>{
          L2Dwidget
              .on('create-canvas',()=>{
                let modelNode = document.getElementById('live2d-widget')
                if(modelNode){
                  modelNode.style.pointerEvents = ''
                  modelNode.style.zIndex = props.zIndex + ''
                }
                if(resizeHandler == null){
                  resizeHandler = throttle(() =>{
                    let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
                    if(windowWidth < 600){
                      modelNode.style.display = 'none'
                    }else{
                      modelNode.style.display = ''
                    }
                  },300)
                  window.addEventListener('resize',resizeHandler)
                }
                initComplete.value = true
              }).init({
            // pluginRootPath: `${publicPath}live2d-widget-models/`,
            // pluginModelPath: `${modelPath}/assets/`,
            root: '#live2d-wrapper',
            model: {
              jsonPath: `${publicPath}live2d-widget-models/${modelPath}/assets/${modelName.replaceAll('/','')}.model.json`,
              scale: 0.7,
            },
            mobile: {
              show: false
            },
            display:{
              position: 'left',
              width: 200,
              height: 240,
            }
          })
        },1000)
      })
    })
    return {
      initComplete
    }
  }
}
</script>
