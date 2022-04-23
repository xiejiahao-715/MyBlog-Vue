import {defineAsyncComponent} from 'vue'
import {isMobile} from "@/utils";

/**
 * 封装的异步加载组件的方法
 * @param getResource: 获取异步加载组件的方法(返回一个promise对象)，例如 ()=>import("xxx")
 * @param isLoad:是否加载选择的组件
 * @param delay: 延迟加载组件的时间，单位是ms
 * @return 返回vue3使用的异步组件技术
 */
export default function asyncLoadComponent(getResource,delay = 0,isLoad = !isMobile()){
  return defineAsyncComponent(() => {
    const errorMsg = '手机端无须加载组件'
    return new Promise((resolve, reject) => {
      if (isLoad) {
        setTimeout(()=>{
          getResource().then(component => {
            // console.log("异步加载组件完成")
            resolve(component)
          }).catch(() => {
            reject(errorMsg)
          })
        },delay)
      } else {
        reject(errorMsg)
      }
    })
  });
}
