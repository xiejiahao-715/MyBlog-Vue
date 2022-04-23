<template>
  <!--当不是首页时显示-->
  <MenuToolItem v-if="!isHome" :tip="tip" icon-class="iconfont icon-home" @click="backHome" icon-id="backHomeIcon"></MenuToolItem>
</template>

<script>
import MenuToolItem from "@/components/RightMenuTools/MenuToolItem";
import {useRoute,useRouter} from 'vue-router'
import {computed} from 'vue'
export default {
  name: "BackHome",
  components:{
    MenuToolItem
  },
  setup(){
    let tip = '回到首页'
    const route = useRoute()
    const router = useRouter()
    // 是否为首页
    const isHome = computed(()=>{
      return !!route.meta.isHome
    })
    const backHome = ()=>{
      router.push({name: 'home'})
    }
    return {
      isHome,backHome,tip
    }
  }
}
</script>

<style scoped lang="scss">
// 样式穿透添加动画
.tool-item:hover{
  ::v-deep #backHomeIcon{
    transform-origin: 50% 50%;
    animation: swing .8s linear infinite;
  }
}
@keyframes swing{
  0%{
    transform: rotate(0);
  }
  20%{
    transform: rotate(20deg);
  }
  40%{
    transform: rotate(0);
  }
  60%{
    transform: rotate(-20deg);
  }
  80%,100%{
    transform: rotate(0);
  }
}
</style>
