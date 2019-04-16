<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="../assets/img/logo.png" alt="logo"> -->
      <h1>
      无形截击-2019报名确认系统
      </h1>
    </div>
    <div class="userInfo">
      <table border="0" cellspacing="0" cellpadding="0" style="color: #7FB0DA;">
        <tbody>
          <tr>
            <td width="60"></td>
            <td>
              <span>{{username}}</span>
            </td>
            <td>
              <img src="../assets/img/user.jpg" height="40px" alt="用户logo">
            </td>
            <td>
              <a class="a" @click="toMyGame" title="查看报名信息">
                <i></i>&nbsp;
                我的报名
              </a>
            </td>
            <td>
              <a class="a" @click="exit" title="点击退出报名系统">
                <i></i>&nbsp;
                退出
              </a>
            </td>
            <td width="30">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>
<style scoped>


.logo {
  padding-top: 5px;
  width: 350px;
  max-height: 60px;
  overflow: hidden;
}

.userInfo {
  height: 50px;
  min-height: 60px;
  padding-top: 0px;
}

.content-box {
  width: 80%;
  background-color: #e9ecf3;
}

.content {
  margin-bottom: 50px;
}

h1 {
  color: #0097ff;
  font: 24px "微软雅黑";
  padding: 0;
  margin: 0;
}

.title {
  padding: 0 0 5px 0;
  border-bottom: 1px solid #a7aaac;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 30px;
}

/* 表单必填项的星星 */
.xing {
  color: red;
}

tbody tr td {
  vertical-align: middle;
  text-align: center;
}

.leftbtn {
  margin-right: 5px;
}

th {
  text-align: center;
}

.nextButton {
  display: block;
  width: 45%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 40px;
  /* background-color: orangered; */
}

label {
  text-align: center !important;
}

.info {
  border-bottom: 1px solid #a7aaac;
  margin-bottom: 10px;
}
.a {
  color: #7fb0da;
  text-decoration: none;
  cursor: pointer;
  font-style: normal;
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
    exit() {
      this.$router.push({
        path: "/login"
      });
    },
    toMyGame(){
      this.$router.push({
        path:"/myMatches"
      });
    }
  }
};
</script>