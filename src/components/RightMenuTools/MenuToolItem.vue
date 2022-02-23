<template>
  <div class="tool-item" @click="$emit('click')">
    <div class="right-tip">{{tip}}</div>
    <div class="tool-icon" :id="iconId">
      <i :class="iconClass"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuToolItem",
  emits: ['click'],
  props:{
    tip:{
      type: String,
      default: ''
    },
    iconClass:{
      type: String,
      required: true
    },
    iconId:{
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
$height: 40px;
$triangleWidth: 5px;
$rightTipBgColor: #1b1c1d;
$tipHeight: $height * 0.7;
.tool-item{
  margin-top: 5px;
  color: #777aaf;
  background-color: white;
  width: 100%;
  height: $height;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 4px 11px -2px rgb(37,44,97,.15),0 1px 3px 0 rgb(93,100,148,.2);
  -webkit-box-shadow: 0 4px 11px -2px rgb(37,44,97,.15%),0 1px 3px 0 rgb(93,100,148,.2);
  position: relative;
  .right-tip{
    transform: translateY(1px);
    display: none;
    position: absolute;
    white-space: nowrap;
    opacity: .9;
    right: 100%;
    height: $tipHeight;
    line-height: $tipHeight;
    top: 0; bottom: 0;
    margin: auto $triangleWidth auto 0;
    font-size: 14px;
    font-weight: 400;
    padding: 0 10px;
    background-color: $rightTipBgColor;
    color: #fff;
    box-shadow: 0 0 6px -1px rgba(140,146,163,.5);
    -webkit-box-shadow: 0 0 6px -1px rgba(140,146,163,.5);
    border-radius: 3px;
    // 添加右侧
    // 三角形
    &::after{
      content: '';
      display: block;
      position: absolute;
      left: 100%;
      top: 0; bottom: 0;
      margin: auto 0;
      width: 0;
      height: 0;
      border-top: $triangleWidth solid transparent;
      border-left: $triangleWidth solid $rightTipBgColor;
      border-bottom: $triangleWidth solid transparent;
    }
  }
  &:hover .right-tip{
    display: block;
  }
  .tool-icon{
    border-radius: 50%;
    i{
      font-weight: 600;
      font-size: 25px;
      line-height: $height;
    }
  }
}
</style>