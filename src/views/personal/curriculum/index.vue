<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--课程数据-->
      <el-col :span="20" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
                type="primary"
                plain
                icon="Plus"
                size="small"
                @click="handleAdd"
            >新增
            </el-button>
          </el-col>

        </el-row>

        <el-table v-loading="loading" :data="courseList">
          <el-table-column label="课程编号" align="center" key="id" prop="id"/>

          <el-table-column label="课程名称" align="center" key="courseName" prop="courseName"
                           :show-overflow-tooltip="true" width="160"/>
          <el-table-column label="教师姓名" align="center" key="teacherName" prop="teacherName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="课程状态" align="center" key="courseStatus" prop="courseStatus"/>

          <el-table-column label="开始时间" align="center" key="courseStartTime" prop="courseStartTime" width="160"/>
          <el-table-column label="结束时间" align="center" key="courseEndTime" prop="courseEndTime" width="160"/>
          <el-table-column label="课程周数" align="center" key="courseWeek" prop="courseWeek" width="80"/>

          <el-table-column
              label="操作"
              align="center"
              width="240"
          >
            <template #default="scope">
              <el-button
                  size="small"
                  type="text"
                  icon="Menu"
                  @click="goCourse(scope.row)"
              >进入
              </el-button>
              <el-button
                  size="small"
                  type="text"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>


    <el-drawer v-model="drawerOpen" direction="rtl">
      <template #header>
        <h4>添加课程</h4>
      </template>
      <template #default>

      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerOpen=false">取消</el-button>
          <el-button type="primary" @click="submitCourse">确定</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import {addCourse, deleteCourse, selectCourseListByTeacherId, updateCourse} from "@/api/course/course";
import {useRouter} from 'vue-router'
import {getCurriculumList} from "@/api/personal/curriculum";

const drawerOpen = ref(false);// 抽屉是否打开
const courseForm = reactive({
  id: "",
  courseName: "",
  courseStartTime: "",
  courseEndTime: "",
  courseWeek: "",
  introduction: "",
});
const rules = reactive({
  courseName: [
    {required: true, message: "请输入课程名称", trigger: "blur"},
    {min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur"},
  ],
  courseStartTime: [
    {required: true, message: "请选择开始时间", trigger: "blur"},
  ],
  courseEndTime: [
    {required: true, message: "请选择结束时间", trigger: "blur"},
  ],
  courseWeek: [
    {required: true, message: "请输入课程周数", trigger: "blur"},
  ],
});

const loading = ref(false);// 遮罩层
const courseList = ref([]);// 课程表格数据


const handleAdd = () => {
  drawerOpen.value = true;
}

const router = useRouter()
const goCourse = (row) => {
  // 路由跳转到课程管理
  router.push({
    path: 'curriculum/detail',
    query: {
      courseId: row.id,
    }
  })

}



/* 添加或者修改课程 */
const submitCourse = () => {

};

const handleDelete = (row) => {
  deleteCourse(row.id).then(response => {
    selectCourseListByTeacherId().then(response => {
      courseList.value = response.data;
    });
  });
}

onMounted(() => {
  // 查询课程列表
  loading.value = true;
  getCurriculumList().then(response => {
    courseList.value = response.data;
    loading.value = false;
  });

});

</script>

<style scoped>

</style>
