<template>
  <div class="theme-switch">
    <div :class="['switch-on-off',isLight ? 'light':'']" @click="changeTheme">
      <div class="star star1"></div>
      <div class="star star2"></div>
      <div class="star star3"></div>
      <div class="star star4"></div>
      <div class="star star5"></div>
      <div class="star sky"></div>
      <div class="sunMoon">
        <div class="crater crater1"></div>
        <div class="crater crater2"></div>
        <div class="crater crater3"></div>
        <div class="cloud part1"></div>
        <div class="cloud part2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {shallowRef} from 'vue'
export default {
  name: 'ThemeSwitch',
  setup(){
    // 主题切换为body添加data-theme属性，值为light或者dark 默认为light
    window.document.body.setAttribute('data-theme','light')

    const isLight = shallowRef(true)
    const changeTheme = ()=>{
      if(isLight.value === true){
        window.document.body.setAttribute('data-theme','dark')
      }else{
        window.document.body.setAttribute('data-theme','light')
      }
      isLight.value = !isLight.value
    }
    return {
     isLight,changeTheme
    }
  }
}
</script>

<style scoped lang="scss">
.theme-switch{
  display: inline-block;
  position: absolute;
  z-index: 4;
  right: 20px;
  top: 25px;
  opacity: .65;
  cursor: pointer;
  .switch-on-off{
    background-color: #324164;
    width: 65px;
    height: 25px;
    border-radius: 25px;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .1);
    border: 2px solid #1e2d50;
    overflow: hidden;
    position: relative;
    *{
      transition: all .4s ease;
    }
    .star{
      background: #5ebedb;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(20px, 5px);
    }
    .star.star1{
      transform: translate(10px, 15px) scale(.3);
      animation: starAnim1 3s -2.4s linear infinite;
    }
    .star.star2{
      transform: translate(15px, -7px) scale(.6);
      animation: starAnim2 3s -1.1s linear infinite;
    }
    .star.star3{
      transform: translate(35px, -12px) scale(.9);
      animation: starAnim3 3s -1.5s linear infinite;
    }
    .star.star4{
      transform: translate(30px, 12px) scale(.4);
      animation: starAnim4 3s -1.9s linear infinite;
    }
    .star.star5{
      transform: translate(0, 0) scale(.6);
      animation: starAnim5 3s -2.8s linear infinite;
    }
    .star.sky{
      animation: skyAnim 3s -.4s linear infinite;
    }
    .sunMoon{
      background: #f0e1a5;
      height: 16px;
      width: 16px;
      border-radius: 100%;
      border: 2px solid #ccc091;
      position: absolute;
      left: 3px;
      top: 2.5px;
      .crater{
        background: #ccc091;
        width: 5px;
        height: 5px;
        border-radius: 13px;
        position: absolute;
        left: 50%;
        top: 20%
      }
      .crater.crater1{
        left: 30%;
        top: 45%;
        transform: scale(.5);
      }
      .crater.crater2{
        left: 55%;
        top: 60%;
        transform: scale(.7);
      }
      .cloud{
        background: #fff;
        border-radius: 3px;
        position: absolute;
        opacity: 0;
        transform: translatex(-20px);
        transition-delay: 0s;
      }
      .cloud.part1{
        width: 20px;
        height: 2px;
        left: -12px;
        top: calc(50% - 1.5px);
        &:before{
          content: "";
          background: #fff;
          border-radius: 3px;
          position: absolute;
          width: 3px;
          height: 3px;
          left: 40%;
          top: -100%;
        }
        &:after{
          content: "";
          background: #fff;
          border-radius: 3px;
          position: absolute;
          width: 15px;
          height: 2px;
          left: 20%;
          top: -200%;
        }
      }
      .cloud.part2{
        width: 3px;
        height: 3px;
        left: -1px;
        top: calc(50% + .3px);
        &:before{
          content: "";
          background: #fff;
          border-radius: 3px;
          position: absolute;
          width: 18px;
          height: 2px;
          left: -8px;
          top: 100%;
        }
      }
    }
  }
  .switch-on-off.light{
    border: 2px solid #52a6bf;
    .sky{
      width: 65px;
      height: 25px;
      border-radius: 25px;
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(0, 0);
      animation: none;
    }
    .sunMoon{
      background: #ffdf61;
      border: 2px solid #d9b31c;
      left: calc(100% - 23px);
      .crater{
        transform: scale(0);
      }
      .cloud{
        opacity: 1;
        transform: translateX(0);
        transition-delay: .2s;
        animation: cloudAnim 2.5s linear infinite;
      }
    }
  }
}
@media only screen and (max-width: 720px) {
  .theme-switch{
    right: 12px;
    top: 15px;
    .switch-on-off{
      width: 50px;
      height: 18px;
      border-radius: 18px;
      .star{
        top: -50%;
      }
      .sunMoon{
        height: 12px;
        width: 12px;
        top: 1px;
        .crater{
          width: 3px;
          height: 3px;
        }
        .cloud.part1{
          width: 17px;
          &:after{
            width: 12px;
          }
        }
        .cloud.part2:before{
          width: 15px;
        }
      }
    }
    .switch-on-off.light{
      .sunMoon{
        left: calc(100% - 19px);
      }
      .sky{
        width: 50px;
        height: 18px;
        border-radius: 18px;
      }
    }
  }
}
@keyframes starAnim1 {
  0% {
    transform: translate(5px, 30px) scale(.3)
  }
  20% {
    transform: translate(8px, 17px) scale(.3)
  }
  50% {
    transform: translate(10px, 0) scale(.3)
  }
  80% {
    transform: translate(8px, -17px) scale(.3)
  }
  100% {
    transform: translate(5px, -30px) scale(.3)
  }
}
@keyframes starAnim2 {
  0% {
    transform: translate(10px, 30px) scale(.6)
  }
  20% {
    transform: translate(13px, 17px) scale(.6)
  }
  50% {
    transform: translate(15px, 0) scale(.6)
  }
  80% {
    transform: translate(13px, -17px) scale(.6)
  }
  100% {
    transform: translate(10px, -30px) scale(.6)
  }
}
@keyframes starAnim3 {
  0% {
    transform: translate(30px, 30px) scale(.9)
  }
  20% {
    transform: translate(33px, 17px) scale(.9)
  }
  50% {
    transform: translate(35px, 0) scale(.9)
  }
  80% {
    transform: translate(33px, -17px) scale(.9)
  }
  100% {
    transform: translate(30px, -30px) scale(.9)
  }
}
@keyframes starAnim4 {
  0% {
    transform: translate(25px, 30px) scale(.4)
  }
  20% {
    transform: translate(28px, 17px) scale(.4)
  }
  50% {
    transform: translate(30px, 0) scale(.4)
  }
  80% {
    transform: translate(28px, -17px) scale(.4)
  }
  100% {
    transform: translate(25px, -30px) scale(.4)
  }
}
@keyframes starAnim5 {
  0% {
    transform: translate(0, 30px) scale(.6)
  }
  20% {
    transform: translate(3px, 17px) scale(.6)
  }
  50% {
    transform: translate(5px, 0) scale(.6)
  }
  80% {
    transform: translate(3px, -17px) scale(.6)
  }
  100% {
    transform: translate(0, -30px) scale(.6)
  }
}
@keyframes skyAnim {
  0% {
    transform: translate(15px, 30px) scale(1)
  }
  20% {
    transform: translate(18px, 17px) scale(1)
  }
  50% {
    transform: translate(20px, 0) scale(1)
  }
  80% {
    transform: translate(18px, -17px) scale(1)
  }
  100% {
    transform: translate(15px, -30px) scale(1)
  }
}
@keyframes cloudAnim {
  0%, 100% {
    transform: translatex(0)
  }
  14% {
    transform: translatex(5px)
  }
  56% {
    transform: translatex(-10px)
  }
}
</style>