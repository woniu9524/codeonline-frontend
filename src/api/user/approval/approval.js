import request from '@/utils/request'

/* 读取要审批的用户 */
export function readPeopleApprovalByApprover() {
    return request({
        url: '/function/user/approval',
        method: 'get',
    })
}

/* 批准审批 */
export function approvalUser(data) {
    return request({
        url: '/function/user/approval/pass',
        method: 'post',
        data
    })
}

/* 拒绝审批 */
export function refuseUser(data) {
    return request({
        url: '/function/user/approval/refuse',
        method: 'post',
        data
    })
}
