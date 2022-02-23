<template>
  <div class="home-introduce">
    <router-link class="title" :to="{name: 'home'}"><span>{{ title }}</span></router-link>
    <div class="description">{{slogan}}</div>
    <div class="author">{{notice}}</div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";
export default {
  name: 'HomeIntroduce',
  setup(){
    const store = useStore()
    const title = computed(()=>{
      return store.getters.getWebsiteName
    })
    const slogan = computed(()=>{
      return store.getters.getWebsiteSlogan
    })
    const notice = computed(()=>{
      return store.getters.getWebsiteNotice
    })
    return {
      title,slogan,notice
    }
  }

}
</script>

<style scoped lang="scss">
.home-introduce{
  position: relative;
  width: 80%;
  text-align: center;
  max-width: 800px;
  padding: 10px;
  margin: 0 auto;
  .title{
    text-decoration: none;
    cursor: pointer;
    -webkit-animation: fade-in-down 1s both;
    mix-blend-mode: screen;
    font-size: 5rem;
    font-family: Playball,cursive;
    letter-spacing: -1px;
    font-weight: 700;
    color: #fff;
    animation: fade-in-down 1s both;
    text-shadow: 0 3px 6px rgba(0,0,0,.3);
    span:hover{
      animation: textFlicker 2s infinite;
      -webkit-animation: textFlicker 2s infinite;
    }
  }
  & .author,.description{
    margin: 0;
    letter-spacing: .01rem;
    color: rgba(255,255,255,.8);
    text-shadow:0 3px 6px rgba(0,0,0,.5);
    font-weight: 400;
  }
  .description{
    display: -webkit-box;
    font-size: 2.2rem;
    -webkit-animation: fade-in-down .9s;
    animation: fade-in-down .9s both;
    -webkit-animation-delay: .3s;
    animation-delay: .3s;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
    line-height: 1.5em;
    font-family: 'Long Cang',cursive;
  }
  .author{
    display: block;
    font-size: 1.5rem;
    line-height: 1.3em;
    -webkit-animation: fade-in-down .9s;
    animation: fade-in-down .9s both;
    -webkit-animation-delay: .3s;
    animation-delay: .3s;
    font-family: 'Ubuntu Mono',monospace;
  }
}
@media only screen and (max-width: 1200px){
  .home-introduce {
    .title {
      font-size: 4rem;
      letter-spacing: -1px;
    }
    .description{
      font-size: 2rem;
      line-height: 2rem;
      -webkit-line-clamp: 4;
    }
    .author{
      font-size: 1.3rem;
      line-height: 1.3em;
    }
  }
}
@media only screen and (max-width: 720px) {
  .home-introduce{
    .title {
      font-size: 2.6rem;
    }
    .description{
      font-size: 1.6rem;
      -webkit-line-clamp: 2;
    }
    .author{
      font-size: 1rem;
    }
  }
}
@keyframes fade-in-down {
  0%{opacity: 0;-webkit-transform: translateY(-10px);transform: translateY(-10px);}
  100%{opacity: 1;-webkit-transform: translateY(0);transform: translateY(0);}
}
@keyframes textFlicker  {
  0% {text-shadow: 2px 0 0 tomato;}
  10%{text-shadow: -2px -2px 0 gold;}
  20%,100%{text-shadow: 2px 0 0 #0f0;}
  30%,70%{text-shadow: 2px 0 0 #40e0d0;}
  40%{text-shadow: 2px 2px 0 tomato;}
  50%{text-shadow: 0 -2px 0 gold;}
  60%{text-shadow: 0 2px 0 #0f0;}
  80%{text-shadow: 2px -4px 0 tomato;}
  90%{text-shadow: 2px 2px 0 gold;}
}
</style>