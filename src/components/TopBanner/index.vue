<template>
  <div class="top-banner" id="topBanner" :style="{height: isHome ? '' : '40vh',backgroundImage: bannerImage ? `url(${bannerImage})` : ''}">
    <div class="vertical">
      <slot name="default"></slot>
    </div>
    <a class="scroll-down" @click="scrollDown" v-if="isHome">
      <span style="display: none;visibility: hidden">Scroll Down</span>
      <i class="scroll-down-icon iconfont icon-fanhui"></i>
    </a>
  </div>
  <ThemeSwitch></ThemeSwitch>
  <div id="top-banner-end"></div>
</template>

<script>
import jump from "@/plugin/jumpPlugin";
import ThemeSwitch from '@/components/ThemeSwitch'
import {useRoute} from 'vue-router'
import {shallowRef, watch} from 'vue'
import {getRandomBannerImageApi} from "@/api/baseInfo";
export default {
  name: 'TopBanner',
  props:{
    isHome:{
      type: Boolean,
      default: true
    }
  },
  components:{
    ThemeSwitch
  },
  setup(){
    const bannerImage = shallowRef('')
    const getBannerImage = ()=>{
      getRandomBannerImageApi()
        .then(res=>{
          bannerImage.value = res.data.src
        })
    }

    const scrollDown = ()=>{
      jump('#top-banner-end',{
        duration: 200
      })
    }
    const route = useRoute()
    watch(()=>route.fullPath,()=>{
      // console.log("TopBanner组件：  路由变化,获取新的banner图片:" + oldValue + "->"+newValue)
      // 路由变化切换背景图
      getBannerImage()
    },{immediate: true})
    return{
      scrollDown,bannerImage
    }
  }
}
</script>

<style scoped lang="scss">
.top-banner{
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgb(34, 34, 34);
  background-size: cover;
  background-clip: border-box;
  background-origin: padding-box;
  background-attachment: scroll;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 3;
  box-shadow: 0 1px 2px rgb(150 150 150 /70%);
  .vertical{
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    align-items: center;
  }
  .scroll-down{
    color: #757575;
    display: block;
    position: absolute;
    z-index: 100;
    bottom: 45px;
    left: 50%;
    margin-left: -16px;
    font-size: 34px;
    width: 34px;
    height: 34px;
    text-align: center;
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-animation: bounce 4s 2s infinite;
    animation: bounce 4s 2s infinite;
    text-decoration: none;
    &:hover{
      cursor: pointer;
    }
    .scroll-down-icon{
      color: rgba(255,255,255,.6);
      font-size: 34px !important;
      position: relative;
      bottom: 7px;
    }
  }
}
@media only screen and (max-width: 1200px){
  .top-banner{
    min-height: 240px;
    height: 60vh;
    max-height: 60vh;
    .scroll-down{
      display: none;
    }
  }
}
@media only screen and (max-width: 960px) {
  .top-banner{
    min-height: 240px;
    height: 50vh;
    max-height: 50vh;
  }
}
@media only screen and (max-width: 720px) {
  .top-banner{
    height: 40vh;
    max-height: 40vh;
  }
}
@keyframes bounce {
  0%,10%,25%,40%,50%{
    -webkit-transform: translateY(0) rotate(-90deg);
    transform: translateY(0) rotate(-90deg);
  }
  20%{
    -webkit-transform: translateY(-10px) rotate(-90deg);
    transform: translateY(-10px) rotate(-90deg);
  }
  30%{
    -webkit-transform: translateY(-5px) rotate(-90deg);
    transform: translateY(-5px) rotate(-90deg);
  }
}
</style>