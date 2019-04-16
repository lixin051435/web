<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/company' }">选择公司</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/device' }">选择设备</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-steps :active="2" align-center>
        <el-step title="步骤 1" description="填写所有参加比赛的公司"></el-step>
        <el-step title="步骤 2" description="填写所有参加比赛的设备"></el-step>
        <el-step title="步骤 3" description="填写比赛报名信息"></el-step>
      </el-steps>
      <!-- 参赛设备信息 -->
      <Title title="参赛设备信息"></Title>
      <div class="content">
        <table>
          <tbody>
            <tr>
              <td class="td-label">
                设备名称
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入设备名称" v-model="device.name"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                设备类型
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-checkbox-group v-model="device.category" @change="handleCheckedChange">
                  <el-checkbox class="td-checkbox" label="雷达"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="光电"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="多站TDOA"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="无源雷达"></el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                设备介绍
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="请输入设备介绍" v-model="device.introduction"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">设备厂商</td>
              <td>
                <el-input placeholder="请输入设备厂商" v-model="device.manufacturer"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">厂商电话</td>
              <td>
                <el-input placeholder="请输入设备厂商电话" v-model="device.contactNumber"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">上传图片</td>
              <td class="td-upload">
                <el-upload
                  action
                  :file-list="device.photo"
                  :limit="2"
                  list-type="picture"
                  :auto-upload="false"
                  :on-change="getFile"
                  :on-remove="removePhoto"
                >
                  <el-button size="small" type="primary" class="upload-btn">点击上传</el-button>

                  <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</span>
                </el-upload>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 雷达参数 -->
        <div v-if="isLeiDa">
          <Title title="雷达参数"></Title>
          <table id="leiDaTable" border="0">
            <tbody>
              <tr>
                <td class="td-label">
                  最大探测距离
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    type="float"
                    placeholder="最大探测距离(单位：千米)"
                    v-model="radarDev.detectDistance"
                  ></el-input>
                </td>
                <td class="td-label">
                  方位角精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="方位角精度(单位：度)" v-model="radarDev.anglePrecision"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  水平精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="水平精度(单位：米)" v-model="radarDev.horizPrecision"></el-input>
                </td>
                <td class="td-label">
                  数据率
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="数据率(单位：秒)" v-model="radarDev.dataRate"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">近距离盲区</td>
                <td>
                  <el-input placeholder="近距离盲区(单位：米)" v-model="radarDev.closeBlindArea"></el-input>
                </td>
                <td class="td-label">顶空盲区</td>
                <td>
                  <el-input placeholder="顶空盲区(单位：度)" v-model="radarDev.upperBlindArea"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">可探测目标速度最小值</td>
                <td>
                  <el-input placeholder="可探测目标速度最小值(单位：m/s)" v-model="radarDev.targetSpeedMin"></el-input>
                </td>
                <td class="td-label">可探测目标速度最大值</td>
                <td>
                  <el-input placeholder="可探测目标速度最大值(单位：m/s)" v-model="radarDev.targetSpeedMax"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">多目标处理能力最小值</td>
                <td>
                  <el-input placeholder="多目标处理能力最小值(单位：个)" v-model="radarDev.targetNumberMin"></el-input>
                </td>
                <td class="td-label">多目标处理能力最大值</td>
                <td>
                  <el-input placeholder="多目标处理能力最大值(单位：个)" v-model="radarDev.targetNumberMax"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">处理时间</td>
                <td>
                  <el-input placeholder="处理时间(单位：秒)" v-model="radarDev.handleTime"></el-input>
                </td>
                <td class="td-label">工作频段</td>
                <td>
                  <el-input placeholder="请输入工作频段(如X、Ku、C、L、K、S)" v-model="radarDev.workFrequency"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测高度</td>
                <td>
                  <el-input placeholder="探测高度(单位：米)" v-model="radarDev.detectHight"></el-input>
                </td>
                <td class="td-label">探测速度精度</td>
                <td>
                  <el-input placeholder="探测速度精度(单位：m/s)" v-model="radarDev.detectVelPrec"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">搜索速度</td>
                <td>
                  <el-input placeholder="搜索速度(单位：r/min)" v-model="radarDev.detectVelocity"></el-input>
                </td>
                <td class="td-label">额定功率</td>
                <td>
                  <el-input placeholder="额定功率(单位：千瓦)" v-model="radarDev.powerRating"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 光电参数 -->
        <div v-if="isGuangDian">
          <Title title="光电设备参数"></Title>
          <table id="guangdianTable">
            <tbody>
              <tr>
                <td class="td-label">
                  探测距离
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="探测距离(单位：千米)" v-model="optoelecDev.detectDistance"></el-input>
                </td>
                <td class="td-label">
                  分辨率
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="分辨率(单位：万)" v-model="optoelecDev.resolutionRatio"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  定位精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="定位精度(单位：度)" v-model="optoelecDev.anglePrecision"></el-input>
                </td>
                <td class="td-label">识别距离</td>
                <td>
                  <el-input placeholder="识别距离(单位：千米)" v-model="optoelecDev.recognitionDistance"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">工作波段最小值</td>
                <td>
                  <el-input placeholder="工作波段最小值(单位：微米)" v-model="optoelecDev.workFrequencyMin"></el-input>
                </td>
                <td class="td-label">工作波段最大值</td>
                <td>
                  <el-input placeholder="工作波段最大值(单位：微米)" v-model="optoelecDev.workFrequencyMax"></el-input>
                </td>
              </tr>

              <tr>
                <td class="td-label">定位距离</td>
                <td>
                  <el-input placeholder="定位距离(单位：千米)" v-model="optoelecDev.locationDistance"></el-input>
                </td>
                <td class="td-label">探测方位最大值</td>
                <td>
                  <el-input placeholder="探测方位最大值(单位：度)" v-model="optoelecDev.detectDirectionMax"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测方位最小值</td>
                <td>
                  <el-input placeholder="探测方位最小值(单位：度)" v-model="optoelecDev.detectDirectionMin"></el-input>
                </td>
                <td class="td-label">探测俯仰最大值</td>
                <td>
                  <el-input placeholder="探测俯仰最大值(单位：度)" v-model="optoelecDev.detectPitchMax"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测俯仰最小值</td>
                <td>
                  <el-input placeholder="探测俯仰最小值(单位：度)" v-model="optoelecDev.detectPitchMin"></el-input>
                </td>
                <td class="td-label">搜索周期</td>
                <td>
                  <el-input placeholder="搜索周期(单位：秒)" v-model="optoelecDev.searchCycle"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">水平旋转速度</td>
                <td>
                  <el-input placeholder="水平旋转速度(单位：度/秒)" v-model="optoelecDev.horiRotaVel"></el-input>
                </td>
                <td class="td-label">俯仰旋转速度</td>
                <td>
                  <el-input placeholder="俯仰旋转速度(单位：度/秒)" v-model="optoelecDev.pitchRotaVel"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">启动时间</td>
                <td>
                  <el-input placeholder="启动时间(单位：分钟)" v-model="optoelecDev.startTime"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 多站TDOA参数 -->
        <div v-if="isDuoZhan">
          <Title title="多站TDOA设备参数"></Title>
          <table border="0">
            <tbody>
              <tr>
                <td class="td-label">
                  探测距离
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="探测距离(单位：千米)" v-model="tdoaDev.detectDistance"></el-input>
                </td>
                <td class="td-label">
                  工作频段最小值
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="工作频段最小值(单位：赫兹)" v-model="tdoaDev.workFrequencyMin"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  工作频段最大值
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="工作频段最大值(单位：赫兹)" v-model="tdoaDev.workFrequencyMax"></el-input>
                </td>
                <td class="td-label">
                  距离精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="距离精度(单位：米)" v-model="tdoaDev.horizPrecision"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  方位角精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="方位角精度(单位：度)" v-model="tdoaDev.anglePrecision"></el-input>
                </td>
                <td class="td-label">
                  监测灵敏度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="监测灵敏度(单位：dBm)" v-model="tdoaDev.monitorPrecision"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测高度</td>
                <td>
                  <el-input placeholder="探测高度(单位：米)" v-model="tdoaDev.detectHight"></el-input>
                </td>
                <td class="td-label"></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 无源雷达参数 -->
        <div v-if="isWuYuanLeiDa">
          <Title title="无源雷达参数"></Title>
          <table border="0">
            <tr>
              <td class="td-label">
                探测距离
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="探测距离(单位：千米)" v-model="passiveRadarDev.detectDistance"></el-input>
              </td>
              <td class="td-label">
                距离精度
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input placeholder="距离精度" v-model="passiveRadarDev.horizPrecision"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">工作频段最小值</td>
              <td>
                <el-input placeholder="工作频段最小值(单位：兆赫兹)" v-model="passiveRadarDev.workFrequencyMin"></el-input>
              </td>
              <td class="td-label">工作频段最大值</td>
              <td>
                <el-input placeholder="工作频段最大值(单位：兆赫兹)" v-model="passiveRadarDev.workFrequencyMax"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测速度精度</td>
              <td>
                <el-input placeholder="探测速度精度(单位：米/秒)" v-model="passiveRadarDev.detectVelPrec"></el-input>
              </td>
              <td class="td-label">探测方位最大值</td>
              <td>
                <el-input placeholder="探测方位最大值(单位：度)" v-model="passiveRadarDev.detectDirectionMax"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测方位最小值</td>
              <td>
                <el-input placeholder="探测方位最小值(单位：度)" v-model="passiveRadarDev.detectDirectionMin"></el-input>
              </td>
              <td class="td-label">探测俯仰最大值</td>
              <td>
                <el-input placeholder="探测俯仰最大值(单位：度)" v-model="passiveRadarDev.detectPitchMax"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测俯仰最小值</td>
              <td>
                <el-input placeholder="探测俯仰最小值(单位：度)" v-model="passiveRadarDev.detectPitchMin"></el-input>
              </td>
              <td class="td-label">扫描速度</td>
              <td>
                <el-input placeholder="扫描速度(单位：r/min)" v-model="passiveRadarDev.detectVelocity"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测高度</td>
              <td>
                <el-input placeholder="探测高度(单位：米)" v-model="passiveRadarDev.detectHight"></el-input>
              </td>
              <td class="td-label"></td>
              <td></td>
            </tr>
          </table>
        </div>

        <button class="btn button" @click="addDevice" >添加设备</button>
        <Title title="设备信息汇总"></Title>
        <!-----------------------------------------  设备展示 ---------------------------------------------->
        <el-table :data="devices" stripe style="width: 100%">
          <el-table-column prop="name" label="设备名称"></el-table-column>
          <el-table-column prop="manufacturer" label="设备厂商"></el-table-column>
          <el-table-column prop="contactNumber" label="厂商电话"></el-table-column>
          <el-table-column prop="introduction" label="设备介绍"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="operate-btn"
                @click.native.prevent="goUpdateDevice(scope.$index, devices)"
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                class="operate-btn"
                @click.native.prevent="removeDevice(scope.$index, devices)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <button @click="next" class="button next-btn btn">下一步</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn {
  margin-bottom: 20px;
}
.operate-btn {
  width: 30%;
  background-color: #76a8d8;
}
.td-label {
  width: 15%;
  padding-top: 30px;
}
.td-select {
  width: 100%;
}
.td-checkbox {
  margin-top: 25px;
  width: 10%;
}
.td-upload {
  padding-top: 10px;
}
.upload-btn{
  cursor: pointer;
  width: 300px;
  height: 44px;
  margin-top: 25px;
  padding: 0;
  border-radius: 6px;
}
</style>
<script>
import Title from "@/components/Title";
import Header from "@/components/Header";
import "element-ui/lib/theme-chalk/index.css";
import "./../assets/css/index.css";
import axios from "axios";
import { fail } from "assert";
// 设备类
function Device() {
  return {
    name: "",
    manufacturer: "",
    contactNumber: "",
    // 类别名称数组
    category: [],
    introduction: "",
    photos: [],
    deviceParam: {}
  };
}

