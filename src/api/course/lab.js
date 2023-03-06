import request from '@/utils/request'

/* 通过实验ID查询实验信息 */
export function selectExperimentByExperimentId(experimentId) {
    return request({
        url: '/function/courses/experiments/'+experimentId,
        method: 'get',
    })
}

/* 查询所有学生实验完成信息 */
export function selectAllStudentExperimentInfo(labId) {
    return request({
        url: '/function/courses/experiments/students/'+labId,
        method: 'get',
    })
}
