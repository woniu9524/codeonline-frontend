<template>
  <el-card class="box-card">
    <el-form :model="labForm" ref="form" label-width="100px">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="实验名称" prop="labName">
            <el-input v-model="labForm.labName" placeholder="请输入实验名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="labStartTime">
            <el-date-picker
                v-model="labForm.labStartTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="labEndTime">
            <el-date-picker
                v-model="labForm.labEndTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="实验内容" prop="labContent">
              <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="labForm.labContent">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="实验资料" prop="labContent">
              <el-upload
                  class="upload-lab-file"
                  drag
                  :auto-upload="false"
                  :on-change="handleChanges"
                  :limit="1"
                  :on-exceed="handleExceed"
              >
                <el-icon ><upload-filled /></el-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

    </el-form>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";
import {uploadExperimentFile} from "@/api/course/courseManage";
import useCourseStore from "@/store/modules/course";
export default {
  name: "LabSettingCard",
  props: {
    labForm: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return{
      courseId:'',
    }
  },
  methods:{

    handleChanges(file, fileList){
      let param = new FormData();
      console.log(file)
      param.append('experimentFile',file.raw)
      console.log(param)
      useCourseStore().uploadExperimentFileAction(param,this.courseId).then(()=>{
        console.log(useCourseStore().fileUrl)
      })
    },
    handleExceed(){
      ElMessage.warning(
          "只允许上传一份资料"
      )
    }
  },
  mounted() {
    this.courseId=this.$route.query.courseId;
  }

}
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.upload-lab-file{
  width: 100%;
}
</style>