// 无源雷达
function PassiveRadarDev() {
  return {
    detectDistance: "",
    horizPrecision: "",
    workFrequencyMin: "",
    workFrequencyMax: "",
    detectVelPrec: "",
    detectDirectionMax: "",
    detectDirectionMin: "",
    detectPitchMax: "",
    detectPitchMin: "",
    detectVelocity: "",
    detectHight: ""
  };
}

// 光电设备
function OptoelecDev() {
  return {
    detectDistance: "",
    resolutionRatio: "",
    anglePrecision: "",
    recognitionDistance: "",
    workFrequencyMin: "",
    workFrequencyMax: "",
    startTime: "",
    locationDistance: "",
    detectDirectionMax: "",
    detectDirectionMin: "",
    detectPitchMax: "",
    detectPitchMin: "",
    searchCycle: "",
    horiRotaVel: "",
    pitchRotaVel: ""
  };
}
// TDOA设备
function TDOADev() {
  return {
    detectDistance: "",
    workFrequencyMin: "",
    workFrequencyMax: "",
    horizPrecision: "",
    anglePrecision: "",
    monitorPrecision: "",
    detectHight: ""
  };
}

// 雷达设备
function RadarDev() {
  return {
    detectDistance: "",
    anglePrecision: "",
    horizPrecision: "",
    dataRate: "",
    closeBlindArea: "",
    upperBlindArea: "",
    targetSpeedMin: "",
    targetSpeedMax: "",
    targetNumberMin: "",
    targetNumberMax: "",
    handleTime: "",
    workFrequency: "",
    detectHight: "",
    detectVelPrec: "",
    detectVelocity: "",
    powerRating: ""
  };
}
export default {
  data() {
    return {
      URL: "http://192.168.4.177:5001",
      //   是否是雷达类型
      isLeiDa: false,
      //   是否是光电类型
      isGuangDian: false,
      //   是否是多站TDOA类型
      isDuoZhan: false,
      //   是否是无源雷达类型
      isWuYuanLeiDa: false,
      device: new Device(),
      devices: [],
      optoelecDev: new OptoelecDev(),
      passiveRadarDev: new PassiveRadarDev(),
      radarDev: new RadarDev(),
      tdoaDev: new TDOADev(),
      // 图片对象列表
      photos: [],
      // 图片base64列表
      photoBase64: []
    };
  },
  components: {
    Title,
    Header
  },
  mounted() {
    this.getAllDevices();
    // alert("设备参数信息只填写数字!");
  },
  methods: {
    checkPhotoSize() {
      let that = this;
      let flag = true;
      for (let i = 0; i < that.photos.length; i++) {
        let size = Math.floor(that.photos[i].size / 1024);
        if (size > 500) {
          flag = false;
        }
      }
      return flag;
    },
    // 将file转base64
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },

    getFile(file, fileList) {
      this.photos = fileList;
    },
    removePhoto(file, fileList) {
      this.photos = fileList;
    },
    goUpdateDevice(index) {
      var device = this.devices[index];
      this.$router.push({
        name: "DeviceUpdate",
        params: {
          device: device
        }
      });
    },
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
            that.devices = res.data.data;
          }
        })
        .catch(function(error) {
          console.log("出错了");
          console.log(error);
        });
    },
    //   重置页面参数
    resetParams() {
      var that = this;
      that.device = new Device();
      that.optoelecDev = new OptoelecDev();
      that.passiveRadarDev = new PassiveRadarDev();
      that.radarDev = new RadarDev();
      that.tdoaDev = new TDOADev();
      that.isLeiDa = false;
      that.isGuangDian = false;
      that.isDuoZhan = false;
      that.isWuYuanLeiDa = false;
    },
    //   把设备参数类型转为float
    regularize(object) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          // workFrequency 属性本身就传字符串
          if (key != "workFrequency") {
            var value = parseFloat(object[key]);
            if (isNaN(value)) {
              delete object[key];
            } else {
              object[key] = value;
            }
          } else {
            if (object[key] == "") {
              delete object[key];
            }
          }
        }
      }
      return object;
    },
    //   元素是否在数组中
    elementInArray(element, array) {
      for (var i = 0; i < array.length; i++) {
        if (element === array[i]) {
          return true;
        }
      }
      return false;
    },
    //   多选框改变事件
    handleCheckedChange(e) {
      this.isLeiDa = this.elementInArray("雷达", e);
      this.isGuangDian = this.elementInArray("光电", e);
      this.isDuoZhan = this.elementInArray("多站TDOA", e);
      this.isWuYuanLeiDa = this.elementInArray("无源雷达", e);
    },
    deviceParamIsValid(deviceParam) {
      if (this.isLeiDa) {
        if (deviceParam.radarDev.anglePrecision == null) {
          return false;
        }
        if (deviceParam.radarDev.dataRate == null) {
          return false;
        }
        if (deviceParam.radarDev.detectDistance == null) {
          return false;
        }
        if (deviceParam.radarDev.horizPrecision == null) {
          return false;
        }
      }
      if (this.isGuangDian) {
        if (deviceParam.optoelecDev.anglePrecision == null) {
          return false;
        }
        if (deviceParam.optoelecDev.detectDistance == null) {
          return false;
        }
        if (deviceParam.optoelecDev.resolutionRatio == null) {
          return false;
        }
      }
      if (this.isDuoZhan) {
        if (deviceParam.tdoaDev.anglePrecision == null) {
          return false;
        }
        if (deviceParam.tdoaDev.detectDistance == null) {
          return false;
        }
        if (deviceParam.tdoaDev.horizPrecision == null) {
          return false;
        }
        if (deviceParam.tdoaDev.monitorPrecision == null) {
          return false;
        }
        if (deviceParam.tdoaDev.workFrequencyMax == null) {
          return false;
        }
        if (deviceParam.tdoaDev.workFrequencyMin == null) {
          return false;
        }
      }
      if (this.isWuYuanLeiDa) {
        if (deviceParam.passiveRadarDev.detectDistance == null) {
          return false;
        }
        if (deviceParam.passiveRadarDev.horizPrecision == null) {
          return false;
        }
      }
      return true;
    },
    deviceIsValid(device) {
      if (device.name == "") {
        alert("请填写设备名称");
        return false;
      }
      if (device.introduction == "") {
        alert("请填写设备介绍");
        return false;
      }
      if (device.category.length == 0) {
        alert("请选择设备类型");
        return false;
      }
      return true;
    },
    addDevice() {
      var that = this;
      var deviceIsValid = that.deviceIsValid(that.device);
      if (deviceIsValid) {
        // 要提交到后台的数据，只有四项基本信息
        var device = that.device;
        // 后台返回给我的对象，包括id等信息
        var deviceServer = {};
        if (that.isLeiDa) {
          device.deviceParam.radarDev = that.regularize(that.radarDev);
        }
        if (that.isGuangDian) {
          device.deviceParam.optoelecDev = that.regularize(that.optoelecDev);
        }
        if (that.isDuoZhan) {
          device.deviceParam.tdoaDev = that.regularize(that.tdoaDev);
        }
        if (that.isWuYuanLeiDa) {
          device.deviceParam.passiveRadarDev = that.regularize(
            that.passiveRadarDev
          );
        }
        // 检查参数是否都填写了
        var deviceParamIsValid = that.deviceParamIsValid(device.deviceParam);
        if (deviceParamIsValid) {
          if (that.checkPhotoSize()) {
            let photoBase64 = [];
            // 已经成功了转化了几张图片
            let number = 0;
            // 一共有几张图片
            let sum = that.photos.length;
            if (sum > 0) {
              for (let i = 0; i < sum; i++) {
                let raw = that.photos[i].raw;
                that.getBase64(raw).then(res => {
                  number++;
                  photoBase64.push(res);
                  if (number == sum) {
                    axios
                      .post(
                        that.URL + "/sign-up/devices",
                        {
                          name: device.name,
                          manufacturer: device.manufacturer,
                          contactNumber: device.contactNumber,
                          category: device.category,
                          introduction: device.introduction,
                          deviceParam: device.deviceParam,
                          photos: photoBase64
                        },
                        {
                          headers: {
                            Authorization:
                              "JWT " + sessionStorage.getItem("token"),
                            "Content-Type": "application/json"
                          }
                        }
                      )
                      .then(function(res) {
                        if (res.data.code == 201) {
                          deviceServer = res.data.data;
                          that.devices.push(deviceServer);
                          that.resetParams();
                        } else {
                          alert("添加失败");
                        }
                      })
                      .catch(function(error) {
                        console.log("报错了");
                        console.log(error);
                      });
                  }
                });
              }
            } else {
              // 上传到后台
              axios
                .post(
                  that.URL + "/sign-up/devices",
                  {
                    name: device.name,
                    manufacturer: device.manufacturer,
                    contactNumber: device.contactNumber,
                    category: device.category,
                    introduction: device.introduction,
                    deviceParam: device.deviceParam,
                    photos: []
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
                    deviceServer = res.data.data;
                    that.devices.push(deviceServer);
                    that.resetParams();
                  } else {
                    alert("添加失败");
                  }
                })
                .catch(function(error) {
                  console.log("报错了");
                  console.log(error);
                });
            }
          } else {
            alert("图片尺寸超过500KB");
            return;
          }
        } else {
          alert("请补全所有必填参数后提交");
          return;
        }
      }
    },
    removeDevice(index) {
      var that = this;
      var id = that.devices[index].id;
      // 上传到后台
      axios
        .delete(that.URL + "/sign-up/devices", {
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
            that.devices.splice(index, 1);
          }
        })
        .catch(function(error) {
          console.log("报错了");
          console.log(error);
        });
    },
    next() {
      this.$router.push({
        path: "/team"
      });
    }
  }
};
</script>

