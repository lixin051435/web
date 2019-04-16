<template>
  <div>
    <Header></Header>

    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/company' }">选择公司</el-breadcrumb-item>
      </el-breadcrumb>
      <el-steps :active="1" align-center>
        <el-step title="步骤 1" description="填写所有参加比赛的公司"></el-step>
        <el-step title="步骤 2" description="填写所有参加比赛的设备"></el-step>
        <el-step title="步骤 3" description="填写比赛报名信息"></el-step>
      </el-steps>
      <!-- 参赛公司信息 -->
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

        <button class="btn button" @click="addCompany">增加公司</button>
        <Title title="公司信息汇总"></Title>
        <!-----------------------------------------  公司展示 ---------------------------------------------->
        <el-table :data="companies" stripe style="width: 100%">
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="shortName" label="公司简称"></el-table-column>
          <el-table-column prop="address" label="公司地址"></el-table-column>
          <el-table-column prop="introduction" label="公司介绍"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="operate-btn"
                @click="showUpdateCompanyDialog(scope.$index, companies)"
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                class="operate-btn"
                @click.native.prevent="removeCompany(scope.$index, companies)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <button @click="next" class="button next-btn btn">下一步</button>
    </div>

    <el-dialog title="修改公司" :visible.sync="dialogVisible" width="40%">
      <table border="0">
        <tbody>
          <tr>
            <td class="td-label">
              公司名称
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司名称" v-model="updateCompany.name"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司简称
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司简称" v-model="updateCompany.shortName"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司地址
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司地址" v-model="updateCompany.address"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              公司介绍
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入公司介绍" v-model="updateCompany.introduction"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="update_Company">确 定</el-button>
        <el-button class="update-btn" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.td-label {
  padding-top: 30px;
  width: 15%;
}
.btn {
  margin-bottom: 10px;
}
.next-btn{
  margin-top: 20px;
}
</style>

<script>
function Company() {
  return {
    name: "",
    shortName: "",
    address: "",
    introduction: ""
  };
}
import Title from "@/components/Title";
import Header from "@/components/Header";
import "element-ui/lib/theme-chalk/index.css";
import "./../assets/css/index.css";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      URL: "http://192.168.4.177:5001",
      companies: [],
      updateCompany: new Company(),
      company: new Company()
    };
  },
  components: {
    Title,
    Header
  },
  mounted() {
    this.getAllCompany();
  },
  methods: {
    update_Company() {
      var that = this;
      var updateCompany = that.updateCompany;
      var axiosInstance = axios.create({
        baseURL: that.URL,
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + sessionStorage.getItem("token")
        }
      });
      axiosInstance
        .put(that.URL + "/sign-up/companys", updateCompany)
        .then(res => {
          console.log(res.data);
          that.dialogVisible = false;
          that.getAllCompany();
        });
    },
    showUpdateCompanyDialog(index) {
      var that = this;
      // 显示dialog
      that.dialogVisible = true;
      // 回显
      var company = that.companies[index];
      that.updateCompany = {
        id: company.id,
        name: company.name,
        shortName: company.shortName,
        address: company.address,
        introduction: company.introduction
      };
    },
    getAllCompany() {
      var that = this;
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
          if (res.data.code == 200) {
            that.companies = res.data.data;
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    // 公司是否填写有效
    companyIsValid(company) {
      if (company.name == "") {
        alert("请填写公司名称");
        return false;
      }
      if (company.shortName == "") {
        alert("请填写公司简称");
        return false;
      }
      if (company.address == "") {
        alert("请填写公司地址");
        return false;
      }
      if (company.introduction == "") {
        alert("请填写公司介绍");
        return false;
      }
      return true;
    },
    addCompany() {
      var that = this;
      var companyIsValid = that.companyIsValid(that.company);
      if (companyIsValid) {
        // 要提交到后台的数据，只有四项基本信息
        var company = that.company;
        // 后台返回给我的对象，包括id等信息
        var companyServer = {};
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
              companyServer = res.data.data;
              that.companies.push(companyServer);
            } else {
              alert("添加失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      that.company = {
        name: "",
        shortName: "",
        address: "",
        introduction: ""
      };
    },
    removeCompany(index) {
      var that = this;
      var id = that.companies[index].id;
      console.log(id);
      // 上传到后台
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
            that.companies.splice(index, 1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    next() {
      if (this.companies.length == 0) {
        alert("请添加所有参赛公司");
        return;
      }
      this.$router.push({
        path: "/device"
      });
    }
  }
};
</script>
