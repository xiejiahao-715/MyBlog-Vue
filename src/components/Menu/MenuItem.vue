<template>
  <div class="menuItem">
    <div class="label-wrapper">
      <div class="label" @click="foldOrExpandSubMenu">
        <div class="icon" v-if="iconClass"><div :class="iconClass"></div></div>
        <span>{{label}}</span>
        <div class="suffix-icon"><div  ref="suffixIconRef" class="iconfont icon-expand"></div></div>
      </div>
    </div>
    <div class="sub-menu" v-if="subMenuList" ref="subMenuRef">
      <div class="sub-menu-wrapper"
           v-for="item in subMenuList" :key="item.id">
        <div class="sub-menu-item">
          <div class="prefix-icon iconfont icon-prefix-circle"></div>
          <router-link class="label" :to="item.href" @click="$emit('click')">{{item.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, shallowRef} from "vue";
import {gsap} from '@/plugin/gsapPlugin'
export default {
  name: "MenuItem",
  props:{
    label:{
      type:String,
      required: true
    },
    iconClass:{
      type: String,
      default: null
    },
    subMenuList:{
      type: Array,
      default: null
    },
    // 动画的持续时间
    animateDuration:{
      type: Number,
      default: .2
    }
  },
  emits:['click'],
  setup(props){
    // 子菜单的dom对象
    const subMenuRef = ref()
    // 展开按钮的dom对象
    const suffixIconRef = ref()
    // 子菜单是否被展开 默认不展开
    const isExpanded = shallowRef(false)
    // 计算元素的宽度
    const computeHeight = element=>{
      let nodes = element.childNodes
      let height = 0
      for(let node of nodes){
        if(node.offsetHeight){
          height += node.offsetHeight
        }
      }
      return height
    }
    // 展开子菜单
    let suffixIconExpandTween = null,subMenuExpandTween = null
    const expandSubMenu = ()=>{
      if(isExpanded.value === false){
        isExpanded.value = true
        if(!subMenuRef.value.style.height){
          subMenuRef.value.style.height = '0px'
        }
        if(subMenuRef.value.style.display !== 'block'){
          subMenuRef.value.style.display = 'block'
        }
        let height = computeHeight(subMenuRef.value)
        if(subMenuFoldTween){
          subMenuFoldTween.kill()
        }
        if(suffixIconFoldTween){
          suffixIconFoldTween.kill()
        }
        suffixIconExpandTween = gsap.to(suffixIconRef.value, {rotate: 90, duration: props.animateDuration, ease: "power2.out"})
        subMenuExpandTween = gsap.to(subMenuRef.value,{height: height,display: 'block',duration: props.animateDuration})
      }
    }
    // 折叠自此单
    let suffixIconFoldTween = null,subMenuFoldTween = null
    const foldSubMenu = ()=>{
      if(isExpanded.value === true){
        isExpanded.value = false
        if(suffixIconExpandTween){
          suffixIconExpandTween.kill()
        }
        if(subMenuExpandTween){
          subMenuExpandTween.kill()
        }
        suffixIconFoldTween = gsap.to(suffixIconRef.value,{rotate: 0,duration: props.animateDuration,ease: "power2.out"})
        subMenuFoldTween = gsap.to(subMenuRef.value,{height: 0,display: 'none',duration: props.animateDuration})
      }
    }
    const foldOrExpandSubMenu = ()=>{
      if(subMenuRef.value) {
        if (isExpanded.value === true) {
          foldSubMenu()
        } else if (isExpanded.value === false) {
          expandSubMenu()
        }
      }
    }
    return{
      subMenuRef,foldOrExpandSubMenu,suffixIconRef
    }
  }
}
</script>

<style scoped lang="scss">
$iconRotateDeg: 10deg;
.menuItem {
  width: 100%;
  .label-wrapper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 30px 8px 20px;
    .label {
      font-size: 13px;
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      .icon {
        margin-right: 14px;
        font-size: 15px;
        min-width: 26px;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 4px;
        background-color: hsla(0, 0%, 100%, .1);
        border: none;
        margin-left: 1px;
        & > div {
          transform-origin: center center;
          transform: rotate(0);
        }
      }
      .suffix-icon {
        position: absolute;
        left: 100%;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
      &:hover {
        color: rgb(249, 249, 249);
        .icon > div {
          animation: iconShake .2s linear;
          animation-iteration-count: 3;
        }
      }
    }
  }
  .sub-menu{
    display: none;
    overflow: hidden;
    background-color: hsla(0,0%,78.4%,.1);
    margin-left: 1px;
    .sub-menu-wrapper{
      padding-left: 25px;
      font-size: 13px;
      line-height: 1.8;
      .sub-menu-item{
        display: inline-block;
        cursor: pointer;
        position: relative;
        color: #bdbdbd;
        transition: color .3s ease;
        box-sizing: border-box;
        padding: 3px 20px 3px 40px;
        .prefix-icon{
          font-weight: 400;
          font-size: 12px;
          position: absolute;
          left: 20px;
          top: 0;
          display: flex;
          align-items: center;
          height: 100%;
        }
        .label{
          text-decoration: none;
          color: inherit;
          word-break: break-all;
        }
        &:hover{
          color: rgb(249, 249, 249);
        }
      }
    }
  }
}
@keyframes iconShake {
  0%,25%,100%{
    transform: rotate(0);
  }
  25%{
    transform: rotate(-$iconRotateDeg);
  }
  75%{
    transform: rotate($iconRotateDeg);
  }
}
</style>