<template>
  <teleport to="body">
    <div class="particles">
      <div ref="particle1" class="particles-layer particles-layer--1" style="opacity: 0.07;"></div>
      <div ref="particle2" class="particles-layer particles-layer--2" style="opacity: 0.07;"></div>
      <div ref="particle3" class="particles-layer particles-layer--3" style="opacity: 0.07;"></div>
    </div>
  </teleport>
</template>

<script>
import {onBeforeUnmount, onMounted,ref} from "vue";
import {gsap} from '@/plugin/gsapPlugin';
import {throttle} from "@/utils";

export default {
  name: 'Particles',
  setup(){
    const particle1 = ref()
    const particle2 = ref()
    const particle3 = ref()
    const particlesList = [
      {el: particle1,opacity: 0.07,speed: 0.06},
      {el: particle2,opacity: 0.07,speed: 0.07},
      {el: particle3,opacity: 0.07,speed: 0.05},
    ]
    const particlesMousemove = throttle(event =>{
      let windowSize = { x: window.innerWidth / 2, y: window.innerHeight / 2}
      let mouse = { x: event.clientX || event.pageX, y: event.clientY || event.pageY}
      let move = {
        x: windowSize.x - mouse.x,
        y: windowSize.y - mouse.y
      }
      for (let i=0;i<particlesList.length;i++){
        let particle = particlesList[i]
        if(particle.el.value){
          gsap.to(particle.el.value,{
            x: move.x * particle.speed,
            y: move.y * particle.speed,
            duration: 1
          })
        }
      }
    },100)
    onMounted(()=>{
      // 初始化
      for(let i = 0;i<particlesList.length;i++){
        let particle = particlesList[i]
        if(particle.el.value){
          gsap.to(particle.el.value,{
            delay: Math.random(),
            opacity: particle.opacity,
            duration: 0.6
          })
        }
      }
      document.addEventListener("mousemove",particlesMousemove)
    })
    onBeforeUnmount(()=>{
      if(particlesMousemove){
        document.removeEventListener("mousemove",particlesMousemove)
      }
    })
    return{
      particle1,particle2,particle3
    }
  }
}
</script>

<style scoped lang="scss">
.particles{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  opacity: .6;
  z-index: -2;
  pointer-events: none;
  margin: 0;
  padding: 0;
  .particles-layer{
    position: absolute;
    top: -5%;left: -5%;
    width: 110%;
    height: 110%;
    background-repeat: repeat;
    background-position: 50%;
    opacity: 0;
    display: block;
  }
  .particles-layer--1{
    background-image: url("~@/assets/img/bg-pattern-1.svg");
  }
  .particles-layer--2{
    background-image: url("~@/assets/img/bg-pattern-2.svg");
  }
  .particles-layer--3{
    background-image: url("~@/assets/img/bg-pattern-3.svg");
  }
}
</style>