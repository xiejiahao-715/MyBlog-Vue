
import {parseMdToHTML} from "@/plugin/markedPlugin";

self.addEventListener('message',event=>{
  self.postMessage(parseMdToHTML(event.data));
})