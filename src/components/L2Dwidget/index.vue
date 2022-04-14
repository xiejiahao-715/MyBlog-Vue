<template>
  <template></template>
</template>

<script>

import {onBeforeUnmount, onMounted} from "vue";
import {throttle} from "@/utils";

export default {
  // 看板娘组件
  name: "L2Dwidget",
  setup(){
    let resizeHandler = null
    // 模板名称
    const modelName = "haruto"
    // 模板的父路径 线上环境
    const publicPath = "https://cdn.jsdelivr.net/gh/xiejiahao-715/Resource@1.0.1/"
    // 本地测试环境
    // let publicPath = process.env.BASE_URL

    onBeforeUnmount(()=>{
      window.removeEventListener('resize',resizeHandler)
    })
    onMounted(()=>{
      // 判断设置是否为手机
      let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(!isMobile){
        // 不是手机则加载看板娘动画人物
        setTimeout(()=>{
          import('live2d-widget').then(({L2Dwidget})=>{
            let modelPath = "live2d-widget-model-" + modelName
            L2Dwidget
              .on('create-canvas',()=>{
                let modelNode = document.getElementById('live2d-widget')
                if(modelNode){
                  modelNode.style.pointerEvents = ''
                  modelNode.style.zIndex = "1070"
                }
                if(resizeHandler == null){
                  resizeHandler = throttle(() =>{
                    let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
                    if(windowWidth < 600){
                      modelNode.style.visibility = 'hidden'
                    }else{
                      modelNode.style.visibility = 'visible'
                    }
                  },300)
                  window.addEventListener('resize',resizeHandler)
                }
              }).init({
              pluginRootPath: `${publicPath}live2d-widget-models/`,
              pluginModelPath: `${modelPath}/assets/`,
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
          })
        },1000)
      }
    })
  }
}
</script>
