<template>
  <div>
    <Header></Header>

    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 参赛公司信息 -->
      <Title title="队伍基本信息"></Title>
      <div class="content">
        <table border="0">
          <tbody>
            <tr>
              <td class="td-label">
                队伍名称
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input
                  class="control-input"
                  placeholder="请输入队伍名称"
                  v-model="team.teamName"
                  :disabled="teamNameIsDisabled"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                参赛科目
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-select class="td-select" v-model="team.competeItem" placeholder="请选择参赛科目">
                  <el-option
                    v-for="item in competeItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                联系人
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入联系人" v-model="team.contactPerson"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                联系方式
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入联系方式" v-model="team.telephone"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                参赛公司
                <strong class="xing">*</strong>
              </td>
              <td>
                <table border="0">
                  <tr>
                    <td>
                      <el-checkbox-group class="company-checkbox-group" v-model="team.companys" @change="selectCompanies">
                        <el-checkbox
                          class="td-checkbox"
                          v-for="companyname in companyNames"
                          :key="companyname"
                          :label="companyname"
                        >{{companyname}}</el-checkbox>
                      </el-checkbox-group>
                    </td>
                    <td>
                      <el-button class="add-company-button" @click="showAddCompanyDialog = true">添加</el-button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                参赛设备
                <strong class="xing">*</strong>
              </td>
              <td>
                <table border="0">
                  <tr>
                    <td>
                      <el-select  class="td-select" v-model="team.devices" placeholder="请选择参赛设备">
                        <el-option
                          v-for="item in devices"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </td>
                    <td class="td-label">
                      <el-button class="add-device-button" @click="toAddDevice">添加</el-button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <Title title="参赛人员信息"></Title>
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table :data="team.competitors" stripe style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="cardID" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="isContact" label="是否赛前联系人"></el-table-column>
          <el-table-column prop="isTeamLeader" label="是否领队"></el-table-column>
          <el-table-column prop="isCaptain" label="是否队长"></el-table-column>
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
                @click.native.prevent="removeCompetitor(scope.$index)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="add-item-btn" @click="showAddPersonDialog=true">增加队员</el-button>

      </div>
      <button @click="next" class="button next-btn btn">提交</button>
    </div>

    <!-- 添加公司对话框 -->
    <el-dialog title="添加公司" :visible.sync="showAddCompanyDialog">
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
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="addCompany">添加</el-button>
        <el-button class="update-btn" @click="showAddCompanyDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改参赛人员对话框 -->
    <el-dialog title="修改人员" :visible.sync="showUpdatePersonDialog">
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
              是否赛前联系人
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="update_competitor.isContact" placeholder="请选择">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              是否领队
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select
                class="td-select"
                v-model="update_competitor.isTeamLeader"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              是否队长
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="update_competitor.isCaptain" placeholder="请选择">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        <el-button class="update-btn" type="primary" @click="updateCompetitor()">确 定</el-button>
        <el-button class="update-btn" @click="showUpdatePersonDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加参赛人员对话框 -->
    <el-dialog title="添加人员" :visible.sync="showAddPersonDialog">
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
              是否赛前联系人
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="competitor.isContact" placeholder="请选择">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              是否领队
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="competitor.isTeamLeader" placeholder="请选择">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td-label">
              是否队长
              <strong class="xing">*</strong>
            </td>
            <td>
              <el-select class="td-select" v-model="competitor.isCaptain" placeholder="请选择">
                <el-option
                  v-for="item in boolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="addCompetitor()">添加</el-button>
        <el-button class="update-btn" @click="showAddPersonDialog= false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 参赛人员类
class Competitor {
  constructor(
    name = "",
    gender = "",
    cardID = "",
    phone = "",
    isContact = "否",
    isTeamLeader = "否",
    isCaptain = "否"
  ) {
    this.name = name;
    this.gender = gender;
    this.cardID = cardID;
    this.phone = phone;
    this.isContact = isContact;
    this.isTeamLeader = isTeamLeader;
    this.isCaptain = isCaptain;
  }

  toJSON() {
    let json = {};
    json.name = this.name;
    json.cardID = this.cardID;
    json.gender = this.gender;
    json.phone = this.phone;
    json.isContact = this.isContact == "否" ? false : true;
    json.isTeamLeader = this.isTeamLeader == "否" ? false : true;
    json.isCaptain = this.isCaptain == "否" ? false : true;
    return json;
  }

  // 检查参赛人员信息是否有效
  isValid() {
    if (this.name == "") {
      return false;
    }
    if (this.gender == "") {
      return false;
    }
    if (this.cardID == "") {
      return false;
    }
    if (this.phone == "") {
      return false;
    }
    return true;
  }
}

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

class Team {
  constructor(
    teamName = "",
    competeItem = "",
    contactPerson = "",
    telephone = "",
    companys = [],
    competitors = [],
    devices = ""
  ) {
    this.teamName = teamName;
    this.competeItem = competeItem;
    this.contactPerson = contactPerson;
    this.telephone = telephone;
    this.companys = companys;
    this.competitors = competitors;
    this.devices = devices;
  }

