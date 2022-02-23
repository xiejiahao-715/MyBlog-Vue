<template>
  <teleport to="body">
    <transition name="loading" :appear="false" css
      @before-enter="lockingScroll"
      @after-leave="unlockScroll">
      <div class="loading-wrap" v-show="loading">
        <img src="@/assets/img/loading-text.svg" alt="加载">
      </div>
    </transition>
  </teleport>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onBeforeMount} from 'vue'
export default {
  name: "Loading",
  setup(){
    const store = useStore()
    const loading = computed(()=>{
      return store.state.loading
    })
    // 锁定滚动条
    const lockingScroll =() =>{
      window.document.body.style.overflow = 'hidden'
    }
    // 解除锁定
    const unlockScroll = ()=>{
      window.document.body.style.overflow = ''
    }
    onBeforeMount(()=>{
      lockingScroll()
    })
    return {
      loading,lockingScroll,unlockScroll
    }
  }
}
</script>

<style scoped lang="scss">
.loading-wrap{
  background-image: url("~@/assets/img/loading-background.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  img{
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    margin: auto;
  }
}
.loading-enter-from{
  opacity: 1;
}
.loading-enter-active{
  transform: none;
}
.loading-enter-to{
  opacity: 1;
}

.loading-leave-from{
  opacity: 1;
}
.loading-leave-active{
  transition: opacity .4s;
}
.loading-leave-to{
  opacity: 0;
}
</style>