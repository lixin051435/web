<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/team' }">修改设备</el-breadcrumb-item>
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
              <td class="td-label">
                上传图片
              </td>
              <td class="td-upload">
                <el-upload
                  action
                  :file-list="photoList"
                  :limit="2"
                  list-type="picture"
                  :auto-upload="false"
                  :on-change="getFile"
                  :on-remove="removePhoto"
                >
                  <el-button size="small" class="upload-btn" type="primary">点击上传</el-button>

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

        <button class="btn button" @click="updateDevice">确认修改</button>
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
      photoList:[],
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
    updateDevice1() {
    },
    updateDevice() {
      var that = this;
      // 存的时候是四个参数都有,发送的时候有几个类型就发几个参数
      var device = this.device;
      device.deviceParam = {};
      if (this.isLeiDa) {
        device.deviceParam.radarDev = this.regularize(this.radarDev);
      }
      if (this.isGuangDian) {
        device.deviceParam.optoelecDev = this.regularize(this.optoelecDev);
      }
      if (this.isDuoZhan) {
        device.deviceParam.tdoaDev = this.regularize(this.tdoaDev);
      }
      if (this.isWuYuanLeiDa) {
        device.deviceParam.passiveRadarDev = this.regularize(
          this.passiveRadarDev
        );
      }
      var axiosInstance = axios.create({
        baseURL: that.URL,
        headers: {
          "content-type": "application/json",
          authorization: "JWT " + sessionStorage.getItem("token")
        }
      });
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
              if (that.photos[i] instanceof Photo) {
                photoBase64.push(that.photos[i].url);
                number++;
                device.photos = photoBase64;
                if (number == sum) {
                  axiosInstance.put("/sign-up/devices", device).then(res => {
                    console.log(res.data);
                    that.$router.push({
                      path: "/device"
                    });
                  });
                }
              } else {
                let raw = that.photos[i].raw;
                that.getBase64(raw).then(res => {
                  number++;
                  photoBase64.push(res);
                  device.photos = photoBase64;
                  if (number == sum) {
                  axiosInstance.put("/sign-up/devices", device).then(res => {
                    console.log(res.data);
                    that.$router.push({
                      path: "/device"
                    });
                  });
                }
                });
              }
            }
          } else {
            axiosInstance.put("/sign-up/devices", device).then(res => {
              console.log(res.data);
              that.$router.push({
                path: "/device"
              });
            });
          }
        }
      } else {
        alert("请补全所有必填参数后提交");
        return;
      }
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
      if (device.manufacturer == "") {
        alert("请填写设备厂商");
        return false;
      }
      if (device.contactNumber == "") {
        alert("请填写厂商电话");
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
    }
  }
};
</script>

