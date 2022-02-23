<template>
  <!-- 控制侧边菜单出现的按钮 -->
  <div :class="['menu-button',isScroll ? 'menu-button-scroll': '']"
       :style="{'z-index':zIndex}"
       @click="$emit('click',$event)">
    <span v-show="!isScroll">MENU</span>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, shallowRef} from "vue";
import {throttle} from "@/utils";

export default {
  name: "MenuButton",
  emits:['click'],
  props:{
    zIndex:{
      type:Number,
      default: 1000
    }
  },
  setup(){
    // 是否滚动 滚动则控制按钮样式发生改变
    const isScroll = shallowRef(false)
    const scrollHandler = throttle(()=>{
      let topBanner = window.document.getElementById('topBanner')
      // 发生变化的阈值
      let threshold = topBanner ? (topBanner.offsetHeight - 40) : Number.MAX_VALUE
      let scrollTop = document.body.scrollTop ||window.pageYOffset || document.documentElement.scrollTop
      isScroll.value = scrollTop >= threshold;
    },200)
    onMounted(()=>{
      window.addEventListener('scroll',scrollHandler)
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('scroll',scrollHandler)
    })
    return {
      isScroll
    }
  }
}
</script>

<style scoped lang="scss">
.menu-button{
  position: fixed;
  margin: 1em;
  width: 100px;
  height: 32px;
  text-indent: 2.5em;
  background: 0 0;
  top: 6px;
  left: 10px;
  outline: 0;
  cursor: pointer;
  color: #fff;
  border: 1px solid hsla(0,0%,100%,.6);
  border-radius: 3px;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 32px;
  padding: 0 13px 0 0;
  text-align: center;
  text-shadow: none;
  font-weight: 300;
  letter-spacing: 1px;
  box-sizing: border-box;
  &:before{
    position: absolute;
    top: 12px;
    right: .5em;
    bottom: .5em;
    left: 13px;
    width: 11px;
    height: 9px;
    content: "";
    background: linear-gradient(#fff 20%,transparent 0,transparent 40%,#fff 0,#fff 60%,transparent 0,transparent 80%,#fff 0);
  }
}
.menu-button-scroll{
  left: -17px;
  width: 35px;
  color: #777aaf;
  border: 0!important;
  background-image: linear-gradient(180deg,#fff,#f5f5fa);
  -webkit-box-shadow: 0 4px 11px -2px rgb(37 44 97 / 15%),0 1px 3px 0 rgb(93 100 148 / 20%);
  box-shadow: 0 4px 11px -2px rgb(37 44 97 / 15%),0 1px 3px 0 rgb(93 100 148 / 20%);
  &:before{
    background: linear-gradient(#777aaf 20%,transparent 0,transparent 40%,#777aaf 0,#777aaf 60%,transparent 0,transparent 80%,#777aaf 0);
  }
}
@media only screen and (max-width: 720px) {
  .menu-button{
    border: none;
    margin: 0;
  }
  .menu-button-scroll{
    left: -5px;
    width: 33px;
  }
}
</style>