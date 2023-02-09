<template>
  <div class="card">
    <div class="card-header">
      <h3>学生管理</h3>
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
      <el-table :data="tableData" style="width: 100%" height="450px">
        <el-table-column prop="userId" label="学生ID" width="120"/>
        <el-table-column prop="nickName" label="学生昵称" width="120"/>
        <el-table-column prop="collageName" label="学生学院" width="120"/>
        <el-table-column prop="className" label="学生班级"/>
        <el-table-column prop="phonenumber" label="学生电话" width="120"/>
        <el-table-column prop="email" label="学生邮箱" width="120"/>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <el-input v-model="studentId" placeholder="输入学生ID" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addStudent">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {useRouter} from "vue-router";
import {addStudentToCourse, deleteStudent, selectStudentByCourseId} from "@/api/course/courseManage";
import {ElMessage} from "element-plus";
const dialogVisible = ref(false)
const studentId = ref('')
const tableData=ref([])

// 读取路由参数
const courseId=useRouter().currentRoute.value.query.courseId
console.log(courseId)

// 获取学生列表
onMounted(async () => {
  const res = await selectStudentByCourseId(courseId)
  tableData.value = res.data
})
const handleAdd = () => {
  dialogVisible.value = true
}
const handleDelete = (index) => {
  deleteStudent(courseId,tableData.value[index].userId).then(res=>{
    if (res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      selectStudentByCourseId(courseId).then(res=>{
        tableData.value=res.data
      })
    } else {
      ElMessage.error(res.msg)
    }
  })
}
const addStudent = () => {
  addStudentToCourse(courseId,studentId.value).then(res=>{
    if (res.code === 200) {
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
      dialogVisible.value = false
      studentId.value = ''
      selectStudentByCourseId(courseId).then(res=>{
        tableData.value=res.data
      })

    } else {
      ElMessage.error(res.msg)
    }
  })
}


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
