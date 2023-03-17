<template>
  <!-- 课程信息 -->
  <!--  <CourseIntroductionCard :course-info="courseInfo"/>-->

  <!-- 卡片列表，每行4个 -->
  <div style="width: 95%">
    <el-row :gutter="20" v-for="o in labListData" :key="o">
      <el-col :span="6" v-for="obj in o">
        <lab-info-card :lab-info="obj"></lab-info-card>
      </el-col>
    </el-row>
  </div>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {selectCourseInfo, selectExperimentByCourseId} from "@/api/course/courseManage";
import {useRoute} from "vue-router";

import CourseIntroductionCard from "@/components/Course/CourseIntroduceCard/index.vue";
import LabInfoCard from "@/components/Curriculum/LabInfoCard";

const courseId = useRoute().query.courseId

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
  selectExperimentByCourseId(courseId).then(res => {
    let temp = res.data
    // 把数据转换成二维数组，4个一行
    let temp2 = []
    for (let i = 0; i < temp.length; i += 4) {
      temp2.push(temp.slice(i, i + 4))
    }
    labListData.value = temp2
  })


});
</script>

<style scoped>


</style>
