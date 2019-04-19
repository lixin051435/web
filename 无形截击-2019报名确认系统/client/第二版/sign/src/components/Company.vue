<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/baseInfo' }">参赛公司</el-breadcrumb-item>
      </el-breadcrumb>
      <br>

      <!-- 参赛人员信息 -->
      <Title title="参赛公司信息"></Title>
      <div class="content">
        <table border="0">
          <tbody>
            <tr>
              <td class="td-label">
                公司名称
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入公司名称" v-model="company.name"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                公司简称
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入公司简称" v-model="company.shortName"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                公司地址
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入公司地址" v-model="company.address"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                公司介绍
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入公司介绍" v-model="company.introduction"></el-input>
              </td>
            </tr>
          </tbody>
        </table>

        <el-button class="btn button" @click="addCompany">增加公司</el-button>
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table :data="companies" stripe style="width: 100%">
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="shortName" label="公司简称"></el-table-column>
          <el-table-column prop="address" label="公司地址"></el-table-column>
          <el-table-column prop="introduction" label="公司介绍"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="operate-btn"
                @click.native.prevent="showUpdateDialog(scope.$index,scope.row)"
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                class="operate-btn"
                @click.native.prevent="removeCompany(scope.$index)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加公司对话框 -->
    <el-dialog title="修改公司" :visible.sync="showUpdateCompanyDialog">
      <table border="0">
        <tbody>
          <tr>
            <td class="td-label">
              公司名称
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司名称" v-model="update_company.name"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司简称
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司简称" v-model="update_company.shortName"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司地址
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司地址" v-model="update_company.address"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司介绍
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司介绍" v-model="update_company.introduction"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="updateCompany">确定</el-button>
        <el-button class="update-btn" @click="showUpdateCompanyDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-button class="btn next-btn button" @click="back()">返回</el-button>
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

class Company {
  constructor(name = "", shortName = "", address = "", introduction = "") {
    this.name = name;
    this.shortName = shortName;
    this.address = address;
    this.introduction = introduction;
  }
  isValid() {
    if (this.name == "") {
      return false;
    }
    if (this.shortName == "") {
      return false;
    }
    if (this.address == "") {
      return false;
    }
    if (this.introduction == "") {
      return false;
    }
    return true;
  }
}

export default {
  data() {
    return {
      // 添加/修改/删除 的是哪个index的人员
      operateIndex: -1,
      // 修改人员对话框
      showUpdateCompanyDialog: false,
      URL: "http://192.168.4.177:5001",
      companies: [],
      // 要修改公司对象
      update_company: new Company(),
      // 要添加的公司对象
      company: new Company(),
      index: 0
    };
  },
  mounted() {
    this.getAllCompanies();
  },
  methods: {
    //  增加公司
    addCompany() {
      let that = this;
      let companyIsValid = that.company.isValid();
      if (companyIsValid) {
        // 要提交到后台的数据，只有四项基本信息
        let company = that.company;
        // 上传到后台
        axios
          .post(
            that.URL + "/sign-up/companys",
            {
              name: company.name,
              shortName: company.shortName,
              address: company.address,
              introduction: company.introduction
            },
            {
              headers: {
                Authorization: "JWT " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
              }
            }
          )
          .then(function(res) {
            if (res.data.code == 201) {
              that.companies.push(res.data.data);
              that.company = new Company();
            } else {
              alert("添加失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 修改公司
    updateCompany() {
      let that = this;
      let updateCompany = that.update_company;
      let axiosInstance = axios.create({
        baseURL: that.URL,
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + sessionStorage.getItem("token")
        }
      });
      axiosInstance
        .put(that.URL + "/sign-up/companys", updateCompany)
        .then(res => {
          // 用于刷新table
          that.getAllCompanies();
          that.showUpdateCompanyDialog = false;
        });
    },

    showUpdateDialog(index, row) {
      this.operateIndex = index;
      // 显示dialog
      this.showUpdateCompanyDialog = true;
      // 回显
      this.update_company = row;
    },
    // 删除公司
    removeCompany(index) {
      let that = this;
      let id = that.companies[index].id;
      // 后端删除
      axios
        .delete(that.URL + "/sign-up/companys", {
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
            that.companies.splice(index, 1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getAllCompanies() {
      let that = this;
      // 获取所有公司列表
      axios
        .get(
          that.URL +
            "/sign-up/companys?flt_username_equals=" +
            sessionStorage.getItem("username"),
          {
            headers: {
              Authorization: "JWT " + sessionStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          }
        )
        .then(function(res) {
          let companies = res.data.data || [];
          that.companies = companies;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 返回首页
    back() {
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
