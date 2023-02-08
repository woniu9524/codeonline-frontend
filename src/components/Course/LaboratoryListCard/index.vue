<template>
  <div class="card">
    <div class="card-header">
      <h3>实验管理</h3>
    </div>

    <div class="card-body">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="Plus"
              size="small"
              @click="handleAdd"
          >新增
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" height="250px">
        <el-table-column prop="labId" label="实验ID" width="120" />
        <el-table-column prop="labName" label="实验名称" width="120" />
        <el-table-column prop="labContent" label="实验内容" />
        <el-table-column prop="labStartTime" label="开始时间" width="120" />
        <el-table-column prop="labEndTime" label="结束时间" width="120" />
        <el-table-column prop="createBy" label="创建人" width="240" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="goManage">管理</el-button>
            <el-button link type="primary" size="small" @click="goTest">测试</el-button>
            <el-button link type="primary" size="small" @click="handleEdit">修改</el-button>
            <el-button link type="primary" size="small" @click="handleDelete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 添加或修改实验配置对话框 -->
  <el-dialog :title="labTitle" v-model="labOpen" width="950px" append-to-body>
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="实验信息"></el-step>
        <el-step title="k8s配置"></el-step>
      </el-steps>
      <div style="margin-top: 20px">
        <div v-show="active===0">
          <lab-setting-card :lab-form="labForm"></lab-setting-card>
        </div>
        <div v-show="active===1">
<!--          <k8s-configure-card :k8s-form="k8sForm"></k8s-configure-card>-->
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="info" @click="active--" v-show="active>0">上一步</el-button>
      <el-button type="primary" @click="submitForm" v-if="active===1">确 定</el-button>

      <el-button type="primary" @click="active++" v-else>下一步</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LabSettingCard from "@/components/Course/LabSettingCard/index.vue";
// import K8sConfigureCard from "@/components/Course/K8sConfigureCard/index.vue";

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
});

const labOpen = ref(false);
const labTitle = ref("添加实验");
const active = ref(0);
const labForm = ref({});
const k8sForm = ref({
  sourceFrom: "harbor",
  imageName: undefined,
  ports: [{port: undefined, targetPort: undefined,service: "no"}],
  startCmd: undefined,
  startArgs: undefined,
  envs: [
    {key: undefined, value: undefined}
  ],
  volume: undefined,
  description: undefined,
  privilege: false,
  hasPublic: false,
});

const handleAdd = () => {
  labOpen.value = true;
  labTitle.value = "添加实验";
  active.value = 0;
  labForm.value = {};
  k8sForm.value = {
    sourceFrom: "harbor",
    imageName: undefined,
    ports: [{port: undefined, targetPort: undefined,service: "no"}],
    startCmd: undefined,
    startArgs: undefined,
    envs: [
      {key: undefined, value: undefined}
    ],
    volume: undefined,
    description: undefined,
    privilege: false,
    hasPublic: false,
  };
};

const handleEdit = () => {
  labOpen.value = true;
  labTitle.value = "修改实验";
  active.value = 0;
  labForm.value = {};
  k8sForm.value = {
    sourceFrom: "harbor",
    imageName: undefined,
    ports: [{port: undefined, targetPort: undefined,service: "no"}],
    startCmd: undefined,
    startArgs: undefined,
    envs: [
      {key: undefined, value: undefined}
    ],
    volume: undefined,
    description: undefined,
    privilege: false,
    hasPublic: false,
  };
};

const handleDelete = () => {
  console.log("删除");
};

const goManage = () => {
  console.log("管理");
};

const goTest = () => {
  console.log("测试");
};

const cancel = () => {
  labOpen.value = false;
};

const submitForm = () => {
  console.log("提交");
};



</script>

<style scoped>

.card {
  width: 95%;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px auto;
}

.card-header {
  padding: 20px;
  background-color: lightblue;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.card-header h3 {
  margin: 0;
  font-size: 24px;
  color: white;
}
.card-body {
  padding: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
