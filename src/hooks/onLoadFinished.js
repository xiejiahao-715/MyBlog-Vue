import {onBeforeMount,nextTick} from 'vue'
import {useStore} from 'vuex'

// 当加载数据完毕后改变vuex中loading的状态，关闭loading动画
export default function onLoadFinished(fn){
  const store = useStore()
  onBeforeMount(async()=>{
    try {
      await fn()
      await nextTick()
    }finally {
      if(store.state.loading === true) {
        store.commit('setLoadingStatus', false)
      }
    }
  })
}