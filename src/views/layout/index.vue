<template>
  <el-config-provider :locale="locale">
    <Loading :z-index="1050"></Loading>
    <RightMenuTools></RightMenuTools>
    <Header></Header>
    <Main><router-view></router-view></Main>
    <Footer></Footer>
    <Menu></Menu>
    <TopProgress :z-index="9000"></TopProgress>

    <!--异步组件根据条件加载-->
    <ParticlesAsync></ParticlesAsync>
    <SnowflakeAsync v-model:running="snow"></SnowflakeAsync>
  </el-config-provider>
</template>

<script>
import Loading from '@/components/Loading'
import Header from '@/views/layout/header';
import Main from '@/views/layout/main';
import Footer from '@/views/layout/footer'
import TopProgress from '@/components/TopProgress';
import RightMenuTools from '@/components/RightMenuTools'
import Menu from '@/components/Menu'
import {onBeforeMount, shallowRef} from "vue";
import {useStore} from 'vuex'

import zhCn from '@/utils/ElementPlusLocaleZhCn'
import asyncLoadComponent from "@/hooks/AsyncLoadComponent";

// 异步组件
const ParticlesAsync = asyncLoadComponent(()=>import('@/components/Particles'))
const SnowflakeAsync = asyncLoadComponent(()=>import('@/components/Snowflake'))
export default {
  name: "Layout",
  components:{
    ParticlesAsync,TopProgress,Header,Main,Footer,RightMenuTools,Menu,Loading,SnowflakeAsync
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
    const snow = shallowRef(false)
    return {
      locale: zhCn,
      snow
    }
  }
}
</script>

<style scoped>

</style>
