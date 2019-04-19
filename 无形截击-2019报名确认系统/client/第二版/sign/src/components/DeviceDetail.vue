<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
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
                <el-input placeholder="请输入设备名称" v-model="device.name" :disabled="true"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">
                设备类型
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-checkbox-group
                  v-model="device.category"
                  @change="handleCheckedChange"
                  :disabled="true"
                >
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
                <el-input placeholder="请输入设备介绍" v-model="device.introduction" :disabled="true"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">设备厂商</td>
              <td>
                <el-input placeholder="请输入设备厂商" v-model="device.manufacturer" :disabled="true"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">厂商电话</td>
              <td>
                <el-input placeholder="请输入设备厂商电话" v-model="device.contactNumber" :disabled="true"></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td class="td-label">
                上传图片
                <strong class="xing">*</strong>
              </td>
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
                  <el-button size="small" type="primary">点击上传</el-button>

                  <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</span>
                </el-upload>
              </td>
            </tr>-->
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
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  方位角精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="方位角精度(单位：度)"
                    v-model="radarDev.anglePrecision"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  水平精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="水平精度(单位：米)"
                    v-model="radarDev.horizPrecision"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  数据率
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input placeholder="数据率(单位：秒)" v-model="radarDev.dataRate" :disabled="true"></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">近距离盲区</td>
                <td>
                  <el-input
                    placeholder="近距离盲区(单位：米)"
                    v-model="radarDev.closeBlindArea"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">顶空盲区</td>
                <td>
                  <el-input
                    placeholder="顶空盲区(单位：度)"
                    v-model="radarDev.upperBlindArea"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">可探测目标速度最小值</td>
                <td>
                  <el-input
                    placeholder="可探测目标速度最小值(单位：m/s)"
                    v-model="radarDev.targetSpeedMin"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">可探测目标速度最大值</td>
                <td>
                  <el-input
                    placeholder="可探测目标速度最大值(单位：m/s)"
                    v-model="radarDev.targetSpeedMax"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">多目标处理能力最小值</td>
                <td>
                  <el-input
                    placeholder="多目标处理能力最小值(单位：个)"
                    v-model="radarDev.targetNumberMin"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">多目标处理能力最大值</td>
                <td>
                  <el-input
                    placeholder="多目标处理能力最大值(单位：个)"
                    v-model="radarDev.targetNumberMax"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">处理时间</td>
                <td>
                  <el-input placeholder="处理时间(单位：秒)" v-model="radarDev.handleTime" :disabled="true"></el-input>
                </td>
                <td class="td-label">工作频段</td>
                <td>
                  <el-input
                    placeholder="请输入工作频段(如X、Ku、C、L、K、S)"
                    v-model="radarDev.workFrequency"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测高度</td>
                <td>
                  <el-input
                    placeholder="探测高度(单位：米)"
                    v-model="radarDev.detectHight"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">探测速度精度</td>
                <td>
                  <el-input
                    placeholder="探测速度精度(单位：m/s)"
                    v-model="radarDev.detectVelPrec"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">搜索速度</td>
                <td>
                  <el-input
                    placeholder="搜索速度(单位：r/min)"
                    v-model="radarDev.detectVelocity"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">额定功率</td>
                <td>
                  <el-input
                    placeholder="额定功率(单位：千瓦)"
                    v-model="radarDev.powerRating"
                    :disabled="true"
                  ></el-input>
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
                  <el-input
                    placeholder="探测距离(单位：千米)"
                    v-model="optoelecDev.detectDistance"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  分辨率
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="分辨率(单位：万)"
                    v-model="optoelecDev.resolutionRatio"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  定位精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="定位精度(单位：度)"
                    v-model="optoelecDev.anglePrecision"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">识别距离</td>
                <td>
                  <el-input
                    placeholder="识别距离(单位：千米)"
                    v-model="optoelecDev.recognitionDistance"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">工作波段最小值</td>
                <td>
                  <el-input
                    placeholder="工作波段最小值(单位：微米)"
                    v-model="optoelecDev.workFrequencyMin"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">工作波段最大值</td>
                <td>
                  <el-input
                    placeholder="工作波段最大值(单位：微米)"
                    v-model="optoelecDev.workFrequencyMax"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>

              <tr>
                <td class="td-label">定位距离</td>
                <td>
                  <el-input
                    placeholder="定位距离(单位：千米)"
                    v-model="optoelecDev.locationDistance"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">探测方位最大值</td>
                <td>
                  <el-input
                    placeholder="探测方位最大值(单位：度)"
                    v-model="optoelecDev.detectDirectionMax"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测方位最小值</td>
                <td>
                  <el-input
                    placeholder="探测方位最小值(单位：度)"
                    v-model="optoelecDev.detectDirectionMin"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">探测俯仰最大值</td>
                <td>
                  <el-input
                    placeholder="探测俯仰最大值(单位：度)"
                    v-model="optoelecDev.detectPitchMax"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测俯仰最小值</td>
                <td>
                  <el-input
                    placeholder="探测俯仰最小值(单位：度)"
                    v-model="optoelecDev.detectPitchMin"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">搜索周期</td>
                <td>
                  <el-input
                    placeholder="搜索周期(单位：秒)"
                    v-model="optoelecDev.searchCycle"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">水平旋转速度</td>
                <td>
                  <el-input
                    placeholder="水平旋转速度(单位：度/秒)"
                    v-model="optoelecDev.horiRotaVel"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">俯仰旋转速度</td>
                <td>
                  <el-input
                    placeholder="俯仰旋转速度(单位：度/秒)"
                    v-model="optoelecDev.pitchRotaVel"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">启动时间</td>
                <td>
                  <el-input
                    placeholder="启动时间(单位：分钟)"
                    v-model="optoelecDev.startTime"
                    :disabled="true"
                  ></el-input>
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
                  <el-input
                    placeholder="探测距离(单位：千米)"
                    v-model="tdoaDev.detectDistance"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  工作频段最小值
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="工作频段最小值(单位：赫兹)"
                    v-model="tdoaDev.workFrequencyMin"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  工作频段最大值
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="工作频段最大值(单位：赫兹)"
                    v-model="tdoaDev.workFrequencyMax"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  距离精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="距离精度(单位：米)"
                    v-model="tdoaDev.horizPrecision"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">
                  方位角精度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="方位角精度(单位：度)"
                    v-model="tdoaDev.anglePrecision"
                    :disabled="true"
                  ></el-input>
                </td>
                <td class="td-label">
                  监测灵敏度
                  <strong class="xing">*</strong>
                </td>
                <td>
                  <el-input
                    placeholder="监测灵敏度(单位：dBm)"
                    v-model="tdoaDev.monitorPrecision"
                    :disabled="true"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="td-label">探测高度</td>
                <td>
                  <el-input placeholder="探测高度(单位：米)" v-model="tdoaDev.detectHight" :disabled="true"></el-input>
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
                <el-input
                  placeholder="探测距离(单位：千米)"
                  v-model="passiveRadarDev.detectDistance"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label">
                距离精度
                <strong class="xing">*</strong>
              </td>
              <td>
                <el-input
                  placeholder="距离精度"
                  v-model="passiveRadarDev.horizPrecision"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">工作频段最小值</td>
              <td>
                <el-input
                  placeholder="工作频段最小值(单位：兆赫兹)"
                  v-model="passiveRadarDev.workFrequencyMin"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label">工作频段最大值</td>
              <td>
                <el-input
                  placeholder="工作频段最大值(单位：兆赫兹)"
                  v-model="passiveRadarDev.workFrequencyMax"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测速度精度</td>
              <td>
                <el-input
                  placeholder="探测速度精度(单位：米/秒)"
                  v-model="passiveRadarDev.detectVelPrec"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label">探测方位最大值</td>
              <td>
                <el-input
                  placeholder="探测方位最大值(单位：度)"
                  v-model="passiveRadarDev.detectDirectionMax"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测方位最小值</td>
              <td>
                <el-input
                  placeholder="探测方位最小值(单位：度)"
                  v-model="passiveRadarDev.detectDirectionMin"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label">探测俯仰最大值</td>
              <td>
                <el-input
                  placeholder="探测俯仰最大值(单位：度)"
                  v-model="passiveRadarDev.detectPitchMax"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测俯仰最小值</td>
              <td>
                <el-input
                  placeholder="探测俯仰最小值(单位：度)"
                  v-model="passiveRadarDev.detectPitchMin"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label">扫描速度</td>
              <td>
                <el-input
                  placeholder="扫描速度(单位：r/min)"
                  v-model="passiveRadarDev.detectVelocity"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td-label">探测高度</td>
              <td>
                <el-input
                  placeholder="探测高度(单位：米)"
                  v-model="passiveRadarDev.detectHight"
                  :disabled="true"
                ></el-input>
              </td>
              <td class="td-label"></td>
              <td></td>
            </tr>
          </table>
        </div>

        <button class="btn button" @click="back">返回</button>
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
      device: new Device(),
      optoelecDev: new OptoelecDev(),
      passiveRadarDev: new PassiveRadarDev(),
      radarDev: new RadarDev(),
      tdoaDev: new TDOADev(),
      isLeiDa: false,
      isGuangDian: false,
      isDuoZhan: false,
      isWuYuanLeiDa: false,
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
    // 四种类型的参数都有,先把这四个参数都留着
    var device = this.$route.params.device;
    console.log(device);
    this.isLeiDa = this.elementInArray("雷达", device.category);
    this.isGuangDian = this.elementInArray("光电", device.category);
    this.isDuoZhan = this.elementInArray("多站TDOA", device.category);
    this.isWuYuanLeiDa = this.elementInArray("无源雷达", device.category);
    this.device = device;
    if (this.isLeiDa) {
      this.radarDev = device.deviceParam.radarDev;
    }
    if (this.isGuangDian) {
      this.optoelecDev = device.deviceParam.optoelecDev;
    }
    if (this.isDuoZhan) {
      this.tdoaDev = device.deviceParam.tdoaDev;
    }
    if (this.isWuYuanLeiDa) {
      this.passiveRadarDev = device.deviceParam.passiveRadarDev;
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: "/myMatches"
      });
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
    }
  }
};
</script>

