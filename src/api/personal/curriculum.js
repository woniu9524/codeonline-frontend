import request from '@/utils/request'

// 获取课程列表
export function getCurriculumList() {
    return request({
        url: '/function/personal/curriculums/list',
        method: 'get',
    })
}

// 学生添加课程
export function addCurriculum(courseId) {
    return request({
        url: '/function/personal/curriculums/' + courseId,
        method: 'post',
    })
}
