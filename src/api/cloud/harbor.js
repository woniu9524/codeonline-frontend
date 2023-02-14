import request from '@/utils/request'

// 上傳表單信息
export function addHarborUploadTable(data) {
    return request({
        url: 'cloud/harbor/upload/table',
        method: 'post',
        data: data
    })
}

export function getUploadStatus(id) {
    return request({
        url: 'cloud/harbor/upload/status/' + id,
        method: 'get'
    })
}


/* 镜像检测 */
export function checkImage(imageName) {
    return request({
        url: 'cloud/harbor/image/'+imageName,
        method: 'get',
    })
}

// 获取全部镜像
export function getAllImageList() {
    return request({
        url: 'cloud/harbor/market/images',
        method: 'get',
    })
}
