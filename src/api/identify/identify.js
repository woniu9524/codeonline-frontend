import request from '@/utils/request'

export function readUniversity() {
    return request({
        url: '/function/identity/universities',
        method: 'get',
    })
}

export function readCollege(value) {
    return request({
        url: '/function/identity/colleges/' + value,
        method: 'get',
    })
}

export function readClass(query) {
    return request({
        url: '/function/identity/classes/' + query,
        method: 'get',
    })
}

export function readAdmins(query) {
    return request({
        url: '/function/identity/admins/' + query,
        method: 'get',
    })
}

export function readTeachers(query) {
    return request({
        url: '/function/identity/teachers/' + query,
        method: 'get',
    })
}

export function addIdentity(data) {
    return request({
        url: '/function/identity/forms',
        method: 'post',
        data: data
    })
}

export function readIdentity() {
    return request({
        url: '/function/identity',
        method: 'get',
    })
}
