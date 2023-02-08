<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>身份绑定管理</span>
      </div>
    </template>
    <div>
      <el-table :data="tableData" height="450px" style="width: 100%">
        <el-table-column prop="createBy" label="用户名" width="180"/>
        <el-table-column prop="collegeName" label="学院" width="180"/>
        <el-table-column prop="className" label="班级" width="180"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="updateTime" label="更新时间"/>
        <el-table-column prop="status" label="当前状态"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handlePass(scope.$index, scope.row)"
            >批准
            </el-button
            >
            <el-button link type="danger" size="small" @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup>

import {onMounted} from "vue";
import {approvalUser, readPeopleApprovalByApprover, refuseUser} from "@/api/user/approval/approval";
import {ElMessage} from "element-plus";

const tableData = ref([])

const handlePass = (index,row) => {

  approvalUser({id:row.id}).then(response => {
    if (response.code === 200) {
      ElMessage({
        message: response.msg,
        type: 'success',
      })
      tableData.value.splice(index,1)
    }
  }).catch(error => {
    ElMessage({
      message: '操作失败',
      type: 'error',
    })
  })
}

const handleRefuse = (index,row) => {
  refuseUser({id:row.id}).then(response => {
    if (response.code === 200) {
      ElMessage({
        message: response.msg,
        type: 'success',
      })
      tableData.value.splice(index,1)
    }
  }).catch(error => {
    console.log(error)
    ElMessage({
      message: '操作失败',
      type: 'error',
    })
  })
}

onMounted(()=>{

  readPeopleApprovalByApprover().then(response => {
    if (response.code === 200) {
      tableData.value=response.data
    }
  }).catch(error => {
    ElMessage({
      message: '获取学生失败',
      type: 'error',
    })
  })
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 90%;
  margin: auto;
  margin-top: 50px;
}
</style>
