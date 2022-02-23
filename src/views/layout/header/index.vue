<template>
  <div class="header">
    <TopBanner :is-home="isHome">
      <template #default>
        <HomeIntroduce v-if="useHomeIntroduce"></HomeIntroduce>
        <BlogIntroduce v-else-if="useBlogIntroduce"></BlogIntroduce>
      </template>
    </TopBanner>
  </div>
</template>

<script>
import TopBanner from '@/components/TopBanner'
import HomeIntroduce from "@/components/TopBanner/HomeIntroduce";
import BlogIntroduce from "@/components/TopBanner/BlogIntroduce";
import {useRoute} from 'vue-router'
import {computed} from "vue";
export default {
  name: 'Header',
  components:{
    HomeIntroduce, TopBanner, BlogIntroduce
  },
  setup(){
    const route = useRoute()
    const useHomeIntroduce = computed(()=>{
      return !!route.meta.useHomeIntroduce
    })
    const useBlogIntroduce = computed(()=>{
      return !!route.meta.useBlogIntroduce
    })
    const isHome = computed(()=>{
      return !!route.meta.isHome
    })
    return {
      useHomeIntroduce,useBlogIntroduce,isHome
    }
  }
}
</script>

<style scoped>

</style>