<template>
<div>
  <el-table :data="studentLabData" style="width: 100%" max-height="250">
<!-- course_id,user_id,teacher_id,lab_id,create_by,create_time,t2.destroy_time,t2.has_destroy -->
    <el-table-column prop="userName" label="学生ID" width="120" />
    <el-table-column prop="nickName" label="学生姓名" width="120" />
    <el-table-column prop="courseId" label="课程ID" width="80" />
    <el-table-column prop="labId" label="实验ID" width="150" />
    <el-table-column prop="createTime" label="创建时间" width="180" />
    <el-table-column prop="destroyTime" label="销毁时间" width="180" />
    <el-table-column prop="labTime" label="实验时长" width="120" />
    <el-table-column prop="labStatus" label="实验状态" width="120" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="manageStudent(scope.$index)"
        >
          管理
        </el-button>
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="goStudentLab(scope.$index)"
        >
          进入实验
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {selectAllStudentExperimentInfo} from "@/api/course/lab";

export default {
  name: "LaboratoryManage",
  data(){
    return{
      studentLabData:[], // 学生实验数据
    }
  },
  methods: {
    goStudentLab(index){
      this.$router.push({path: '/course/laboratory/use', query: {labId: this.studentLabData[index].labId,userId:this.studentLabData[index].userId}})
    },
    manageStudent(index){
      this.$router.push({path: '/course/labManage', query: {labId: this.studentLabData[index].labId}})
    }
  },
  mounted() {
    // 获取路由参数labId
    this.labId = this.$route.query.labId;
    console.log(this.labId);
    // 获取学生实验数据
    selectAllStudentExperimentInfo(this.labId).then(response => {
      let res = response.data;
      // 创建时间和销毁时间转换
      for (let i = 0; i < res.length; i++) {
        if (res[i].createTime != null)
          res[i].createTime = this.$moment(res[i].createTime).format('YYYY-MM-DD HH:mm');
        if (res[i].destroyTime != null)
          res[i].destroyTime = this.$moment(res[i].destroyTime).format('YYYY-MM-DD HH:mm');


      }
      this.studentLabData = response.data;
    })
  }
}
</script>

<style scoped>

</style>
