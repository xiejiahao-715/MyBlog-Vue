// 有关 dom 元素节点距离的相关操作

/**
 * 得到一个节点上边界距离body的高度  上边界从border-top开始算 到body顶部
 * @param element dom节点元素  该节点不能脱离文档流
 */
export function getTopBoundaryToBodyLeft(element){
  let distance = element.offsetTop
  let parentNode = element.offsetParent
  while (parentNode){
    distance += parentNode.offsetTop
    parentNode = parentNode.offsetParent
  }
  return distance
}

// 得到一个节点右边界距离body的高度  右边界从border-right开始算 到body左边
export function getRightBoundaryToBodyLeft(element){
  // offsetWidth包含了 width + padding + border
  // 具体情况参考 https://www.runoob.com/jsref/prop-element-offsettop.html
  let distance = element.offsetWidth + element.offsetLeft
  let parentNode = element.offsetParent
  while (parentNode){
    distance += parentNode.offsetLeft
    parentNode = parentNode.offsetParent
  }
  return distance
}


export function getLeftBoundaryToBodyLeft(element){
  let distance = element.offsetLeft
  let parentNode = element.offsetParent
  while (parentNode){
    distance += parentNode.offsetLeft
    parentNode = parentNode.offsetParent
  }
  return distance
}

export function getLeftBoundaryToBodyRight(element){
  return document.documentElement.clientWidth - getLeftBoundaryToBodyLeft(element)
}