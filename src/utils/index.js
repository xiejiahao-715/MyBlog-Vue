/*
* 防抖
* 如果短时间内大量触发同一事件，只会执行一次函数
* fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
* eg. getCouponMethod: debounce(function() {}, 1000)
*/
export const debounce = (fn, delay) =>{
  let timer = null //借助闭包
  return function() {
    let that = this
    let args = arguments
    if(timer){
      clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
    }
    timer = setTimeout(function() {
      fn.apply(that, args)
    }, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
  }
}
/*
* 节流
* 如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
* fn [function] 需要节流的函数
* delay [number] 毫秒，节流期限值
* eg. getCouponMethod: debounce(function() {}, 1000)
*/
export const throttle = (fn, delay) => {
  let valid = true
  return function() {
    let that = this
    let args = arguments
    if(!valid){
      //休息时间 暂不接客
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn.apply(that, args)
      valid = true;
    }, delay)
  }
}
/**
 * 获取时间间隔
 * start 开始的日期
 * endDate 结束的日期
 */
export function getTimeInterval(startDate, endDate = Date.now()) {
  if (arguments.length === 0) {
    return null
  }
  let startTime;
  let endTime;
  if (typeof startDate === 'object') {
    startTime = startDate.getTime();
  } else {
    startTime = startDate;
  }
  if (typeof endDate === 'object') {
    endTime = endDate.getTime();
  } else {
    endTime = endDate;
  }
  let dateInterval =  endTime - startTime;
  // //计算出相差天数
  let days = Math.floor(dateInterval / (24 * 60 * 60 * 1000));
  //计算小时数
  let hourLevel = dateInterval % (24 * 60 * 60 * 1000);
  let hours = Math.floor(hourLevel / (60 * 60 * 1000))
  //计算分钟数
  let minutesLevel = hourLevel % (60 * 60 * 1000);
  let minutes = Math.floor(minutesLevel / (60 * 1000));
  //计算秒数
  let seconds = Math.round((minutesLevel % (60 * 1000)) / 1000);
  return `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
}
/**
 * 获取页面滚动百分比
 */
export const getScrollPercent = () => {
  let scrollTo      = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, //浏览器可视窗口顶端距离网页顶端的高度（垂直偏移）
      docHeight     = document.body.scrollHeight,  //整个网页的高度
      windowHeight  = document.documentElement.clientHeight, //浏览器可视窗口的高度
      scrollPercent = (scrollTo / (docHeight-windowHeight)) * 100;
  return scrollPercent.toFixed(0);
}

/**
 * @param format
 * @param date
 */
export function dateFormat(date,format = "yyyy-MM-dd hh:mm:ss") {
  if(Number.isInteger(date))
    date = new Date(date)
  if(date instanceof Date){
    let o = {
      "M+" : date.getMonth()+1,     //月份
      "d+" : date.getDate(),     //日
      "h+" : date.getHours(),     //小时
      "m+" : date.getMinutes(),     //分
      "s+" : date.getSeconds(),     //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S" : date.getMilliseconds()    //毫秒
    };
    if(/(y+)/.test(format))
      format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return format;
  }else{
    return null
  }
}