<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input v-model="user.username" class="input" clearable></el-input>
      <el-input v-model="user.password" class="input" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {requestLogin} from "../../util/request"
import {successAlert,warningAlert} from "../../util/alert"
import {mapActions} from "vuex"
export default {
  components: {},
  data() {
    return {
      user:{
        username:"",
        password:""
      }
    };
  },
  methods: {
    ...mapActions({
      "changeUser":"changeUser"
    }),
      login(){
          this.$router.push("/index")
          requestLogin(this.user).then(res=>{
            if(res.data.code===200){
              //登录成功
              successAlert("登录成功")
              //vuex保存了用户信息
              this.changeUser(res.data.list)
              //跳转页面
              this.$router.push("/home")
            }else{
              warningAlert(res.data.msg)
            }
          })
      }
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 350px;
  padding: 20px 50px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin-bottom: 20px;
}
.btn-box {
  text-align: center;
}
  
.el-button{
width: 100%;
margin-bottom: 30px;
}
</style>