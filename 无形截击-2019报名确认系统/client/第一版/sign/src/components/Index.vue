<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/company' }">选择公司</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/device' }">选择设备</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/team' }">填写参赛信息</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-steps :active="3" align-center>
        <el-step title="步骤 1" description="填写所有参加比赛的公司"></el-step>
        <el-step title="步骤 2" description="填写所有参加比赛的设备"></el-step>
        <el-step title="步骤 3" description="填写比赛报名信息"></el-step>
      </el-steps>
      <!-- 队伍基本信息 -->
      <Title title="队伍基本信息"></Title>
      <div class="content">
        <table border="0">
          <tr>
            <td class="td-label">
              队伍名称
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input
                class="control-input"
                placeholder="请输入队伍名称"
                v-model="info.teamName"
                :disabled="teamNameIsDisabled"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              参赛公司
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-checkbox-group class="td-checkbox-group" v-model="info.companies">
                <el-checkbox
                  class="td-checkbox"
                  v-for="companyName in companyNames"
                  :key="companyName"
                  :label="companyName"
                ></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              比赛科目
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="info.competeItem" placeholder="请选择比赛科目">
                <el-option
                  v-for="item in competeItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              参赛设备
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="info.devices" placeholder="请选择参赛设备">
                <el-option v-for="item in deviceNames" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </div>

      <!-- 参赛人员信息 -->
      <Title title="参赛人员信息"></Title>
      <div class="content">
        <table border="0">
          <tbody>
            <tr>
              <td class="td-label">
                队员姓名
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入队员姓名" v-model="competitor.name"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                队员性别
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-select class="td-select" v-model="competitor.gender" placeholder="请选择">
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                身份证号
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入身份证号" v-model="competitor.cardID"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                联系方式
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入联系方式" v-model="competitor.phone"></el-input>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="btn button" @click="addCompetitor">增加人员</button>
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table :data="info.competitors" stripe style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="cardID" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="operate-btn"
                @click.native.prevent="showUpdateDialog(scope.$index, info.competitors)"
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                class="operate-btn"
                @click.native.prevent="removeCompetitor(scope.$index, info.competitors)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <button @click="addGame" class="button">提交比赛</button>
      <!-- 比赛信息汇总 -->
      <Title title="比赛信息汇总"></Title>
      <el-table :data="infos" stripe style="width: 100%">
        <el-table-column prop="competeItem" label="比赛科目"></el-table-column>
        <el-table-column prop="devices" label="设备信息"></el-table-column>
        <el-table-column prop="competitorInfo" label="参赛人员"></el-table-column>
        <el-table-column prop="companyInfo" label="参赛公司"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              class="operate-btn"
              @click.native.prevent="removeGame(scope.$index, infos)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改人员" :visible.sync="dialogVisible" width="40%">
      <table border="0">
        <tbody>
          <tr>
            <td class="td-label">
              队员姓名
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入队员姓名" v-model="update_competitor.name"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              队员性别
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="update_competitor.gender" placeholder="请选择">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              身份证号
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入身份证号" v-model="update_competitor.cardID"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              联系方式
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-input placeholder="请输入联系方式" v-model="update_competitor.phone"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="updateCompetitor">确 定</el-button>
        <el-button class="update-btn" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
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
      teamNameIsDisabled: true,
      dialogVisible: false,
      URL: "http://192.168.4.177:5001",
      // 比赛科目单选
      competeItemOptions: [
        {
          value: "简单背景单目标探测科目",
          label: "简单背景单目标探测科目"
        },
        {
          value: "区域拒止科目",
          label: "区域拒止科目"
        },
        {
          value: "定点迫降科目",
          label: "定点迫降科目"
        },
        {
          value: "多目标背景单目标探测科目",
          label: "多目标背景单目标探测科目"
        },
        {
          value: "夜间背景单目标探测科目",
          label: "夜间背景单目标探测科目"
        },
        {
          value: "协同防御科目",
          label: "协同防御科目"
        },
        {
          value: "动能毁伤科目",
          label: "动能毁伤科目"
        },
        {
          value: "无人机攻击科目",
          label: "无人机攻击科目"
        }
      ],
      // 性别单选
      sexOptions: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      infos: [],
      info: {
        competeItem: "",
        competitors: [],
        companies: [],
        devices: ""
      },
      companyNames: [],
      deviceNames: [],
      update_competitor: new Competitor(),
      competitor: new Competitor()
    };
  },
  mounted() {
    this.getAllDevices();
    this.getAllCompanies();
    this.getAllInfos();
  },
  methods: {
    updateCompetitor() {
      var that = this;
      var index = that.updateCompetitorIndex;
      that.info.competitors[index] = that.update_competitor;
      that.dialogVisible = false;
    },

    showUpdateDialog(index) {
      var that = this;
      that.updateCompetitorIndex = index;
      // 显示dialog
      that.dialogVisible = true;
      // 回显
      var competitor = that.info.competitors[index];
      that.update_competitor = {
        name: competitor.name,
        gender: competitor.gender,
        cardID: competitor.cardID,
        phone: competitor.phone
      };
    },
    getAllInfos() {
      var that = this;
      // 获取所有设备列表
      axios
        .get(that.URL + "/sign-up/teams?flt_username_equals=" +
            sessionStorage.getItem("username"), {
          headers: {
            Authorization: "JWT " + sessionStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            var list = res.data.data || [];
            if (list.length != 0) {
              that.info.teamName = list[0].teamName;
            }
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
            that.handleTeamName();
          } else {
            console.log("获取失败");
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    getAllDevices() {
      var that = this;
      // 获取所有设备列表
      axios
        .get(
          that.URL +
            "/sign-up/devices?flt_username_equals=" +
            sessionStorage.getItem("username"),
          {
            headers: {
              Authorization: "JWT " + sessionStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          }
        )
        .then(function(res) {
          var deviceNames = [];
          for (var index = 0; index < res.data.data.length; index++) {
            deviceNames.push(res.data.data[index].name);
          }
          that.deviceNames = deviceNames;
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    getAllCompanies() {
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
          var companyNames = [];
          for (var index = 0; index < res.data.data.length; index++) {
            companyNames.push(res.data.data[index].name);
          }
          that.companyNames = companyNames;
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    handleRemove(file, fileList) {
      //移除图片
      console.log(file, fileList);
    },
    // 重置页面参数
    resetParams() {
      this.handleTeamName();
      this.info = {
        competeItem: "",
        competitors: [],
        companies: [],
        devices: ""
      };
      if (this.infos.length != 0) {
        this.info.teamName = this.infos[0].teamName;
      }
    },
    handleTeamName() {
      if (this.infos.length == 0) {
        this.teamNameIsDisabled = false;
      } else {
        this.teamNameIsDisabled = true;
      }
    },

    // 前端增加参赛者信息
    addCompetitor() {
      if (this.competitor.name == "") {
        alert("请填写姓名");
        return;
      }
      if (this.competitor.cardID == "") {
        alert("请填写身份证号");
        return;
      }
      if (this.competitor.phone == "") {
        alert("请填写联系方式");
        return;
      }
      this.info.competitors.push(this.competitor);
      this.competitor = {
        name: "",
        gender: "男",
        cardID: "",
        phone: ""
      };
    },
    // 前端删除参赛者信息
    removeCompetitor(index) {
      this.info.competitors.splice(index, 1);
    },
    // 增加比赛信息
    addGame() {
      var that = this;
      var info = this.info;
      var competeItem = info.competeItem;
      // 检查比赛科目是否重复
      var flag = false;
      for (var index = 0; index < this.infos.length; index++) {
        if (competeItem == this.infos[index].competeItem) {
          flag = true;
        }
      }
      if (flag) {
        alert("同一个队伍不能重复参加同一科目的比赛");
        return;
      }
      if (this.info.devices == "") {
        alert("请选择参赛设备");
        return;
      }
      if (this.info.companies.length == 0) {
        alert("请选择参赛公司");
        return;
      }
      if (this.info.competitors.length == 0) {
        alert("请添加参赛人员");
        return;
      }

      axios
        .post(
          that.URL + "/sign-up/teams",
          {
            teamName: that.info.teamName,
            competeItem: that.info.competeItem,
            companys: that.info.companies,
            devices: that.info.devices,
            competitors: that.info.competitors
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
            var infoServer = res.data.data;
            infoServer.companyInfo = infoServer.companys.join(",");
            var competitorInfo = [];
            for (const key in infoServer.competitors) {
              if (infoServer.competitors.hasOwnProperty(key)) {
                const element = infoServer.competitors[key];
                competitorInfo.push(element.name);
              }
            }
            infoServer.competitorInfo = competitorInfo.join(",");

            that.infos.push(infoServer);
            that.resetParams();
          } else {
            alert("添加失败");
          }
        });
    },
    // 删除比赛信息
    removeGame(index) {
      var that = this;
      var id = that.infos[index].id;
      // 上传到后台
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
          if (res.data.code == 204) {
            that.infos.splice(index, 1);
            that.resetParams();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    Header,
    Title
  }
};
</script>