  isValid() {
    if (this.teamName == "") {
      return false;
    }
    if (this.competeItem == "") {
      return false;
    }
    if (this.contactPerson == "") {
      return false;
    }
    if (this.devices == "") {
      return false;
    }
    if (this.telephone == "") {
      return false;
    }
    if (this.companys.length == 0) {
      return false;
    }
    if (this.competitors.length == 0) {
      return false;
    }
    return true;
  }
  toJSON() {
    let object = {};
    object.contactPerson = this.contactPerson;
    object.telephone = this.telephone;
    object.teamName = this.teamName;
    object.competeItem = this.competeItem;
    object.companys = this.companys;
    object.devices = this.devices;
    let competitors = [];
    this.competitors.forEach(element => {
      competitors.push(element.toJSON());
    });
    object.competitors = competitors;
    return object;
  }
}

class Device {
  constructor(value = "", label = "") {
    this.value = value;
    this.label = label;
  }
}
import Title from "@/components/Title";
import Header from "@/components/Header";
import "element-ui/lib/theme-chalk/index.css";
import "./../assets/css/index.css";
import axios from "axios";
import { isAbsolute } from "path";
export default {
  data() {
    return {
      // 参赛设备
      devices: [],
      // 参赛科目单选
      competeItems: [
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
          value: "无人机攻击科目",
          label: "无人机攻击科目"
        }
      ],
      boolOptions: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
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
      // 修改人员对话框
      showUpdatePersonDialog: false,
      // 添加人员对话框
      showAddPersonDialog: false,
      // 是否显示添加公司对话框
      showAddCompanyDialog: false,
      // 是否显示修改公司对话框
      showUpdateCompanyDialog: false,
      URL: "http://192.168.4.177:5001",
      // 参赛公司名称 多选框用
      companyNames: [],
      // 要添加的参赛人员
      competitor: new Competitor(),
      // 要修改的参赛人员
      update_competitor: new Competitor(),
      // 要更改的公司
      updateCompany: new Company(),
      // 要添加的公司
      company: new Company(),
      team: new Team(),
      // 修改的队员对象所在下标
      operate_competitor_index: -1,
      // 用户名是否还可以填写
      teamNameIsDisabled: false,
      // 所有的比赛信息
      infos: []
    };
  },
  components: {
    Title,
    Header
  },
  mounted() {
    this.getAllCompanies();
    this.getAllDevices();
    this.getAllInfos();
  },
  methods: {
    // 参赛人员列表项中 修改按钮
    showUpdateDialog(index, row) {
      this.update_competitor = row;
      this.operate_competitor_index = index;
      this.showUpdatePersonDialog = true;
    },
    // 修改弹出框的确认按钮
    updateCompetitor() {
      if (this.update_competitor.isValid()) {
        this.team.competitors[
          this.operate_competitor_index
        ] = this.update_competitor;
        this.update_competitor = new Competitor();
        this.showUpdatePersonDialog = false;
      } else {
        alert("请补全全部信息后提交");
        return;
      }
    },
    // 前端增加参赛者信息
    addCompetitor() {
      let competitor = this.competitor;
      if (competitor.isValid()) {
        this.team.competitors.push(competitor);
        this.competitor = new Competitor();
        this.showAddPersonDialog = false;
      } else {
        alert("请补全全部信息后提交");
        return;
      }
    },
    // 前端删除参赛者信息
    removeCompetitor(index) {
      this.team.competitors.splice(index, 1);
    },
    // 选择参赛公司 事件
    selectCompanies(value) {
      this.team.companys = value;
    },
    // 去往添加设备页面
    toAddDevice() {
      this.$router.push({
        path: "/device"
      });
    },
    // 获取所有公司
    getAllCompanies() {
      let that = this;
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
            let companyNames = [];
            res.data.data.forEach(element => {
              companyNames.push(element.name);
            });
            that.companyNames = companyNames;
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    //  增加公司
    addCompany() {
      let that = this;
      let companyIsValid = that.company.isValid();
      if (companyIsValid) {
        // 要提交到后台的数据，只有四项基本信息
        let company = that.company;
        // 后台返回给我的对象，包括id等信息
        let companyServer = {};
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
              that.companyNames.push(res.data.data.name);
              that.company = new Company();
              that.showAddCompanyDialog = false;
            } else {
              alert("添加失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    // 从后台获取所有设备
    getAllDevices() {
      var that = this;
      // 获取所有公司列表
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
          if (res.data.code == 200) {
            let devices = [];
            res.data.data.forEach(element => {
              devices.push(new Device(element.name, element.name));
            });
            that.devices = devices;
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    // 获取所有比赛信息来判断队伍名称是否可以填写
    getAllInfos() {
      let that = this;
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
        .then(res => {
          if (res.data.code == 200) {
            let list = res.data.data || [];
            that.infos = list;
            if (list.length != 0) {
              that.team.teamName = list[0].teamName;
              that.teamNameIsDisabled = true;
            } else {
              that.teamNameIsDisabled = false;
            }
          } else {
            console.log("获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    next() {
      let that = this;
      console.log(that.team);
      let team = that.team;
      if (team.isValid()) {
        // 检查比赛科目是否重复
        let flag = false;
        for (let index = 0; index < that.infos.length; index++) {
          if (team.competeItem == that.infos[index].competeItem) {
            flag = true;
          }
        }
        if (flag) {
          alert("同一个队伍不能重复参加同一科目的比赛");
          return;
        } else {
          axios
            .post(that.URL + "/sign-up/teams", team.toJSON(), {
              headers: {
                Authorization: "JWT " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
              }
            })
            .then(function(res) {
              if (res.data.code == 201) {
                that.$router.push({
                  path: "/myMatches"
                });
              } else {
                alert("添加失败");
              }
            });
        }
      } else {
        alert("请补全全部信息后提交");
        return;
      }
    }
  }
};
</script>
