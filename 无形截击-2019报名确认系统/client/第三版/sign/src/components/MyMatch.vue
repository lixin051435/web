<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的报名</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 比赛信息汇总 -->
      <Title title="比赛信息汇总"></Title>
      <el-table :data="infos" stripe :header-cell-style="getRowClass">
        <el-table-column prop="teamName" label="队伍名称"></el-table-column>
        <el-table-column prop="competeItem" label="比赛科目"></el-table-column>
        <el-table-column prop="devices" label="设备信息"></el-table-column>
        <el-table-column prop="competitorInfo" label="参赛人员"></el-table-column>
        <el-table-column prop="companyInfo" label="参赛公司"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              circle
              @click.native.prevent="toDetail(scope.$index, infos)"
              type="primary"
              size="small"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              circle
              @click.native.prevent="removeMatch(scope.$index)"
              type="primary"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-button type="primary" @click="toIndex">报名其他科目</el-button>
    </div>
  </div>
</template>
<style scoped>
.td-label {
  width: 15%;
  padding-top: 30px;
}
.td-select {
  width: 100%;
}
.td-checkbox {
  margin-top: 25px;
  width: 20%;
}
.btn {
  margin-bottom: 20px;
}
</style>

<script>
function Competitor() {
  return {
    name: "",
    gender: "男",
    cardID: "",
    phone: ""
  };
}
import Title from "@/components/Title";
import Header from "@/components/Header";
import "element-ui/lib/theme-chalk/index.css";
import "./../assets/css/index.css";
import axios from "axios";
import { fail } from "assert";
export default {
  data() {
    return {
      URL: "http://192.168.4.177:5001",
      infos: []
    };
  },
  mounted() {
    this.getAllInfos();
  },
  methods: {
    // 设置表头背景色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: rgba(213,213,213,0.24)";
      }
    },
    getAllInfos() {
      var that = this;
      // 获取所有设备列表
      axios
        .get(
          that.URL +
            "/sign-up/teams?flt_username_equals=" +
            sessionStorage.getItem("username"),
          {
            headers: {
              Authorization: "JWT " + sessionStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          }
        )
        .then(function(res) {
          if (res.data.code == 200) {
            var list = res.data.data || [];
            for (const index in list) {
              if (list.hasOwnProperty(index)) {
                var element = list[index];
                var competitorInfo = [];

                for (const key in element.competitors) {
                  if (element.competitors.hasOwnProperty(key)) {
                    const ele = element.competitors[key];
                    competitorInfo.push(ele.name);
                  }
                }
                element.companyInfo = element.companys.join(",");
                element.competitorInfo = competitorInfo.join(",");
                that.infos.push(element);
              }
            }
          } else {
            console.log("获取失败");
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    toDetail(index) {
      var info = this.infos[index];
      this.$router.push({
        name: "MatchDetail",
        params: {
          info: info
        }
      });
    },
    removeMatch(index) {
      let that = this;
      let id = that.infos[index].id;

      this.$confirm("此操作将删除当前比赛信息", "提示", {
        confirmButtonText: "确定",
        cancalButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 后端删除
          axios
            .delete(that.URL + "/sign-up/teams", {
              params: {
                id: id
              },
              headers: {
                Authorization: "JWT " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                // 前端删除
                that.infos.splice(index, 1);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    toIndex() {
      this.$router.push({
        path: "/index"
      });
    }
  },
  components: {
    Header,
    Title
  }
};
</script>
