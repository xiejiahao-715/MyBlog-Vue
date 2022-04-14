<template>
  <router-view v-cloak/>
  <L2Dwidget></L2Dwidget>
</template>
<script>
// 引入看板娘组件
import L2Dwidget from '@/components/L2Dwidget'
export default {
  components:{
    L2Dwidget
  }
}
</script>
