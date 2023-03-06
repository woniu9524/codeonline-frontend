import request from '@/utils/request'

// upload k8s configure
export function addK8sConfigure(labId,data) {
  return request({
    url: '/cloud/k8s/configures/'+labId,
    method: 'post',
    data: data
  })
}

// 通过labId查询K8s配置
export function selectK8sConfigureByLabId(labId) {
  return request({
    url: '/cloud/k8s/configures/lab/'+labId,
    method: 'get',
  })
}

// 通过labId修改k8s配置
export function updateK8sConfigure(labId,data) {
  return request({
    url: '/cloud/k8s/configures/'+labId,
    method: 'put',
    data: data
  })
}

//创建k8s部署
export function addK8sDeployment(labId,userId) {
  return request({
    url: '/cloud/k8s/deployments/'+labId+'/'+userId,
    method: 'post',
  })
}


// 启动k8s环境
export function startK8sEnvironment(labId,userId) {
  return request({
    url: '/cloud/k8s/labStart/'+labId+'/'+userId,
    method: 'get',
  })
}

// 学生删除实验
export function deleteLabByStudent(labId,userId) {
  return request({
    url: '/cloud/k8s/labDelete/'+labId+'/'+userId,
    method: 'delete',
  })
}

// 通过labId查询文件
export function selectFilesByLabId(labId) {
  return request({
    url: '/cloud/nfs/'+labId,
    method: 'get',
  })
}
