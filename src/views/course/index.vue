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
                           :show-overflow-tooltip="true"/>
          <el-table-column label="教师姓名" align="center" key="teacherName" prop="teacherName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="课程状态" align="center" key="courseStatus" prop="courseStatus"/>

          <el-table-column label="开始时间" align="center" key="courseStartTime" prop="courseStartTime" width="160"/>
          <el-table-column label="结束时间" align="center" key="courseEndTime" prop="courseEndTime" width="160"/>
          <el-table-column label="课程周数" align="center" key="courseWeek" prop="courseWeek" width="160"/>

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
                  @click="goCourseManage(scope.row)"
              >管理
              </el-button>
              <el-button
                  size="small"
                  type="text"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
              >修改
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
        <h4>{{title}}</h4>
      </template>
      <template #default>
        <el-form :model="courseForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间" prop="courseStartTime">
                <el-date-picker
                    v-model="courseForm.courseStartTime"
                    type="datetime"
                    placeholder="选择开始时间"
                    format="YYYY/MM/DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间" prop="courseEndTime">
                <el-date-picker
                    v-model="courseForm.courseEndTime"
                    type="datetime"
                    placeholder="选择结束时间"
                    format="YYYY/MM/DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="课程名称" prop="courseName">
                <el-input v-model="courseForm.courseName" placeholder="请输入课程名称" maxlength="30"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程周数" prop="courseWeek">
                <el-input v-model="courseForm.courseWeek" placeholder="请输入课程周数" maxlength="30"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="课程介绍">
                <el-input v-model="courseForm.introduction" type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerOpen=false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import {addCourse, deleteCourse, selectCourseListByTeacherId, updateCourse} from "@/api/course/course";
import { useRouter } from 'vue-router'
const title = ref("新增课程");// 弹出层标题
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


const cancel = () => {
  console.log("取消");
};

const handleAdd = () => {
  drawerOpen.value = true;
}

const router = useRouter()
const goCourseManage = (row) => {
  // 路由跳转到课程管理
  router.push({
    path: '/course/management',
    query: {
      courseId: row.id,
    }
  })

}

const handleUpdate = (row) => {
  title.value = "修改课程";
  drawerOpen.value = true;
  courseForm.id = row.id;
  courseForm.courseName = row.courseName;
  courseForm.courseStartTime = row.courseStartTime;
  courseForm.courseEndTime = row.courseEndTime;
  courseForm.courseWeek = row.courseWeek;
  courseForm.introduction = row.introduction;
}

/* 添加或者修改课程 */
const submitForm = () => {
  if (title.value === "新增课程") {
    addCourse(courseForm).then(response => {
      drawerOpen.value = false;
      selectCourseListByTeacherId().then(response => {
        courseList.value = response.data;
      });
    });
  }else {
    updateCourse(courseForm).then(response => {
      drawerOpen.value = false;
      selectCourseListByTeacherId().then(response => {
        courseList.value = response.data;
      });
    });
  }
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
  selectCourseListByTeacherId().then(response => {
    courseList.value = response.data;
    loading.value = false;
  });

});

</script>

<style scoped>

</style>
