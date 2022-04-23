<template>
  <router-view v-cloak/>
  <L2DwidgetAsync :z-index="1070"></L2DwidgetAsync>
</template>
<script>

import asyncLoadComponent from "@/hooks/AsyncLoadComponent";
// 引入看板娘组件
const L2DwidgetAsync = asyncLoadComponent(()=>import('@/components/L2Dwidget'))
export default {
  components:{
    L2DwidgetAsync
  },
}
</script>
