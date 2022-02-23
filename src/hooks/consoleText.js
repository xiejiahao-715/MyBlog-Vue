/**
 * 将要展现的文本按照规定的时间间隔逐渐输出
 * @param refObject  响应式对象，用于保存输出的字符串
 * @param text 将要输出的文本
 * @intervalTime
 */
import {isRef} from "vue";
export function consoleText(refObject,text,intervalTime = 400){
  if(isRef(refObject) && Object.prototype.toString.call(text) === "[object String]"){
    // 清空原来的值
    refObject.value = ""
    let index = 0
    let length = text.length
    let timer = setInterval(()=>{
      if(index <= length){
        refObject.value = text.substring(0,index)
        index++
      }else{
        clearInterval(timer)
      }
    },intervalTime)
  }
}