<template>
  <div class="app-container">
    <el-form ref="ruleFormRef" :model="identityFormData" :rules="rules" label-width="100px"
             v-if="formShow">
      <el-form-item label="身份选择" prop="identityChoose">
        <el-select v-model="identityFormData.identityChoose" placeholder="请选择身份" clearable
                   :style="{width: '30%'}">
          <el-option v-for="(item, index) in identityChooseOptions" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校选择" prop="universityChoose">
        <el-select v-model="identityFormData.universityChoose" placeholder="请选择学校" clearable
                   :style="{width: '30%'}">
          <el-option v-for="(item, index) in universityChooseOptions" :key="index" :label="item.deptName"
                     :value="item.deptId" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院选择" prop="collegeChoose">
        <el-select v-model="identityFormData.collegeChoose" placeholder="请选择学院" clearable
                   :style="{width: '30%'}">
          <el-option v-for="(item, index) in collegeChooseOptions" :key="index" :label="item.deptName"
                     :value="item.deptId" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级选择" prop="classChoose" v-show="classShow">
        <el-select v-model="identityFormData.classChoose" placeholder="请选择班级" clearable
                   :style="{width: '30%'}">
          <el-option v-for="(item, index) in classChooseOptions" :key="index" :label="item.deptName"
                     :value="item.deptId" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人" prop="adminChoose">
        <el-select v-model="identityFormData.adminChoose" placeholder="请选择审批人" clearable
                   :style="{width: '30%'}">
          <el-option v-for="(item, index) in adminChooseOptions" :key="index" :label="item.nickName"
                     :value="item.userId" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="identityFormData.remark" placeholder="请输入备注" clearable :style="{width: '30%'}">
        </el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <el-card style="width: 30%;" v-else>
      <div slot="header" class="clearfix">
        <span>{{affairFormData.status}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="formShow=true">重新绑定</el-button>
      </div>
      <div>
        <!--    根据affairFormData    -->
        <el-row style="margin: 10px 0 10px 0">
          <el-col :span="8">申请人：</el-col>
          <el-col :span="16">{{ affairFormData.createBy }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0 10px 0">
          <el-col :span="8">事务状态：</el-col>
          <el-col :span="16">{{ affairFormData.status }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0 10px 0">
          <el-col :span="8">更新时间：</el-col>
          <el-col :span="16">{{ affairFormData.updateTime }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0 10px 0">
          <el-col :span="8">备注：</el-col>
          <el-col :span="16">{{ affairFormData.remark }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0 10px 0">
          <el-col :span="8">处理人：</el-col>
          <el-col :span="16">{{ affairFormData.approverName }}</el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted, onUnmounted, watch, computed, toRefs} from "vue";
import {addIdentity, readAdmins, readClass, readCollege, readTeachers, readUniversity,readIdentity} from "@/api/identity/identity";
import {ElMessage} from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const formShow = ref(true)

const classShow = ref(false)

const identityFormData = reactive({
  identityChoose: '',
  universityChoose: '',
  collegeChoose: '',
  classChoose: '',
  adminChoose: '',
  remark: ''
})

const affairFormData = ref({
  createBy: '',
  status: '',
  updateTime: '',
  remark: '',
  approverName: ''
})

const rules = {
  identityChoose: [
    {required: true, message: '请选择身份', trigger: 'blur'}
  ],
  universityChoose: [
    {required: true, message: '请选择学校', trigger: 'blur'}
  ],
  collegeChoose: [
    {required: true, message: '请选择学院', trigger: 'blur'}
  ],
  classChoose: [
    {required: true, message: '请选择班级', trigger: 'blur'}
  ],
  adminChoose: [
    {required: true, message: '请选择审批人', trigger: 'blur'}
  ]
}

const identityChooseOptions = [
  {value: 101, label: '学生'},
  {value: 100, label: '教师'},
]
const universityChooseOptions = ref([])
const collegeChooseOptions = ref([])
const classChooseOptions = ref([])
const adminChooseOptions = ref([])

/* 提交表单 */
const identityForm = ref(null)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!valid) return;
      addIdentity(identityFormData).then(response => {
        if (response.code === 200) {
          ElMessage({
            message: response.msg,
            type: 'success',
          })
          formShow.value = false
        } else {
          ElMessage({
            message: response.msg,
            type: 'error',
          })
        }
      }).catch(error => {
        ElMessage({
          message: '提交失败',
          type: 'error',
        })
      })
    } else {
      ElMessage({
        message: '参数不能为空',
        type: 'error',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}





onMounted(() => {
  readUniversity().then(response => {
    if (response.code === 200) {
      universityChooseOptions.value = response.data
    }
  }).catch(error => {
    ElMessage({
      message: '获取学校失败',
      type: 'error',
    })
  })

  readIdentity().then(response => {
    if (response.code === 200) {
      if (response.data!==undefined){
        affairFormData.value= response.data
        formShow.value = false
      }
    }
  }).catch(error => {
  })
})


// 监听identityFormData.universityChoose，当其发生变化时，获取学院
watch(()=>identityFormData.universityChoose, (newVal, oldVal) => {
  if(typeof newVal === 'number'){
    readCollege(newVal).then(response => {
      if (response.code === 200) {
        collegeChooseOptions.value = response.data
      }
    }).catch(error => {
      ElMessage({
        message: '获取学院失败',
        type: 'error',
      })
    })
  }
})

/* 监听identityFormData.collegeChoose */
watch(()=>identityFormData.collegeChoose, (newVal, oldVal) => {
  if(typeof newVal === 'number'){
    readClass(newVal).then(response => {
      if (response.code === 200) {
        classChooseOptions.value = response.data
      }
    }).catch(error => {
      ElMessage({
        message: '获取班级失败',
        type: 'error',
      })
    })
  }
})

/* 监听identityFormData.identityChoose */
watch(()=>identityFormData.identityChoose, (newVal, oldVal) => {
  if(newVal === 101){
    classShow.value = true
  }else{
    classShow.value = false

  }
})

/* 监听identityFormData.identityChoose和identityFormData.collegeChoose和identityFormData.universityChoose */
watch(()=>[identityFormData.identityChoose, identityFormData.collegeChoose,identityFormData.universityChoose], (newVal, oldVal) => {
  if(newVal[0] === 101 && typeof newVal[1] === 'number'){
    readTeachers(newVal[1]).then(response => {
      if (response.code === 200) {
        adminChooseOptions.value = response.data
      }
    }).catch(error => {
      ElMessage({
        message: '获取审批人失败',
        type: 'error',
      })
    })

  }else if(newVal[0] === 100 && typeof newVal[2] === 'number'){
    readAdmins(newVal[2]).then(response => {
      if (response.code === 200) {
        adminChooseOptions.value = response.data
      }
    }).catch(error => {
      ElMessage({
        message: '获取审批人失败',
        type: 'error',
      })
    })

  }
})
</script>

<style scoped>

</style>
