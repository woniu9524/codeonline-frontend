<template>
  <div class="introduce-card">
    <div class="introduce-card-header">
      <h3>{{ courseInfo.courseName }}({{ courseInfo.courseWeek }}周)</h3>
    </div>
    <div class="introduce-card-body">
      <p>{{ courseInfo.introduction }}</p>
    </div>
    <div class="introduce-card-footer">
      <span>{{ courseInfo.courseStartTime }}</span>
      <span>{{ courseInfo.courseEndTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseIntroductionCard",
  props: {
    courseInfo: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.introduce-card {
  width: 95%;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px auto;
}

/*.card:hover {*/
/*  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);*/
/*}*/

.introduce-card-header {
  padding: 20px;
  background-color: lightblue;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.introduce-card-header h3 {
  margin: 0;
  font-size: 24px;
  color: white;
}

.introduce-card-body {
  padding: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.introduce-card-footer {
  padding: 20px;
  background-color: lightgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: space-between;
}

.introduce-card-footer span {
  font-size: 14px;
  color: black;
}

</style>
