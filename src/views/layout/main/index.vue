<template>
  <div class="main" id="main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped lang="scss">
.main{
  width: 70%;
  max-width: 900px;
  // 设置padding-top: 0.1px是为了解决外边距重叠的问题
  padding: 0.1px 20px 30px 20px;
  margin: 0 auto;
  position: relative;

  background-color: rgba(255,255,255,.9);
  box-shadow: 0 0 20px 10px rgba(220,220,220,.3);
}
@media only screen and (max-width: 1200px) {
  .main{
    width: 85%;
    max-width: 100vw;
  }
}
@media only screen and (max-width: 960px) {
  .main{
    width: auto;
  }
}
@media only screen and (max-width: 767px){
  .main{
    width: auto;
    min-width: 0;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 0;
  }
}
@media only screen and (max-width: 720px) {
  .main{
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: unset;
  }
}
</style>