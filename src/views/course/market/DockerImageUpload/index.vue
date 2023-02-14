<template>
  <div class="app-container">
    <el-form ref="uploadImageForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="镜像名" prop="environmentName">
        <el-input v-model="formData.environmentName" placeholder="请输入环境名" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="镜像标签" prop="tag">
        <el-input v-model="formData.tag" placeholder="请输入标签" clearable></el-input>
      </el-form-item>

      <el-form-item label="上传类型" prop="uploadType">
        <!--上传方式：dockerfile,image包,container包-->
        <el-radio-group v-model="formData.uploadType">
          <el-radio label="dockerfile">dockerfile</el-radio>
          <el-radio label="image">镜像包</el-radio>
          <el-radio label="container">容器包</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="公开" prop="isPublic">
        <el-switch
            v-model="formData.isPublic"
            active-color="#13ce66"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="3" placeholder="请输入介绍(可空)" clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="上传">
        <el-upload
            ref="upload"
            drag
            :limit="1"
            :action="upload.url"
            :headers="upload.headers"
            :file-list="upload.fileList"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :before-upload="uploadBeforeUpload"
            :auto-upload="false">
          <el-icon><UploadFilled /></el-icon>
          <div >将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">支持上传docker镜像或者dockerfile</div>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" :loading="upload.isUploading" @click="submitUpload">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import {getToken} from "@/utils/auth";
import {addHarborUploadTable, getUploadStatus} from "@/api/cloud/harbor";

export default {
  name: 'DockerImageUpload',
  data() {
    return {
      formData: {
        environmentName: undefined,
        tag: undefined,
        introduce: undefined,
        isPublic: false,
        uploadType: 'dockerfile',
        uuid: null,
      },
      rules: {
        prefix: [],
        environmentName: [{
          required: true,
          message: '请输入环境名',
          trigger: 'blur'
        }],
        tag: [{
          required: true,
          message: '请输入标签',
          trigger: 'blur'
        }],
      },
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: import.meta.env.VITE_APP_BASE_API + '/cloud/harbor/upload/file',
        // 上传的文件列表
        fileList: []
      },
      uploadToken: undefined,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    submitForm() {
      this.$refs['uploadImageForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        const that = this
        addHarborUploadTable(this.formData).then(response => {
          that.uploadToken = response.data.uploadToken;
          this.$message({
            message: '提交成功，后台正在处理中……，若长时间没有响应，可以在镜像市场中查看是否已经上传成功',
            type: 'success'
          })
          this.checkUploadStatus()
        })
      })
    },
    resetForm() {
      this.$refs['uploadImageForm'].resetFields()
    },
    uploadBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2GB')
      }
      // if (file.size < 10 * 1024 * 1024) {
      //   //小于10M认为是dockerfile
      //   this.formData.isDockerfile = true;
      // }
      return isRightSize
    },
    // 文件提交处理
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      this.formData.uuid = response.msg;
      if (response.code === 200) {
        //继续上传表单
        this.submitForm();
      } else {
        alert("上传出错");
      }
    },
    // 轮询查看是否上传成功
    checkUploadStatus() {
      const that = this
      let timer;
      getUploadStatus(this.uploadToken).then(response => {
        console.log(response)
        if (response.data.status === "上传成功") {
          that.$message({
            message: '上传成功',
            type: 'success'
          })
          clearTimeout(timer)
        } else if (response.data.status === "上传失败") {
          that.$message({
            message: '上传失败',
            type: 'error'
          })
          clearTimeout(timer)
        } else if (response.data.status === "上传中") {
          timer = setTimeout(() => {
            that.checkUploadStatus()
          }, 1000 * 10)
        }

      }).catch(error => {
        console.log(error)
      })

    }
  },
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
