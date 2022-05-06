// 解析Markdown文档为html
// 采用cdn引入
// import marked from 'marked'
// import hljs from 'highlight.js'

import {marked} from "marked";
import hljs from "highlight.js"

marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true,
  gfm: true,
  headerIds:false,
  // highlight: function(code) {
  //   return hljs.highlightAuto(code).value;
  // }
})
class TOC{
  constructor() {
    this.toc = []
    this.index = 0
  }
  add(text,level){
    // 锚点的名称
    let anchor = `toc-${level}-${++this.index}`
    this.toc.push({
      id: anchor,
      label: text,
      level
    })
    return anchor
  }
}

// 将.md格式的字符串解析为HTML格式
export function parseMdToHTML(content){
  // 初始化TOC（目录结构） 最多三层目录结构(h1,h2,h3)
  let tocObj = new TOC()
  const renderer = {
    heading(text, level) {
      if(level<=3){
        let anchor = tocObj.add(text,level)
        return `<h${level}><a id="${anchor}"></a>${text}</h${level}>`
      }else{
        return false;
      }
    },
    link(href,title,text){
      return `<a target="_blank" href="${href}">${text}</a>`
    },
    image(href,title,text){
      return `<img class="lozad" data-src="${href}" alt="${text}" />`
    },
    html(text){
      let pattern = new RegExp('(<img\\b.*?)src="(.*?)"(.*?/?>)',"g")
      return text.replaceAll(pattern, '$1 data-src="$2" class="lozad" $3')
    },
    // 自定义渲染代码块
    code(code,language){
      // 代码解析后的html文本
      let codeHtml = null
      // 解析后code标签上存在的class,默认存在hljs
      let classList = ['hljs']
      if(typeof(language)==='string' && hljs.getLanguage(language)){
        codeHtml = hljs.highlight(code,{language: language}).value
        classList.push(`language-${language}`)
      }else {
        codeHtml = hljs.highlightAuto(code).value
      }
      // 将类的数组转换为字符串
      classList = classList.join(' ')
      return `<pre style="position: relative"><code class="${classList}">${codeHtml}</code></pre>`
    }
  }
  marked.use({renderer})
  return {
    content: marked.parse(content),
    toc: tocObj.toc
  }
}
