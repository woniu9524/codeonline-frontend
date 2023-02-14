<template>
  <el-card class="box-card" shadow="hover" @click.native="goToImageDetail">
    <div>
      <div class="image-name">
        <span >{{imageInfo.imageName}}</span>
      </div>
      <div class="image-introduce">
        <span >{{imageInfo.introduce}}</span>
      </div>
    </div>

    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="10">
        <span>制品数量:{{imageInfo.artifactCount}}</span>
      </el-col>
      <el-col :span="14">
        <span>使用数量:{{imageInfo.pullCount}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <span>创建人:{{imageInfo.updateBy}}</span>
      </el-col>
      <el-col :span="14">
        <span>更新时间:{{imageInfo.updateTime}}</span>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
export default {
  name: "ImageCard",
  props: {
    imageInfo: {
      type: Object,
      required: true,
      default: () => {
        return {
          imageName: undefined,
          introduce: undefined,
          artifactCount: undefined,
          pullCount: undefined,
          updateBy: undefined,
          updateTime: undefined,
        }
      }
    }
  },

  methods: {
    goToImageDetail() {
      // this.$router.push({path: '/harbor/market/detail'});
      console.log('aaa');
    },

  }
}
</script>

<style scoped>
    .box-card {
      width: 100%;
      height: 250px;
      border: #bfcbd9 solid 3px;
      margin-bottom: 20px;
      cursor: pointer;
      background: url("@/assets/images/scattered-forcefields.svg");
    }
    .image-name{
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .image-introduce{
      font-size: 14px;

      height: 100px;
      margin-bottom: 10px;
      overflow: hidden;
    }


</style>
