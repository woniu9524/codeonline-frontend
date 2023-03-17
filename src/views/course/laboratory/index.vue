<template>
  <div>
    <el-card style="height: 60px">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="info" @click="drawer=true">实验信息</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="startContainer">启动环境</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="startLab">开始实验</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="warning" @click="endLab">结束实验</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div>
    <iframe class="lab-frame" :src="frameUrl" v-show="frameShow">

    </iframe>
    <div class="lab-frame" v-show="!frameShow">
          <div style="background-color: #f8ac59;padding: 10px 10px"><h1 v-html="tips"></h1></div>
    </div>
  </div>
<!--  实验信息的抽屉 -->
  <el-drawer
      v-model="drawer"
      direction="rtl"
      :title="labInfo.labName"
      class="lab-drawer"
  >
    <div class="card">
      <div class="header">
        <p>实验ID：{{labId}}</p>
      </div>
      <div class="body">
        <p>开始时间：{{labInfo.lab_start_time}}</p>
        <p>结束时间：{{labInfo.lab_end_time}}</p>
        <p>创建人：{{labInfo.create_by}}</p>
        <h3>指导文件：<a href="{{labInfo.file_url}}" style="color: #1c84c6">{{labInfo.file_name}}</a></h3>
        <h3>实验介绍：</h3>
        <p>{{labInfo.lab_content}}</p>
      </div>
      <el-divider></el-divider>
      <div v-show="frameUrl.value!==''">
        <p>也可以在下面链接中打开实验：<a :href="frameUrl" target="_blank" style="color: #1c84c6" >{{frameUrl}}</a></p>
      </div>
    </div>

  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import {selectExperimentByExperimentId} from "@/api/course/lab";
import {useRoute} from "vue-router";
import {addK8sDeployment, deleteLabByStudent, startK8sEnvironment} from "@/api/cloud/k8s";
import {ElNotification} from "element-plus";

// 读取路由参数
const labId  = useRoute().query.labId
let userId = useRoute().query.userId
if (userId === undefined) {
  userId = -1
}

const drawer = ref(false)
const frameShow = ref(false)

// 读取实验信息
const labInfo = ref({})
selectExperimentByExperimentId(labId).then(response => {
  labInfo.value = response.data
})

// 开启容器
const startContainer = () => {
  addK8sDeployment(labId,userId).then(response => {
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}

const tips = ref('实验步骤：启动环境->开始实验->结束实验')
// 启动实验
const frameUrl = ref('')
const startLab= () => {
  startK8sEnvironment(labId,userId).then(response => {
    let res=response.data[0]
    console.log(res)
    frameUrl.value = res.url
    console.log(frameUrl.value)
    let service=res.service
    let nodePort=res.nodePort
    let port=res.port
    if (service==='vscode'){
      frameShow.value=true
    }else {
      frameShow.value=false
      tips.value='请在浏览器中打开：'+`<a href="${res.url}" target="_blank" style="color: #1c84c6">${res.url}</a>`
    }
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}

// 结束实验
const endLab = () => {
  deleteLabByStudent(labId,userId).then(response => {
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}
</script>

<style scoped>

.lab-frame {
  width: 100%;
  height: calc(100vh - 148px);
  background-color: #1ab394;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lab-drawer {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.header p {
  margin: 5px 0;
  font-size: 16px;
}

.body {
  font-size: 16px;
}

.body p {
  margin: 5px 0;
}

.body h3 {
  margin: 20px 0 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.body ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.body li {
  margin: 5px 0;
}

.body a {
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
}

.body a:hover {
  border-bottom: none;
}

</style>
