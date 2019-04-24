<template>
  <div class="header">
    <el-row class="headerText">
      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
        <h1 class="logoName">无形截击-2019报名确认系统</h1>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <ul class="navBar">
          <li>
            <a class="navBar-item" href="javascript:;" @click="toCompany">参赛公司</a>
          </li>
          <li>
            <a class="navBar-item" href="javascript:;" @click="toDevice">参赛设备</a>
          </li>
          <li>
            <a class="navBar-item" href="javascript:;" @click="toMyGame">我的报名</a>
          </li>
        </ul>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="loginInfo">
          <div class="loginInfo-text">
            <a>{{username}}</a>
          </div>
          <div>
            <img src="../assets/img/user.jpg" height="40px" alt="用户logo">
          </div>
          <div class="loginInfo-text">
            <a class="logout-btn" href="javascript:;" @click="showExit">注销</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
a {
  text-decoration: none;
}
.header {
  width: 90%;
  margin: 0 auto;
  height: 35px;
  line-height: 35px;
}
.headerText {
  width: 100%;
}
.navBar {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
  margin-left: 60px;
}
.loginInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
h1 {
  color: #0097ff;
  font: 24px "微软雅黑";
  padding: 0;
  margin: 0;
  text-align: left;
}
.logoName {
  padding-top: 5px;
}
.loginInfo-text {
  color: #333;
  margin-top: 12px;
}
.navBar li {
  height: 30px;
}
.navBar-item {
  height: 100px !important;
  font-size: 16px;
  color: #409eff;
}
.navBar-item:hover{
  color: #1989fa;
}
.logout-btn {
  color: #409eff;
}
.logout-btn:hover {
  color: #1989fa;
}
</style>

<script>
import "./../assets/css/index.css";
export default {
  data() {
    return {
      username: ""
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
  },
  methods: {
    showExit() {
      let that = this;
      this.$confirm("此操作将注销当前用户", "提示", {
        confirmButtonText: "确定",
        cancalButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.exit();
        })
        .catch(() => {});
    },
    exit() {
      this.$router.push({
        path: "/login"
      });
    },
    toMyGame() {
      this.$router.push({
        path: "/myMatches"
      });
    },
    toCompany() {
      this.$router.push({
        path: "/company"
      });
    },
    toDevice() {
      this.$router.push({
        path: "/device"
      });
    }
  }
};
</script>