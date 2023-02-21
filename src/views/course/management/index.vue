<template>
  <!-- 课程信息 -->
  <CourseIntroductionCard :course-info="courseInfo"/>
  <!-- 实验管理  -->
  <LaboratoryListCard :labListData="labListData" />
  <!-- 学生管理 -->
  <StudentListCard/>

</template>

<script lang="ts" setup>
import {ref, reactive, onMounted, onUnmounted, watch, computed, toRefs} from "vue";
// 读取路由参数
import {useRoute} from "vue-router";
import CourseIntroductionCard from "@/components/Course/CourseIntroduceCard/index.vue";
import LaboratoryListCard from "@/components/Course/LaboratoryListCard/index.vue";  // 实验列表

const courseId = useRoute().query.courseId
console.log(courseId)

// 查询课程信息
import {selectCourseInfo,selectExperimentByCourseId} from "@/api/course/courseManage.js";

const courseInfo = reactive({
  id: "",
  courseName: "",
  courseStartTime: "",
  courseEndTime: "",
  courseWeek: "",
  introduction: "",
  courseStatus: "",
});

const labListData = ref([])

onMounted(async () => {
  const res = await selectCourseInfo(courseId);
  courseInfo.id = res.data.id;
  courseInfo.courseName = res.data.courseName;
  courseInfo.courseStartTime = res.data.courseStartTime;
  courseInfo.courseEndTime = res.data.courseEndTime;
  courseInfo.courseWeek = res.data.courseWeek;
  courseInfo.introduction = res.data.introduction;
  courseInfo.courseStatus = res.data.courseStatus;
  console.log(courseInfo);
  // 读取课程信息
  selectExperimentByCourseId(courseId).then(res=>{
    labListData.value=res.data
  })


});

// 学生列表
import StudentListCard from "@/components/Course/StudentListCard/index.vue";

</script>

<style scoped>

</style>
