<template>
  <div>
    <Header></Header>

    <div class="content-box">
      <!-- 参赛公司信息 -->
      <Title title="队伍基本信息"></Title>
      <div class="content">
        <el-form :model="team" ref="team" :rules="team_base_rules" label-width="120px">
          <el-form-item required label-width="0">
            <el-col :span="12">
              <el-form-item prop="teamName" label="队伍名称">
                <el-input
                  placeholder="请输入队伍名称"
                  v-model="team.teamName"
                  :disabled="teamNameIsDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="competeItem" label="参赛科目">
                <el-select v-model="team.competeItem" placeholder="一次只能报一个科目，如需多报请重复提交">
                  <el-option
                    v-for="item in competeItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item required label-width="0">
            <el-col :span="12">
              <el-form-item prop="contactPerson" label="联系人">
                <el-input placeholder="请输入联系人" v-model="team.contactPerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="telephone" label="联系方式">
                <el-input placeholder="请输入联系方式" v-model="team.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="参赛公司" prop="companys">
            <el-checkbox-group
              class="company-checkbox-group inline-block"
              v-model="team.companys"
              @change="selectCompanies"
            >
              <el-checkbox
                v-for="companyname in companyNames"
                :key="companyname"
                :label="companyname"
              >{{companyname}}</el-checkbox>
            </el-checkbox-group>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="showAddCompanyDialog = true"
              circle
            ></el-button>
          </el-form-item>
          <el-form-item required label-width="0">
            <el-col :span="12">
              <el-form-item prop="devices" label="参赛设备">
                <el-select v-model="team.devices" placeholder="请选择参赛设备">
                  <el-option
                    v-for="item in devices"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-button
              type="primary"
              icon="el-icon-plus"
              class="to-device-btn"
              @click="toAddDevice"
              circle
            ></el-button>
          </el-form-item>
        </el-form>

        <Title title="参赛人员信息"></Title>
        <!-----------------------------------------  人员展示 ---------------------------------------------->
        <el-table
          :data="team.competitors"
          stripe
          class="personInfoTable"
          :header-cell-style="getRowClass"
        >
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
                icon="el-icon-edit"
                circle
                @click.native.prevent="showUpdateDialog(scope.$index,scope.row)"
                type="primary"
                size="small"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeCompetitor(scope.$index)"
                type="primary"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          class="add-item-btn"
          icon="el-icon-plus"
          size="big"
          type="primary"
          circle
          @click="showAddPersonDialog=true"
        ></el-button>
      </div>
      <div class="footer">
        <el-button @click="next" type="primary" size="medium" class="form-btn">提交</el-button>
        <el-button @click="reset" type="info" size="medium" class="form-btn">重置</el-button>
      </div>
    </div>

    <!-- 添加公司对话框 -->
    <el-dialog title="添加公司" :visible.sync="showAddCompanyDialog">
      <el-form :model="company" ref="company" :rules="company_rules" label-width="100px">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="company.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司简称" prop="shortName">
          <el-input v-model="company.shortName" placeholder="请输入公司简称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="company.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="公司介绍" prop="introduction">
          <el-input type="textarea" v-model="company.introduction" placeholder="请输入公司介绍"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="addCompany">添加</el-button>
        <el-button class="update-btn" @click="addCompany_candel ">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改参赛人员对话框 -->
    <el-dialog title="修改人员" :visible.sync="showUpdatePersonDialog">
      <el-form
        :model="update_competitor"
        ref="update_competitor"
        :rules="competitor_rules"
        label-width="120px"
      >
        <el-form-item label="队员姓名" prop="name">
          <el-input v-model="update_competitor.name" placeholder="请输入队员姓名"></el-input>
        </el-form-item>
        <el-form-item label="是否赛前联系人" prop="isContact">
          <el-select v-model="update_competitor.isContact" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否领队" prop="isTeamLeader">
          <el-select v-model="update_competitor.isTeamLeader" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否队长" prop="isCaptain">
          <el-select v-model="update_competitor.isCaptain" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="队员性别" prop="gender">
          <el-select class="td-select" v-model="update_competitor.gender" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardID">
          <el-input placeholder="请输入身份证号" v-model="update_competitor.cardID"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input placeholder="请输入联系方式" v-model="update_competitor.phone"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="updateCompetitor()">确 定</el-button>
        <el-button class="update-btn" @click="updateCompetitor_cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加参赛人员对话框 -->
    <el-dialog title="添加人员" :visible.sync="showAddPersonDialog">
      <el-form :model="competitor" ref="competitor" :rules="competitor_rules" label-width="120px">
        <el-form-item label="队员姓名" prop="name">
          <el-input v-model="competitor.name" placeholder="请输入队员姓名"></el-input>
        </el-form-item>
        <el-form-item label="是否赛前联系人" prop="isContact">
          <el-select v-model="competitor.isContact" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否领队" prop="isTeamLeader">
          <el-select v-model="competitor.isTeamLeader" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否队长" prop="isCaptain">
          <el-select v-model="competitor.isCaptain" placeholder="请选择">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="队员性别" prop="gender">
          <el-select class="td-select" v-model="competitor.gender" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardID">
          <el-input placeholder="请输入身份证号" v-model="competitor.cardID"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input placeholder="请输入联系方式" v-model="competitor.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="update-btn" type="primary" @click="addCompetitor()">添加</el-button>
        <el-button class="update-btn" @click="addCompetitor_cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 参赛人员类
