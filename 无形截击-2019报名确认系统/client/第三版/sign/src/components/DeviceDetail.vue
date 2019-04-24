<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 参赛设备信息 -->
      <Title title="参赛设备信息"></Title>
      <div class="content">
         <el-form label-width="100px">
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="设备名称" required>
                <el-input  :disabled="true" v-model="device.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类型" required>
                <el-checkbox-group
                class="device-checkbox-group"
                  v-model="device.category"
                  @change="handleCheckedChange"
                  :disabled="true"
                >
                  <el-checkbox class="td-checkbox" label="雷达"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="光电"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="多站TDOA"></el-checkbox>
                  <el-checkbox class="td-checkbox" label="无源雷达"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="设备介绍" required>
                <el-input v-model="device.introduction" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="探测距离" required>
                <el-input v-model="device.detectDistance" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="探测精度" required>
                <el-input v-model="device.detectPrecision" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备厂商">
                <el-input v-model="device.manufacturer" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label-width="0">
            <el-col :span="12">
              <el-form-item label="厂商电话">
                <el-input v-model="device.contactNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="上传图片">
                <el-upload
                  ref="upload"
                  action
                  :disabled="true"
                  :file-list="photoList"
                  :limit="2"
                  list-type="picture"
                  :auto-upload="false"
                  :on-change="getFile"
                  :on-remove="removePhoto"
                >
                  <el-button size="small" type="primary" icon="el-icon-upload2">点击上传</el-button>
                  <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</span>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 雷达参数 -->
        <div v-if="isLeiDa">
          <Title title="雷达参数"></Title>
          <el-form label-width="160px">
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="最大探测距离" required>
                  <el-input  :disabled="true"
                    type="float"
                    placeholder="最大探测距离(单位：千米)"
                    v-model="radarDev.detectDistance"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方位角精度" required>
                  <el-input  :disabled="true" placeholder="方位角精度(单位：度)" v-model="radarDev.anglePrecision"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="水平精度" required>
                  <el-input  :disabled="true" placeholder="水平精度(单位：米)" v-model="radarDev.horizPrecision"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据率" required>
                  <el-input  :disabled="true" placeholder="数据率(单位：秒)" v-model="radarDev.dataRate"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="近距离盲区">
                  <el-input  :disabled="true" placeholder="近距离盲区(单位：米)" v-model="radarDev.closeBlindArea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="顶空盲区" required>
                  <el-input  :disabled="true" placeholder="顶空盲区(单位：度)" v-model="radarDev.upperBlindArea"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="可探测目标速度最小值">
                  <el-input  :disabled="true" placeholder="可探测目标速度最小值(单位：m/s)" v-model="radarDev.targetSpeedMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="可探测目标速度最大值">
                  <el-input  :disabled="true" placeholder="可探测目标速度最大值(单位：m/s)" v-model="radarDev.targetSpeedMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="多目标处理能力最小值">
                  <el-input  :disabled="true" placeholder="多目标处理能力最小值(单位：个)" v-model="radarDev.targetNumberMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="多目标处理能力最大值">
                  <el-input  :disabled="true" placeholder="多目标处理能力最大值(单位：个)" v-model="radarDev.targetNumberMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="处理时间">
                  <el-input  :disabled="true" placeholder="处理时间(单位：秒)" v-model="radarDev.handleTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作频段">
                  <el-input  :disabled="true" placeholder="请输入工作频段(如X、Ku、C、L、K、S)" v-model="radarDev.workFrequency"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测高度">
                  <el-input  :disabled="true" placeholder="探测高度(单位：米)" v-model="radarDev.detectHight"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="探测速度精度">
                  <el-input  :disabled="true" placeholder="探测速度精度(单位：m/s)" v-model="radarDev.detectVelPrec"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="搜索速度">
                  <el-input  :disabled="true" placeholder="搜索速度(单位：r/min)" v-model="radarDev.detectVelocity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="额定功率">
                  <el-input  :disabled="true" placeholder="额定功率(单位：千瓦)" v-model="radarDev.powerRating"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
        </div>

        <!-- 光电参数 -->
        <div v-if="isGuangDian">
          <Title title="光电设备参数"></Title>
          <el-form label-width="120px">
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测距离" required>
                  <el-input  :disabled="true" placeholder="探测距离(单位：千米)" v-model="optoelecDev.detectDistance"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分辨率" required>
                  <el-input  :disabled="true" placeholder="分辨率(单位：万)" v-model="optoelecDev.resolutionRatio"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="定位精度" required>
                  <el-input  :disabled="true" placeholder="定位精度(单位：度)" v-model="optoelecDev.anglePrecision"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="识别距离">
                  <el-input  :disabled="true" placeholder="识别距离(单位：千米)" v-model="optoelecDev.recognitionDistance"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="工作波段最小值">
                  <el-input  :disabled="true" placeholder="工作波段最小值(单位：微米)" v-model="optoelecDev.workFrequencyMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作波段最大值">
                  <el-input  :disabled="true" placeholder="工作波段最大值(单位：微米)" v-model="optoelecDev.workFrequencyMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="定位距离">
                  <el-input  :disabled="true" placeholder="定位距离(单位：千米)" v-model="optoelecDev.locationDistance"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="探测方位最大值">
                  <el-input  :disabled="true" placeholder="探测方位最大值(单位：度)" v-model="optoelecDev.detectDirectionMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测方位最小值">
                  <el-input  :disabled="true" placeholder="探测方位最小值(单位：度)" v-model="optoelecDev.detectDirectionMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="探测俯仰最大值">
                  <el-input  :disabled="true" placeholder="探测俯仰最大值(单位：度)" v-model="optoelecDev.detectPitchMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测俯仰最小值">
                  <el-input  :disabled="true" placeholder="探测俯仰最小值(单位：度)" v-model="optoelecDev.detectPitchMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="搜索周期">
                  <el-input  :disabled="true" placeholder="搜索周期(单位：秒)" v-model="optoelecDev.searchCycle"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="水平旋转速度">
                  <el-input  :disabled="true" placeholder="水平旋转速度(单位：度/秒)" v-model="optoelecDev.horiRotaVel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="俯仰旋转速度">
                  <el-input  :disabled="true" placeholder="俯仰旋转速度(单位：度/秒)" v-model="optoelecDev.pitchRotaVel"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="启动时间">
                  <el-input  :disabled="true" placeholder="启动时间(单位：分钟)" v-model="optoelecDev.startTime"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
        </div>

        <!-- 多站TDOA参数 -->
        <div v-if="isDuoZhan">
          <Title title="多站TDOA设备参数"></Title>
          <el-form label-width="140px">
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测距离" required>
                  <el-input  :disabled="true" placeholder="探测距离(单位：千米)" v-model="tdoaDev.detectDistance"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作频段最小值" required>
                  <el-input  :disabled="true" placeholder="工作频段最小值(单位：赫兹)" v-model="tdoaDev.workFrequencyMin"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="工作频段最大值" required>
                  <el-input  :disabled="true" placeholder="工作频段最大值(单位：赫兹)" v-model="tdoaDev.workFrequencyMax"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="距离精度" required>
                  <el-input  :disabled="true" placeholder="距离精度(单位：米)" v-model="tdoaDev.horizPrecision"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="方位角精度" required>
                  <el-input  :disabled="true" placeholder="方位角精度(单位：度)" v-model="tdoaDev.anglePrecision"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="监测灵敏度" required>
                  <el-input  :disabled="true" placeholder="监测灵敏度(单位：dBm)" v-model="tdoaDev.monitorPrecision"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测高度" required>
                  <el-input  :disabled="true" placeholder="探测高度(单位：米)" v-model="tdoaDev.detectHight"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
        </div>

        <!-- 无源雷达参数 -->
        <div v-if="isWuYuanLeiDa">
          <Title title="无源雷达参数"></Title>
          <el-form label-width="140px">
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测距离" required>
                  <el-input  :disabled="true" placeholder="探测距离(单位：千米)" v-model="passiveRadarDev.detectDistance"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="距离精度" required>
                  <el-input  :disabled="true" placeholder="距离精度(单位：米)" v-model="passiveRadarDev.horizPrecision"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="工作频段最小值">
                  <el-input  :disabled="true"
                    placeholder="工作频段最小值(单位：兆赫兹)"
                    v-model="passiveRadarDev.workFrequencyMin"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作频段最大值">
                  <el-input  :disabled="true"
                    placeholder="工作频段最大值(单位：兆赫兹)"
                    v-model="passiveRadarDev.workFrequencyMax"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测速度精度">
                  <el-input  :disabled="true" placeholder="探测速度精度(单位：米/秒)" v-model="passiveRadarDev.detectVelPrec"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="探测方位最大值">
                  <el-input  :disabled="true"
                    placeholder="探测方位最大值(单位：度)"
                    v-model="passiveRadarDev.detectDirectionMax"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测方位最小值">
                  <el-input  :disabled="true"
                    placeholder="探测方位最小值(单位：度)"
                    v-model="passiveRadarDev.detectDirectionMin"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="探测俯仰最大值">
                  <el-input  :disabled="true" placeholder="探测俯仰最大值(单位：度)" v-model="passiveRadarDev.detectPitchMax"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测俯仰最小值">
                  <el-input  :disabled="true" placeholder="探测俯仰最小值(单位：度)" v-model="passiveRadarDev.detectPitchMin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扫描速度">
                  <el-input  :disabled="true" placeholder="扫描速度(单位：r/min)" v-model="passiveRadarDev.detectVelocity"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="探测高度">
                  <el-input  :disabled="true" placeholder="探测高度(单位：米)" v-model="passiveRadarDev.detectHight"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
        <el-button type="primary" class="loginform-btn" @click="back">返回</el-button>

        </div>
      </div>
    </div>
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
// 回显用到的照片类
function Photo(name, url) {
  this.name = name;
  this.url = url;
}
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
       // 照片回显用
      photoList: [],
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
    let photoList = [];
    for (var index = 0; index < device.photos.length; index++) {
      photoList.push(new Photo("图片" + (index + 1), device.photos[index]));
    }
    this.photoList = photoList;
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

