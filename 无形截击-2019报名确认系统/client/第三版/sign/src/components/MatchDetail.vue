<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/myMatches' }">我的报名</el-breadcrumb-item>
        <el-breadcrumb-item>报名详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 参赛公司信息 -->
      <Title title="队伍基本信息"></Title>
      <div class="content">
        <el-form label-width="100px">
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="队伍名称" required>
                <el-input v-model="info.teamName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科目类型" required>
                <el-input v-model="info.competeItem" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="联系人" required>
                <el-input v-model="info.contactPerson" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" required>
                <el-input v-model="info.telephone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>

      <!-- 参赛人员信息 -->
      <Title title="参赛人员信息"></Title>
      <div class="content">
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table :data="info.competitors" stripe :header-cell-style="getRowClass">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="cardID" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <!-- <el-table-column prop="isContact" label="是否赛前联系人"></el-table-column>
          <el-table-column prop="isTeamLeader" label="是否领队"></el-table-column>
          <el-table-column prop="isCaptain" label="是否队长"></el-table-column>-->
        </el-table>
      </div>

      <!-- 参赛设备信息 -->
      <Title title="参赛设备信息"></Title>
      <div class="content">
        <!-----------------------------------------  设备展示 ---------------------------------------------->
        <el-table :data="devices" stripe :header-cell-style="getRowClass">
          <el-table-column prop="name" label="设备名称"></el-table-column>
          <el-table-column prop="manufacturer" label="设备厂商"></el-table-column>
          <el-table-column prop="contactNumber" label="厂商电话"></el-table-column>
          <el-table-column prop="introduction" label="设备介绍"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-view"
                circle
                @click.native.prevent="goUpdateDetail(scope.$index, devices)"
                type="primary"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 参赛公司信息 -->
      <Title title="参赛公司信息"></Title>
      <div class="content">
        <el-table :data="companies" stripe :header-cell-style="getRowClass">
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="shortName" label="公司简称"></el-table-column>
          <el-table-column prop="address" label="公司地址"></el-table-column>
          <el-table-column prop="introduction" label="公司介绍"></el-table-column>
        </el-table>
      </div>
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
      info: {},
      companies: [],
      devices: []
    };
  },
  mounted() {
    var that = this;
    var infoParam = this.$route.params.info;
    this.info = infoParam;
    console.log(infoParam);
    console.log(infoParam.competitors);
    var axiosInstance = axios.create({
      baseURL: that.URL,
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + sessionStorage.getItem("token")
      }
    });
    // 获取设备对象
    axiosInstance
      .get(that.URL + "/sign-up/devices", {
        params: {
          flt_username_equals: sessionStorage.getItem("username"),
          flt_name_equals: infoParam.devices
        }
      })
      .then(res => {
        that.devices.push(res.data.data[0]);
      });

    // 获取公司对象
    for (const index in infoParam.companys) {
      if (infoParam.companys.hasOwnProperty(index)) {
        const companyName = infoParam.companys[index];
        axiosInstance
          .get(that.URL + "/sign-up/companys", {
            params: {
              flt_username_equals: sessionStorage.getItem("username"),
              flt_name_equals: companyName
            }
          })
          .then(res => {
            that.companies.push(res.data.data[0]);
          });
      }
    }
  },
  methods: {
    // 设置表头背景色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: rgba(213,213,213,0.24)";
      }
    },
    goUpdateDetail(index) {
      var device = this.devices[index];
      this.$router.push({
        name: "DeviceDetail",
        params: {
          device: device
        }
      });
    }
  },
  components: {
    Header,
    Title
  }
};
</script>
