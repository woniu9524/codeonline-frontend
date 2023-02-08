import request from '@/utils/request'

/* 查询当前课程信息 */
export function selectCourseInfo(courseId) {
    return request({
        url: '/function/courses/manage/'+courseId,
        method: 'get',
    })
}

/* ------------------------------------------------------------- */

/* 添加学生到课程 */
export function addStudentToCourse(courseId,userId) {
    return request({
        url: '/function/courses/manage/students/'+courseId+'/'+userId,
        method: 'post',
    })
}

/*查询课程下的学生*/
export function selectStudentByCourseId(courseId) {
    return request({
        url: '/function/courses/manage/students/'+courseId,
        method: 'get',
    })
}

/* 删除课程下的学生 */
export function deleteStudent(courseId,studentId) {
    return request({
        url: '/function/courses/manage/students/'+courseId+'/'+studentId,
        method: 'delete',
    })
}

/* ---------------------------------------------------------------------- */

/* 查询课程下的所有实验 */
export function selectExperimentByCourseId(courseId) {
    return request({
        url: '/function/courses/manage/experiments/'+courseId,
        method: 'get',
    })
}
/* 添加实验到课程 */
export function addExperimentToCourse(courseId,data) {
    return request({
        url: '/function/courses/manage/experiments/'+courseId,
        method: 'post',
        data: data
    })
}

/* 修改实验到课程 */
export function updateExperimentToCourse(experimentId,data) {
    return request({
        url: '/function/courses/manage/experiments/'+experimentId,
        method: 'put',
        data: data
    })
}

/* 删除实验从课程 */
export function deleteExperiment(experimentId) {
    return request({
        url: '/function/courses/manage/experiments/'+experimentId,
        method: 'delete',
    })
}


