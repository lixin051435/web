<template>
  <div id="loginForm" class="page-container">
    <h1>无形截击-2019报名确认系统</h1>
    <form>
      <input type="text" v-model="username" class="username" placeholder="请输入用户名">
      <input type="password" v-model="password" class="password" placeholder="请输入密码">
    </form>
    <button @click="login" class="button">登录</button>
  </div>
</template>
<script>
import "./../assets/css/login.css";
import "./../assets/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible:false,
      username: "17610246672",
      password: "12345678",
      url: "http://192.168.4.177:5001/sign-up/auth"
    };
  },
  methods: {
    login() {
      var that = this;
      if (this.username == "") {
        alert("用户名不能为空");
        return;
      }
      if (this.password == "") {
        alert("密码不能为空");
        return;
      }
      axios
        .post(this.url, {
          login: this.username,
          password: this.password
        })
        .then(
          function(res) {
            if (res.status == 200) {
              // 请求成功
              // 保存token 和 username
              sessionStorage.setItem("token", res.data.accessToken);
              sessionStorage.setItem("username", that.username);
              that.$router.push({
                path: "/company"
              });
            } else {
              alert("登录失败，请稍后再试");
            }
          },
          function(error) {
            console.log(error.data);
          }
        );
    }
   
  }
};
</script>

