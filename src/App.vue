<template>
  <Loading></Loading>
  <el-config-provider :locale="locale">
    <router-view v-cloak/>
  </el-config-provider>
</template>
<script>
import Loading from '@/components/Loading'
import zhCn from '@/utils/ElementPlusLocaleZhCn'
export default {
  components:{
    Loading
  },
  setup(){
    return{
      locale: zhCn
    }
  }
}
</script>
