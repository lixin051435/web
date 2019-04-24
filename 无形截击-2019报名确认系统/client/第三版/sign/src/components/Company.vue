<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item class="breadcrumb-item" :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrumb-item">参赛公司</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 参赛人员信息 -->
      <Title title="参赛公司信息"></Title>
      <div class="content">
        <el-form :model="company" ref="company" :rules="company_rules" label-width="100px">
          <el-form-item required label-width="0">
            <el-col :span="12">
              <el-form-item label="公司名称" prop="name" required>
                <el-input v-model="company.name" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司简称" prop="shortName" required>
                <el-input v-model="company.shortName" placeholder="请输入公司简称"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item required label-width="0">
            <el-col :span="12">
              <el-form-item label="公司地址" prop="address" required>
                <el-input v-model="company.address" placeholder="请输入公司地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司介绍" prop="introduction" required>
                <el-input type="textarea" v-model="company.introduction" placeholder="请输入公司介绍"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="footer form-footer">
          <el-button type="primary" size="medium" class="form-btn" @click="addCompany">添加</el-button>
          <el-button type="info" size="medium" class="form-btn" @click="reset">重置</el-button>
        </div>
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table :data="companies" :header-cell-style="getRowClass" stripe style="width: 100%">
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="shortName" label="公司简称"></el-table-column>
          <el-table-column prop="address" label="公司地址"></el-table-column>
          <el-table-column prop="introduction" label="公司介绍"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                circle
                @click.native.prevent="showUpdateDialog(scope.$index,scope.row)"
                type="primary"
                size="small"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeCompany(scope.$index)"
                type="primary"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 修改公司对话框 -->
    <el-dialog title="修改公司" :visible.sync="showUpdateCompanyDialog">
      <el-form
        :model="update_company"
        ref="update_company"
        :rules="company_rules"
        label-width="100px"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="update_company.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司简称" prop="shortName">
          <el-input v-model="update_company.shortName" placeholder="请输入公司简称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="update_company.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="公司介绍" prop="introduction">
          <el-input type="textarea" v-model="update_company.introduction" placeholder="请输入公司介绍"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="updateCompany">确定</el-button>
        <el-button class="update-btn" @click="showUpdateCompanyDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <el-button class="btn next-btn button" @click="back()">返回</el-button> -->
  </div>
</template>
<style scoped>


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
      index: 0,
      // 添加公司的规则
      company_rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        shortName: [
          { required: true, message: "请输入公司简称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入公司介绍", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getAllCompanies();
  },
  methods: {
    reset() {
      this.$refs.company.clearValidate();
      this.$refs.company.resetFields();
    },
    // 设置表头背景色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: rgba(213,213,213,0.24)";
      }
    },
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
              that.reset();
            } else {
              that.$alert("添加失败，公司名称不可重复","提示");
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
      this.update_company = new Company();
      this.update_company.id = row.id;
      this.update_company.shortName = row.shortName;
      this.update_company.address = row.address;
      this.update_company.introduction = row.introduction;
      this.update_company.name = row.name;
    },
    // 删除公司
    removeCompany(index) {
      let that = this;
      let id = that.companies[index].id;
      that
        .$confirm("此操作将删除当前公司信息", "提示", {
          confirmButtonText: "确定",
          cancalButtonText: "取消",
          type: "warning"
        })
        .then(() => {
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
        })
        .catch(() => {});
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
          console.log(companies);
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
