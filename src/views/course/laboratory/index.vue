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
    <iframe class="lab-frame"/>
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
        <p>开始时间：{{labInfo.labStartTime}}</p>
        <p>结束时间：{{labInfo.labEndTime}}</p>
        <p>创建人：{{labInfo.createBy}}</p>
        <h3>指导文件：<a href="#" style="color: #1c84c6">文件1</a></h3>
        <h3>实验介绍：</h3>
        <p>{{labInfo.labContent}}</p>
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

const drawer = ref(false)

// 读取实验信息
const labInfo = ref({})
selectExperimentByExperimentId(labId).then(response => {
  labInfo.value = response.data
})

// 开启容器
const startContainer = () => {
  addK8sDeployment(labId).then(response => {
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}

// 启动实验
const startLab= () => {
  startK8sEnvironment(labId).then(response => {
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}

// 结束实验
const endLab = () => {
  deleteLabByStudent(labId).then(response => {
    ElNotification({
      message: response.msg,
      type: 'success',
    })
  })
}
</script>

<script>
export default {
  name: 'LaboratoryManagement',
}
</script>

<style scoped>

.lab-frame {
  width: 100%;
  height: calc(100vh - 148px);
  background-color: #1ab394;
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
