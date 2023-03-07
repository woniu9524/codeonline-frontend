import request from '@/utils/request'

// 查询文件树
export function listFileTree(labId,userId) {
  return request({
    url: '/cloud/nfs/files/'+labId+'/'+userId,
    method: 'get',
  })
}

// 查询文件内容
export function readFileContent(labId,filePath) {
  return request({
    url: '/cloud/nfs/files/context/'+labId,
    method: 'get',
    params: {filePath:filePath}
  })
}
