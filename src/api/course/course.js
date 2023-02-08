import request from '@/utils/request'

/* 查询老师管理的全部课程 */
export function selectCourseListByTeacherId() {
    return request({
        url: '/function/courses',
        method: 'get',
    })
}

/* 添加课程 */
export function addCourse(data) {
    return request({
        url: '/function/courses',
        method: 'post',
        data: data
    })
}

/* 更新课程 */
export function updateCourse(data) {
    return request({
        url: '/function/courses',
        method: 'put',
        data: data
    })
}

/* 删除课程 */
export function deleteCourse(courseId) {
    return request({
        url: '/function/courses'+courseId,
        method: 'delete',
    })
}

