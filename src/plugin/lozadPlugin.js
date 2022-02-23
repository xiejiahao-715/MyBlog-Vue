// 图片懒加载库
import lozad from "lozad";
// 图片预览
import Viewer from 'viewerjs';

export default function lozadObserver(){
  // 图片预览的对象
  let viewer = null
  // 图片懒加载对象
  let observer = null
  // 销毁图片预览对象
  function viewerDestroy(){
    if (viewer !== null) {
      viewer.destroy()
      viewer = null
    }
  }
  observer = lozad('.markdown-body .lozad', {
    rootMargin: '10px 0px', // syntax similar to that of CSS Margin
    threshold: 0.1, // ratio of element convergence
    enableAutoReload: true, // it will reload the new image when validating attributes changes
    loaded() {  // 加载完毕，实际图片还在pending中，页面还没显示图片
      let markdownBody = document.querySelector(".markdown-body")
      if (markdownBody) {
        if (viewer === null) {
          viewer = new Viewer(markdownBody)
        } else {
          viewer.update()
        }
      } else {
        viewerDestroy()
      }
    }
  })
  // 为observer添加销毁方法
  observer.destroy = ()=>{
    viewerDestroy()
    observer = null
  }
  return observer
}