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

/* 查询单个学生单个实验成绩 */
export function selectStudentExperimentInfo(experimentId,studentId) {
    return request({
        url: '/function/courses/experiments/students/scores/'+experimentId+'/'+studentId,
        method: 'get',
    })
}

/* 提交单个学生成绩 */
export function submitStudentExperimentInfo(experimentId,studentId,score,comment) {
    return request({
        url: '/function/courses/experiments/students/scores/'+experimentId+'/'+studentId,
        method: 'post',
        data: {
            score: score,
            comment: comment
        }
    })
}
