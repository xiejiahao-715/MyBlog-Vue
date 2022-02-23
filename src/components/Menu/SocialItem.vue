<template>
  <a v-if="socialInfo" :href="socialInfo.href" target="_blank" class="socialItem">
    <div class="icon">
      <div :class="['iconfont',socialInfo.icon]"></div>
    </div>
    <span>{{socialInfo.title}}</span>
    <div v-if="index" class="roman-index">{{LuoMaIndex}}</div>
  </a>
</template>

<script>
import {computed} from "vue";

export default {
  name: "SocialItem",
  props:{
    socialInfo:{
      type: Object || null,
      default: null
    },
    index:{
      type: Number || null,
      default: null
    }
  },
  setup(props){
    // 罗马数字转换
    function convert(num) {
      if(num > 3999 || num < 0){
        return "超出计算范围！";
      }
      let strNum = num + "";
      let result ="";
      for(let i = 0; i < strNum.length;i++){
        let data = strNum.charAt(i);
        if(data === "0"){
          continue;
        }
        result+= getLuoma(parseInt(data) - 1,strNum.length - i - 1);
      }
      return result;
    }
    function getLuoma(num,pos){
      let gearr = ["I","II","III","IV","V","VI","VII","VIII","IX"];
      let shiarr = ["X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
      let baiarr = ["C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
      let qianarr = ["M","MM","MMM"];
      let data = [];
      data.push(gearr,shiarr,baiarr,qianarr);
      return  data[pos][num];
    }
    const LuoMaIndex = computed(()=>{
      return convert(props.index)
    })
    return{
      LuoMaIndex
    }
  }
}
</script>

<style scoped lang="scss">
$iconRotateDeg: 10deg;
.socialItem{
  display: flex;
  align-items: center;
  margin: 0 33px 0 20px;
  padding: 8px 0 8px 0;
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  position: relative;
  .icon{
    display: block;
    margin-right: 14px;
    font-size: 15px;
    min-width: 26px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 4px;
    background-color: hsla(0,0%,100%,.1);
    border: none;
    margin-left: 1px;
    &>.iconfont{
      transform-origin: center center;
      transform: rotate(0);
    }
  }
  &:after{
    content: " .................................................................................................";
    color: hsla(0,0%,100%,.1);
    width: 300px;
    margin-left: 7px;
    white-space: nowrap;
    overflow: hidden;
    height: 100%;
    text-overflow: clip;
  }
  .roman-index{
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  &:hover{
    color: rgb(249, 249, 249);
    .icon>.iconfont{
      animation: iconShake .2s linear;
      animation-iteration-count: 3;
    }
  }
}
@keyframes iconShake {
  0%,25%,100%{
    transform: rotate(0);
  }
  25%{
    transform: rotate(-$iconRotateDeg);
  }
  75%{
    transform: rotate($iconRotateDeg);
  }
}
</style>