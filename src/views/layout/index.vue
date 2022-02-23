<template>
  <RightMenuTools></RightMenuTools>
  <Header></Header>
  <Main><router-view></router-view></Main>
  <Footer></Footer>
  <Menu></Menu>
  <Particles></Particles>
  <TopProgress :z-index="9000"></TopProgress>
</template>

<script>
import Header from '@/views/layout/header';
import Main from '@/views/layout/main';
import Footer from '@/views/layout/footer'
import Particles from "@/components/Particles";
import TopProgress from '@/components/TopProgress';
import RightMenuTools from '@/components/RightMenuTools'
import Menu from '@/components/Menu'
import {onBeforeMount} from "vue";
import {useStore} from 'vuex'
export default {
  name: "Layout",
  components:{
    Particles,TopProgress,Header,Main,Footer,RightMenuTools,Menu
  },
  setup(){
    // 初始化vuex必备的一些信息
    const store = useStore()
    onBeforeMount(()=>{
      // 初始化社交信息
      store.dispatch('getSocials')
      // 获取网站信息
      store.dispatch('getWebsiteInfo')
      // 获取博客分类信息
      store.dispatch('getBlogCategory')
    })
  }
}
</script>

<style scoped>

</style>