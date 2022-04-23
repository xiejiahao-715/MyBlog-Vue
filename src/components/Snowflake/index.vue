<template>
  <Teleport to="body">
    <div id="snowflake" ref="snowflakeRef" :style="{zIndex: zIndex}"></div>
  </Teleport>

  <Teleport to="#snowflakeController">
    <MenuToolItem :tip="running ? '关闭雪花特效' : '开启雪花特效'" icon-class="iconfont icon-snow" @click="changeStatus"></MenuToolItem>
  </Teleport>
</template>

<script>
import {gsap} from '@/plugin/gsapPlugin'
import {computed, shallowRef, watch} from "vue";
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";

export default {
  // 雪花飘落的组件
  name: "snowflake",
  components:{
    MenuToolItem
  },
  emits: ['update:running'],
  props:{
    zIndex:{
      type: Number,
      default: 1040,
    },
    // 是否开启特效，默认不开启
    running:{
      type: Boolean,
      required: true
    },
    minSize:{
      type: Number,
      default: 20
    },
    maxSize:{
      type: Number,
      default: 30
    },
    // 生成每一片雪花的频率，单位是ms
    rate:{
      type: Number,
      default: 1000
    },
    // 掉落动画开始到结束的时间，单位是s
    fallTime:{
      type: Number,
      default: 10
    },
    // 最大的雪花数量
    maxSnowNumber:{
      type: Number,
      default: 10
    },
  },
  setup(props,{emit}){
    // 存放雪花的容器对象
    const snowflakeRef = shallowRef()
    // 雪花的数量
    let number = 0
    // 该组件是否在运行
    const runningValue = computed({
      get() {return props.running},
      set(value) {
        emit('update:running',value)}
    })
    // 生成一个i~j的随机数
    const randomNum = (i,j)=>{
      return parseFloat(Math.random()*( j- i + 1 ) + i)
    }
    // 创建一个雪花元素节点
    const createSnow = () => {
      let snow = document.createElement('div')
      snow.classList.add('snowItem')
      snow.innerHTML = '❄'
      // 初始化大小
      snow.style.fontSize = randomNum(props.minSize,props.maxSize) + 'px'
      // 初始初始化水平位置
      let visualWidth = snowflakeRef.value.offsetWidth
      snow.style.left = randomNum(0,visualWidth - props.maxSize) + 'px'
      // 初始化垂直位置
      snow.style.top = '0px'
      return snow
    }
    const startAnimate = (snow) =>{
      // 停止动画
      function killAnimate(){
        if(animate){
          animate.kill()
        }
        if(snow){
          snow.remove()
        }
        number--;
      }
      let visualHeight = snowflakeRef.value.offsetHeight
      let animate = gsap.fromTo(snow,{
        top: 0,
        opacity: 1
      },{
        top: visualHeight,
        opacity: 0,
        duration: props.fallTime,
        onUpdate: () => {
          if(!runningValue.value){
            killAnimate()
          }
        },
        onComplete: ()=>{
          killAnimate()
        }
      })
    }
    // 初始化
    const init = ()=>{
      if(runningValue.value === true){
        let timer = setInterval(()=>{
          // 状态为false,则关闭定时器
          if(!runningValue.value){
            clearInterval(timer)
            timer = null
            return
          }
          if(number <= props.maxSnowNumber){
            let snow = createSnow()
            snowflakeRef.value.append(snow)
            startAnimate(snow)
            number++
          }
        },props.rate)
      }
    }
    // 监听状态改变
    watch(runningValue,()=>{
      init()
    },{immediate: true,deep: false})

    // 修改组件运行状态
    const changeStatus = ()=>{
      runningValue.value = !runningValue.value
    }

    return {
      snowflakeRef,changeStatus
    }
  }
}
</script>

<style lang="scss">
#snowflake{
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  .snowItem {
    position: absolute;
    color: rgb(40, 148, 255);
    animation: snow 5s infinite linear;
    -webkit-animation: snow 5s infinite linear;
  }
}
/*旋转*/
@keyframes snow {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
