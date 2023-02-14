<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="k8sForm" :model="k8sForm" label-width="80px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="镜像选择" :style="{width: '100%'}">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="k8sForm.sourceFrom" placeholder="请选择">
                    <el-option
                        v-for="item in sourceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="k8sForm.imageName" placeholder="输入格式：镜像名:标签"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="挂载目录" :style="{width: '100%'}">
              <el-input v-model="k8sForm.volume"></el-input>
            </el-form-item>
          </el-col>


        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开启端口" :style="{width: '100%'}">
              <el-card shadow="never">
                <!-- 端口列表ports，可以添加端口  -->
                <el-row>
                  <el-col :span="6">
                    <el-input v-model="k8sForm.ports[0].port" placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="k8sForm.ports[0].targetPort" placeholder="目标端口"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="k8sForm.ports[0].service" placeholder="请选择">
                      <el-option
                          v-for="item in serviceOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" icon="Plus" @click="addPort"></el-button>
                  </el-col>
                </el-row>
                <el-row v-for="(item, index) in k8sForm.ports" v-if="index>0" :key="index">
                  <el-col :span="6">
                    <el-input v-model="item.port" placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="item.targetPort" placeholder="目标端口"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="item.service" placeholder="请选择">
                      <el-option
                          v-for="item in serviceOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" icon="el-icon-delete" @click="delPort(index)"></el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="环境变量" :style="{width: '100%'}">
              <el-card style="margin: auto" shadow="never">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="k8sForm.envs[0].key" placeholder="输入键"></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-input v-model="k8sForm.envs[0].value" placeholder="输入值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" icon="Plus" @click="addEnv"></el-button>
                  </el-col>
                </el-row>
                <el-row v-for="(item, index) in k8sForm.envs" v-if="index>0" :key="index">
                  <el-col :span="10">
                    <el-input v-model="item.key" placeholder="输入键"></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-input v-model="item.value" placeholder="输入值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" icon="el-icon-delete" @click="delEnv(index)"></el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="启动命令" :style="{width: '100%'}">
              <el-input v-model="k8sForm.startCmd" placeholder="输入启动命令"></el-input>
              <el-input v-model="k8sForm.startArgs" placeholder="启动命令参数，多个参数用,连接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述信息" :style="{width: '100%'}">
              <el-input v-model="k8sForm.description" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
            </el-form-item>
          </el-col>

        </el-row>


        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="特权模式" :style="{width: '100%'}">
              <el-switch v-model="k8sForm.privilege"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公开配置" :style="{width: '100%'}">
              <el-switch v-model="k8sForm.hasPublic"></el-switch>
            </el-form-item>
          </el-col>

        </el-row>
<!--                <el-divider></el-divider>-->
<!--                <el-form-item>-->
<!--                  <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--                  <el-button >取消</el-button>-->
<!--                </el-form-item>-->
      </el-form>
    </el-card>
  </div>
</template>


<script>


export default {
  name: "K8sConfigureCard",
  props: {
    k8sForm: {
      type: Object,
      default: () => {
        return {
          sourceFrom: "harbor",
          imageName: undefined,
          ports: [{port: undefined, targetPort: undefined,service: "no"}],
          startCmd: undefined,
          startArgs: undefined,
          envs: [
            {key: undefined, value: undefined}
          ],
          volume: undefined,
          description: undefined,
          privilege: false,
          hasPublic: false,
        }
      }
    }
  },

  data() {
    return {
      serviceOptions: [
        {value: 'vscode', label: 'vscode'},
        {value: 'jupyter', label: 'jupyter'},
        {value: 'http', label: 'http访问'},
        {value: 'ssh', label: 'ssh连接'},
        {value: 'other', label: '其他'},
        {value: 'no', label: '不创建'},
      ],
      sourceOptions: [
        {value: 'harbor', label: '站内仓库'},
        {value: 'dockerhub', label: 'dockerhub'},
      ],
    }
  },
  created() {

  },
  methods: {
    onSubmit() {
      //TODO dockerhub  镜像检查
      checkImage(this.k8sForm.imageName).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    addEnv() {
      this.k8sForm.envs.push({key: undefined, value: undefined})
    },
    delEnv(index) {
      this.k8sForm.envs.splice(index, 1)
    },
    addPort() {
      this.k8sForm.ports.push({port: undefined, targetPort: undefined})
    },
    delPort(index) {
      this.k8sForm.ports.splice(index, 1)
    },
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
  padding-top: 20px;
}


</style>
