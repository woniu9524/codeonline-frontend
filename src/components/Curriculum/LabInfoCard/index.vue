<template>
  <!-- 实验列表卡片  -->
  <div class="lab-info-card">
    <!-- 添加实验ID -->
    <p>实验ID：{{labInfo.labId}}</p>
    <!-- 添加实验名称 -->
    <h3>{{labInfo.labName}}</h3>
    <!-- 添加实验内容 -->
    <p>{{labInfo.labContent}}</p>
    <!-- 添加开始时间 -->
    <p>开始时间：{{labInfo.labStartTime}}</p>
    <!-- 添加结束时间 -->
    <p>结束时间：{{labInfo.labEndTime}}</p>
    <!-- 添加创建人 -->
    <p>创建人：{{labInfo.createBy}}</p>
    <!-- 添加一个进入实验按钮 -->
    <button @click="goLab">进入实验</button>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "LabInfoCard",
  props: {
    labInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    // 进入实验
    const goLab = () => {
      // 跳转到实验页面
      router.push({path: "/course/laboratory/use", query: {labId: props.labInfo.labId}});
    };
    return {
      goLab,
    };
  },
}
</script>

<style scoped>

/* 定义卡片的样式 */
.lab-info-card {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #999;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 定义卡片中的标题样式 */
.lab-info-card h3 {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

/* 定义卡片中的段落样式 */
.lab-info-card p {
  color: #666;
  font-size: 16px;
  line-height: 1.5em;
}

/* 定义卡片中的按钮样式 */
.lab-info-card button {
  display: block;
  width: 100%;
  height: 40px;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
