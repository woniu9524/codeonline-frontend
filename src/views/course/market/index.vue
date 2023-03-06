<template>
<div>
  <el-container>
    <el-header style="margin-top: 30px">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="发布者" prop="userName">
          <el-input
              v-model="queryParams.userName"
              placeholder="请输入发布者"
              clearable
              style="width: 150px"
              @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="镜像名称" prop="imageName">
          <el-input
              v-model="queryParams.imageName"
              placeholder="请输入镜像名称"
              clearable
              style="width: 150px"
              @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" size="small" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" size="small" @click="resetQuery">重置</el-button>
          <el-button type="danger" size="small" @click="hotRank">最多使用</el-button>
          <el-button type="success" size="small" @click="updateRank">最新更新</el-button>
          <el-button type="primary" @click="showUploadImage=true" icon="Upload" size="small">上传镜像</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-row :gutter="20" v-for="o in Math.floor(imageInfos.length/4)" :key="o">
        <el-col :span="6">
          <image-card :image-info="imageInfos[o*4-4]"></image-card>
        </el-col>
        <el-col :span="6">
          <image-card :image-info="imageInfos[o*4+1-4]"></image-card>
        </el-col>
        <el-col :span="6">
          <image-card :image-info="imageInfos[o*4+2-4]"></image-card>
        </el-col>
        <el-col :span="6">
          <image-card :image-info="imageInfos[o*4+3-4]"></image-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="imageInfos.length%4!==0">
        <el-col :span="6" v-for="o in imageInfos.length%4" :key="o">
          <image-card :image-info="imageInfos[imageInfos.length-4+o>=0?imageInfos.length-4+o:o-1]"></image-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  <!-- 上传镜像抽屉 -->
  <el-drawer v-model="showUploadImage" direction="rtl">
    <template #header>
      <span>上传镜像</span>
    </template>
    <DockerImageUpload></DockerImageUpload>
  </el-drawer>

</div>
</template>

<script>

import {getAllImageList} from "@/api/cloud/harbor";
import ImageCard from "@/components/Course/ImageCard/index.vue";
import DockerImageUpload from "@/views/course/market/DockerImageUpload/index.vue";

export default {
  name: "Market",
  components: {ImageCard, DockerImageUpload},
  data() {
    return {
      queryParams: {
        userName: undefined,
        imageName: undefined,
        createTime: undefined,
      },
      dateRange: [],
      showSearch: true,
      imageInfos: [],
      imageInfosCopy: [],
      showUploadImage: false,

    };
  },
  methods: {
    handleQuery() {
      let result = JSON.parse(JSON.stringify(this.imageInfosCopy));

      // 如果userName不为空，查询符合条件的镜像
      if (this.queryParams.userName !== undefined && this.queryParams.userName !== "") {
        result = result.filter(o => o.updateBy === this.queryParams.userName);
      }
      // 如果imageName不为空，查询符合条件的镜像，模糊查询
      if (this.queryParams.imageName !== undefined && this.queryParams.imageName !== "") {
        result = result.filter(o => o.imageName.indexOf(this.queryParams.imageName) !== -1);
      }
      // 如果dateRange不为空，查询符合条件的镜像
      if (this.dateRange.length !== 0) {
        result = result.filter(o => o.updateTime >= this.dateRange[0] && o.updateTime <= this.dateRange[1]);
      }
      console.log(result);
      this.imageInfos = result;


    },
    resetQuery() {
      this.$refs.queryForm.resetFields();
      this.imageInfos=JSON.parse(JSON.stringify(this.imageInfosCopy));
    },
    updateRank() {
      this.imageInfos=JSON.parse(JSON.stringify(this.imageInfosCopy));
    },
    hotRank() {
      this.imageInfos.sort((a, b) => {
        return b.pullCount - a.pullCount;
      });
    },
  },
  mounted() {
    getAllImageList().then(res => {
      // 把更新时间转换为年月日
      res.data.forEach(item => {
        item.updateTime = item.updateTime.substring(0, 10);
      });
      this.imageInfos = JSON.parse(JSON.stringify(res.data));
      console.log(this.imageInfos);
      this.imageInfosCopy = JSON.parse(JSON.stringify(res.data));
    });
  }
}



</script>

<style scoped>

</style>