class Competitor {
  constructor(
    name = "",
    gender = "男",
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
      infos: [],
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
      },
      // 队伍基本信息规则
      team_base_rules: {
        teamName: [
          { required: true, message: "请输入队伍名称", trigger: "blur" }
        ],
        contactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        competeItem: [
          { required: true, message: "请选择比赛科目", trigger: "change" }
        ],
        companys: [
          { required: true, message: "请选择参赛公司", trigger: "change" }
        ],
        devices: [
          { required: true, message: "请选择参赛设备", trigger: "change" }
        ]
      },
      competitor_rules: {
        name: [{ required: true, message: "请输入队伍名称", trigger: "blur" }],
        isTeamLeader: [
          { required: true, message: "请选择是否领队", trigger: "change" }
        ],
        isCaptain: [
          { required: true, message: "请选择是队长", trigger: "change" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        isContact: [
          {
            required: true,
            message: "请选择是否为赛前联系人",
            trigger: "change"
          }
        ],
        cardID: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请选择联系方式", trigger: "blur" }]
      }
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
    // 设置表头背景色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: rgba(213,213,213,0.24)";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$alert("submit!", "提示");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 参赛人员列表项中 修改按钮
    showUpdateDialog(index, row) {
      this.update_competitor = new Competitor();
      this.update_competitor.cardID = row.cardID;
      this.update_competitor.gender = row.gender;
      this.update_competitor.isCaptain = row.isCaptain;
      this.update_competitor.isContact = row.isContact;
      this.update_competitor.isTeamLeader = row.isTeamLeader;
      this.update_competitor.name = row.name;
      this.update_competitor.phone = row.phone;

      this.operate_competitor_index = index;
      this.showUpdatePersonDialog = true;
    },
    updateCompetitor_cancel() {
      this.showUpdatePersonDialog = false;
      this.$refs.update_competitor.clearValidate();
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
        this.$alert("请补全全部信息后提交", "提示");
        return;
      }
    },
    addCompetitor_cancel() {
      this.showAddPersonDialog = false;
      this.$refs.competitor.clearValidate();
    },
    // 前端增加参赛者信息
    addCompetitor() {
      let competitor = this.competitor;
      if (competitor.isValid()) {
        let reg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
        if(reg.test(competitor.cardID) == false){
          this.$alert("身份证输入不合法","提示");
          return;
        }
        this.team.competitors.push(competitor);
        this.competitor = new Competitor();
        this.showAddPersonDialog = false;
      } else {
        this.$alert("请补全全部信息后提交", "提示");
        return;
      }
    },
    reset() {
      let teamName = this.team.teamName;
      this.team = new Team();
      this.team.teamName = teamName;
      this.$refs.team.clearValidate();
      this.$refs.team.resetFields();
    },
    // 前端删除参赛者信息
    removeCompetitor(index) {
      this.$confirm("此操作将删除当前人员信息", "提示", {
        confirmButtonText: "确定",
        cancalButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.team.competitors.splice(index, 1);
        })
        .catch(() => {});
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
    addCompany_candel() {
      this.showAddCompanyDialog = false;
      this.$refs.company.clearValidate();
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
              this.$alert("添加失败", "提示");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$alert("请补全所有信息后提交", "提示");
        return;
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
          this.$alert("同一个队伍不能重复参加同一科目的比赛", "提示");
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
                that.$alert("提交成功", "提示");
                that.$router.push({
                  path: "/myMatches"
                });
              } else {
                that.$alert("提交失败，请稍后再试", "提示");
              }
            });
        }
      } else {
        this.$alert("请补全全部信息后提交", "提示");
        return;
      }
    }
  }
};
</script>
