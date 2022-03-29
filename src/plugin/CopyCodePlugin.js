// 给pre标签下的code代码块添加一键赋值按钮
/**
 * @param parentElementSelector 父标签选择器，作用的范围，值得是为该元素下的所有pre>code标签添加一键复制按钮
 */
export default function addCopyCode(parentElementSelector) {
  // 查找所有的pre代码块
  let codeBlocks = document.querySelector(parentElementSelector).getElementsByTagName("pre");
  //循环每个pre代码块，并添加 复制代码
  for (let i = 0; i < codeBlocks.length; i++) {
    //显示 复制代码 按钮
    let currentCode = codeBlocks[i]
    currentCode.style = "position: relative;"
    let copy = document.createElement("div")
    copy.style = "position: absolute;right: 4px;\
    top: 4px;background-color: white;padding: 2px 8px;\
    margin: 8px;border-radius: 4px;cursor: pointer;\
    box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);"
    copy.innerHTML = "复制"
    currentCode.appendChild(copy)
    //让所有 "复制"按钮 全部隐藏
    copy.style.visibility = "hidden"

    //鼠标移到代码块，就显示按钮
    currentCode.onmouseover = () => {
      copy.style.visibility = "visible"
    }
    //鼠标从代码块移开 则不显示复制代码按钮
    currentCode.onmouseout = () => {
      copy.style.visibility = "hidden"
    }

    // 添加复制功能
    copy.addEventListener("click",() => {
      let code = currentCode.getElementsByTagName("code")[0];
      const range = document.createRange()
      range.selectNode(code)

      const selection = window.getSelection();
      // 如果之前有选择的范围这取消
      if (selection.rangeCount > 0){
        selection.removeAllRanges();
      }
      // 选择文本
      selection.addRange(range);
      // 执行复制
      document.execCommand('copy');
      // 清除选择
      selection.removeAllRanges()
      copy.innerHTML = "复制成功"
      setTimeout(()=>{
        copy.innerHTML = "复制"
      },1000)
    },true)
  }
}
