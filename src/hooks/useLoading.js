import {watch, isRef} from 'vue'
import { ElLoading } from 'element-plus'
import store from '@/store'
import 'element-plus/theme-chalk/el-loading.css';
/**
 @target：Loading 动画需要覆盖的 DOM 对象(ref 对象)
 @isLoading：表示数据是否正在加载 (ref 对象)
 **/
// svg图标字符串
import svg from '@/utils/v-loading-icon'
export default function useLoading(target, isLoading) {
  if(isRef(target) && isRef(isLoading)){
    let loadingInstance = null
    watch([isLoading, target], newValue => {
      // 当全局的加载完成时才开启
      if (store.state.loading === false && newValue[0] && newValue[1]) {
        // console.log('v-loading开启')
        loadingInstance = ElLoading.service({
          target: newValue[1].$el || newValue[1], // 需要获取DOM 节点
          fullscreen: false,
          text: '数据加载中',
          spinner: svg,
          svgViewBox: '0 0 100 100'
        })
      } else if(newValue[0] === false) {
        if (loadingInstance) {
          // console.log('v-loading关闭')
          loadingInstance.close()
          loadingInstance = null
        }
      }
    }, { immediate: true})
  }
}