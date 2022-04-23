<template>
  <!--右下角工具栏组件-->
  <teleport to="body">
    <!--主轴为垂直方向，起点在下沿。  -->
    <div class="rightMenuTools" id="rightMenuTools">
      <ToUpDown></ToUpDown>
      <BackHome></BackHome>
      <div id="articleDirectoryController" style="width: 100%"></div>
      <div id="snowflakeController" style="width: 100%"></div>
    </div>
  </teleport>
</template>

<script>
import ToUpDown from "@/components/RightMenuTools/ToUpDown";
import BackHome from "@/components/RightMenuTools/BackHome";
export default {
 name: 'RightMenuTools',
  components:{
   ToUpDown,BackHome
  }
}
</script>

<style scoped lang="scss">
.rightMenuTools{
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  flex-direction: column-reverse;
  cursor: pointer;
  position: fixed;
  bottom: 14px;
  right: 10px;
  z-index: 2;
  color: #777aaf;
  width: 40px;
}
</style>
