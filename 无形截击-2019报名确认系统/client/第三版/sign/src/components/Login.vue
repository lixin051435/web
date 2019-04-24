<template>
  <div id="loginForm" class="page-container">
    <h1>无形截击-2019报名确认系统</h1>
    <br>
    <br>
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer form-footer">
      <el-button type="primary" class="loginform-btn" @click="login">登录</el-button>
      <el-button type="info" class="loginform-btn" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
import "./../assets/css/login.css";
import "./../assets/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      dialogVisible: false,
      user: {
        username: "17610246672",
        password: "12345678"
      },
      url: "http://192.168.4.177:5001/sign-up/auth"
    };
  },
  methods: {
    reset() {
      this.user = {
        username: "",
        password: ""
      };
    },
    login() {
      let that = this;
      if (that.user.username == "") {
        that.$alert("用户名不能为空", "提示");
        return;
      }
      if (that.user.password == "") {
        that.$alert("密码不能为空", "提示");
        return;
      }
      axios
        .post(that.url, {
          login: that.user.username,
          password: that.user.password
        })
        .then(
          function(res) {
            if (res.status == 200) {
              // 请求成功
              // 保存token 和 username
              sessionStorage.setItem("token", res.data.accessToken);
              sessionStorage.setItem("username", that.user.username);
              that.$router.push({
                path: "/index"
              });
            } else {
              that.$alert("登录失败，请稍后再试", "提示");
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

