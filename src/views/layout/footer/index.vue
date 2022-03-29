<template>
  <div class="footer">
    <div class="background"></div>
    <div class="content">
      <div class="runTime" v-if="runTimeInterval">
        本站已苟活 {{runTimeInterval}}
        <span class="my-face">ღゝ◡╹)ノ♡</span>
      </div>
      <div class="social-icon" v-if="socialsList && socialsList.length">
        <div v-for="item in socialsList" :key="item.id">
          <a target="_blank" class="out-link"
             :href="item.href" :style="item.color ? `--hover-color : ${item.color}` : ''" style="margin-right: 15px;">
            <i class="iconfont" :class="item.icon" style="margin-right: 5px;"></i>{{item.title}}
          </a>
        </div>
      </div>
      <div class="copyright">
          Copyright © 2022<a class="out-link" target="_blank" href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory">BNDong / Cnblogs-Theme-SimpleMemory</a>
      </div>
      <div class="legalize">
        <div class="icp"><a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022004181号-1</a></div>
        <div  class="policy">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011402000618">
            <img src="@/assets/img/police.png"  alt="policy.png"/><span>鄂公网安备 42011402000618号</span>
          </a>
        </div>
        <div class="icp" style="width: 100%;margin-top: 5px;">ICP主体：<a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022004181号</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
  name: 'Footer',
  setup(){
    const store = useStore()

    // 设置信息列表包含了图标以及相应的链接
    const socialsList = computed(()=>{
      return store.state.socials || null
    })

    const runTimeInterval = computed(()=>{
      return store.state.runTimeInterval || null
    })
    return{
      socialsList,runTimeInterval
    }
  }
}
</script>

<style scoped lang="scss">
.footer{
  margin-top: 15px;
  padding: 10vh 2% 2% 2%;
  font-size: 14px;
  color: #888888;
  position: relative;
  a.out-link {
    color: inherit;
    text-decoration: none;
    --hover-color: #f60;
    &:hover{
      color: var(--hover-color);
    }
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -5;
    background-image: url("~@/assets/img/footer.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .content{
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div:not(:last-of-type){
      margin-bottom: 15px;
    }
    .runTime{
      text-align: center;
      &:hover{
        cursor: default;
      }
      .my-face{
        animation: my-face 5s infinite ease-in-out;
        display: inline-block;
        margin: 0 5px;
      }
    }
    .social-icon{
      text-align: center;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .copyright{
      text-align: center;
    }
    .legalize{
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      a{
        text-decoration: none;
        color: inherit;
        &:hover{
          color: #58a6ff;
        }
      }
      .policy{
        margin-left: 10px;
        a{
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
@keyframes my-face {
  2%, 24%, 80% {
    transform: translate(0, 1.5px) rotate(1.5deg)
  }
  4%, 68%, 98% {
    transform: translate(0, -1.5px) rotate(-.5deg)
  }
  38%, 6% {
    transform: translate(0, 1.5px) rotate(-1.5deg)
  }
  8%, 86% {
    transform: translate(0, -1.5px) rotate(-1.5deg)
  }
  10%, 72% {
    transform: translate(0, 2.5px) rotate(1.5deg)
  }
  12%, 64%, 78%, 96% {
    transform: translate(0, -.5px) rotate(1.5deg)
  }
  14%, 54% {
    transform: translate(0, -1.5px) rotate(1.5deg)
  }
  16% {
    transform: translate(0, -.5px) rotate(-1.5deg)
  }
  18%, 22% {
    transform: translate(0, .5px) rotate(-1.5deg)
  }
  20%, 36%, 46% {
    transform: translate(0, -1.5px) rotate(2.5deg)
  }
  26%, 50% {
    transform: translate(0, .5px) rotate(.5deg)
  }
  28% {
    transform: translate(0, .5px) rotate(1.5deg)
  }
  30%, 40%, 62%, 76%, 88% {
    transform: translate(0, -.5px) rotate(2.5deg)
  }
  32%, 34%, 66% {
    transform: translate(0, 1.5px) rotate(-.5deg)
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg)
  }
  44%, 70% {
    transform: translate(0, 1.5px) rotate(.5deg)
  }
  48%, 74%, 82% {
    transform: translate(0, -.5px) rotate(.5deg)
  }
  52%, 56%, 60% {
    transform: translate(0, 2.5px) rotate(2.5deg)
  }
  58% {
    transform: translate(0, .5px) rotate(2.5deg)
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg)
  }
  90% {
    transform: translate(0, 2.5px) rotate(-.5deg)
  }
  92% {
    transform: translate(0, .5px) rotate(-.5deg)
  }
  94% {
    transform: translate(0, 2.5px) rotate(.5deg)
  }
  0%, 100% {
    transform: translate(0, 0) rotate(0)
  }
}
</style>
