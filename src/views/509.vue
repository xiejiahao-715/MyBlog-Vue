<template>
  <!-- 检测到ip恶意访问本站接口后跳转的页面，进行检测-->
  <div class="error-509">
    <div class="content">
      <el-input v-model="code" clearable placeholder="请输入验证码"></el-input>
      <img :src="imageSrc" alt="验证码" @click="getVerifyImageScr">
    </div>
    <div class="btn">
      <el-button type="primary" @click="verify">验证</el-button>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, shallowRef} from "vue";
import { getUnAccessLimitCodeSrcApi,verifyUnAccessLimitCodeApi} from '@/api/blog'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'

export default {
  name: "509Page",
  setup(){
    const imageSrc = shallowRef('')
    const getVerifyImageScr = () => {
      getUnAccessLimitCodeSrcApi()
        .then(res =>{
          console.log(res)
          imageSrc.value = res.data.src
        }).catch((error)=>{
          ElMessage({
            type: "error",
            duration: 5000,
            showClose: true,
            message: error
          })
        })
    }
    onBeforeMount(()=>{
      getVerifyImageScr()
    })

    const router = useRouter()
    const isLoading = shallowRef(false)
    const code = shallowRef("")
    const verify = () => {
      code.value = code.value.trim()
      if(code.value.length > 0) {
        isLoading.value = true
        verifyUnAccessLimitCodeApi(code.value)
            .then(() => {
              ElMessage({
                type: "success",
                duration: 5000,
                showClose: true,
                message: '人工验证成功'
              })
              router.push({name: 'home'})
            }).catch((error) => {
          ElMessage({
            type: "error",
            duration: 5000,
            showClose: true,
            message: error
          })
        }).finally(() => {
          isLoading.value = false
        })
      }
    }

    return {
      imageSrc,getVerifyImageScr,
      code,isLoading,verify
    }
}
}
</script>

<style scoped lang="scss">
.error-509{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    img{
      margin-left: 20px;
    }
  }
  .btn{
    margin-top: 10px;
  }
}
</style>
