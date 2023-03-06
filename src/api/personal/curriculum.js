import request from '@/utils/request'

// 获取课程列表
export function getCurriculumList() {
    return request({
        url: '/function/personal/curriculums/list',
        method: 'get',
    })
}
