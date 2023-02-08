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
                value-format="yyyy-MM-dd HH:mm:ss"
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
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div>
        <el-form-item label="实验内容" prop="labContent">
          <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="labForm.labContent">
          </el-input>
        </el-form-item>
      </div>




    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "LabSettingCard",
  props: {
    labForm: {
      type: Object,
      default: () => {}
    }
  },
}
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
</style>
