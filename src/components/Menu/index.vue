<template>
  <teleport to="body">
    <MenuButton @click="openMenu"></MenuButton>
    <!--遮罩层-->
    <div class="mask" v-show="isShowMenu" @click="closeMenu"></div>
    <!-- 左侧菜单 -->
    <div class="menu-wrap" ref="menuWrapRef" :style="{width: menuWidth+'px',transform: `translateX(${-menuWidth+'px'})` }">
      <el-scrollbar>
        <div class="menu-content">
          <div class="header">
            <i class="iconfont icon-broadcast prefix-icon"></i>
            <span class="title">{{ menuHeaderTitle}}</span>
            <i class="iconfont icon-close suffix-icon" style="margin-left: auto;cursor: pointer" @click="closeMenu"></i>
          </div>
          <div class="introduce">
            <el-avatar :size="30" :src="avatar"></el-avatar>
            <router-link :to="{name: 'home'}" @click="resetMenu" class="name">{{this.$store.getters.getWebsiteName}}</router-link>
          </div>
          <div class="socials" v-if="this.$store.state.socials">
            <template v-for="(social,index) in this.$store.state.socials" :key="social.id">
              <SocialItem :social-info="social" :index="index+1"></SocialItem>
            </template>
          </div>
          <div class="calendar">
            <el-calendar></el-calendar>
          </div>
          <div class="blogCategory">
            <menu-item
                label="文章分类" icon-class="iconfont icon-tag"
                :sub-menu-list="this.$store.state.blogCategory"
                @click="resetMenu"></menu-item>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </teleport>
</template>

<script>
import MenuButton from "@/components/Menu/MenuButton";
import SocialItem from "@/components/Menu/SocialItem";
import MenuItem from "@/components/Menu/MenuItem";
import {computed, shallowRef,ref} from "vue";
import {useStore} from 'vuex'
import {gsap} from '@/plugin/gsapPlugin'
export default {
  name: "Menu",
  components:{
    MenuButton,SocialItem,MenuItem
  },
  setup(){
    // 菜单的显示与隐藏
    let menuWidth = 280 // 菜单的宽度 不为响应式
    const menuWrapRef = ref()  // 左侧菜单的dom元素
    const isShowMenu = shallowRef(false)
    const openMenu = ()=>{
      if(menuWrapRef.value && isShowMenu.value === false) {
        window.document.body.style.overflow = 'hidden'
        gsap.to(menuWrapRef.value, {duration: .7, ease: 'bounce.out', x: 0,display: 'block'})
        isShowMenu.value = true
      }
    }
    const closeMenu = ()=>{
      if(menuWrapRef.value && isShowMenu.value === true) {
        window.document.body.style.overflow = ''
        gsap.to(menuWrapRef.value, {duration: .7, ease: 'power4.out', x: -menuWidth,display: 'none'})
        isShowMenu.value = false
      }
    }
    const resetMenu = ()=>{
      if(menuWrapRef.value){
        window.document.body.style.overflow = ''
        gsap.set(menuWrapRef.value,{x: -menuWidth,display: 'none'})
        isShowMenu.value = false
      }
    }

    const store = useStore()
    const menuHeaderTitle = computed(()=>{
      return (store.state.websiteInfo && store.state.websiteInfo.desc)|| '欢迎访问本博客~'
    })
    const avatar = computed(()=>{
      return (store.state.websiteInfo && store.state.websiteInfo.avatar) || ''
    })
    return {
      menuWrapRef,
      isShowMenu,openMenu,closeMenu,menuWidth,resetMenu,
      menuHeaderTitle,avatar
    }
  }
}
</script>

<style scoped lang="scss">
.mask{
  position: fixed;
  z-index: 999;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 101%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
}
.menu-wrap{
  display: none;
  background-image: url("~@/assets/img/menu-background.webp");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 1100;
  height: 100%;
  background-color: #1d1d1d;
  top: 0;
  left: 0;
  overflow: auto;
  max-height: 100vh;
  &:before{
    content: "";
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    background-color: rgba(29,29,29,.8);
  }
  .menu-content{
    font-size: 12px;
    color: #bdbdbd;
    .header{
      padding: 10px 20px;
      display: flex;
      font-style: italic;
      align-items: center;
      .prefix-icon,.suffix-icon{
        flex-shrink: 0;
      }
      .title{
        flex: 1;
        margin-left: 5px;
        word-break: break-all;
      }
    }
    .socials,.blogCategory,.introduce,.calendar{
      border-top: 1px solid hsla(0,0%,100%,.1);
    }
    .calendar{
      padding: 10px 0;
      ::v-deep .el-calendar{
        --el-calendar-cell-width: auto;
        // 当前选中日期的背景颜色
        --el-calendar-selected-bg-color: #333;
        // 不是当前月份日期的字体颜色
        --el-text-color-placeholder: #4c4c4c;
        // 当前日期字体颜色
        --el-color-primary: #dbdbdb;
        // 日历组件的背景颜色
        background-color: rgba(0,0,0,.1);
        .el-calendar__header{
          border-bottom: 1px solid hsla(0,0%,100%,.2);
          padding-bottom: 8px;
          .el-calendar__title{
            color: inherit;
          }
          .el-calendar__button-group{
            .el-button{
              color: #dbdbdb;
              background-color: rgba(0,0,0,.1);
              border: 0;
            }
          }
        }
        .el-calendar__body{
          padding-top: 0;
          padding-bottom: 5px;
          .el-calendar-table{
            thead th{
              color: var(--el-color-primary);
            }
            tbody tr td{
              border: 0;
            }
          }
        }
      }
    }
    .introduce{
      display: flex;
      padding: 10px 0 10px 20px;
      align-items: center;
      .name{
        color: inherit;
        text-decoration: none;
        margin-left: 20px;
        font-size: 16px;
        font-family: "Long Cang", cursive;
        font-weight: bold;
      }
    }
  }
}
</style>
