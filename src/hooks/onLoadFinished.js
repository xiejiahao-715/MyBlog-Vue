import {onBeforeMount,nextTick} from 'vue'
import {useStore} from 'vuex'

// 当加载数据完毕后改变vuex中loading的状态，关闭loading动画
// fn：必须为异步方法，被async标记或者函数返回promise对象
// autoClose： 是否在执行完fn函数后关闭loading动画
export default function onLoadFinished(fn,autoClose=true){
  const store = useStore()
  onBeforeMount(async()=>{
    if(autoClose) {
      try {
        await fn()
        await nextTick()
      } finally {
        if (store.state.loading === true) {
          store.commit('setLoadingStatus', false)
        }
      }
    }else{// 不自动关闭
      fn()
    }
  })
}