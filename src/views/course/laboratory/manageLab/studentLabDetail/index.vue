<template>
  <div>
    <el-container>
      <el-header>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="18">
              <el-input
                  v-model="comment"
                  placeholder="评价"
              />
            </el-col>
            <el-col :span="3">
              <el-input
                  v-model="score"
                  placeholder="分数"
              />
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="submitScore">提交</el-button>
            </el-col>
          </el-row>
      </el-header>

      <el-container>
        <el-aside width="400px" style="padding: 20px 0px 20px 20px">
          <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" style="width: 100%;height: 500px" />
        </el-aside>

        <el-main>
          <codemirror
              v-model="code"
              placeholder="Code goes here..."
              :style="{ height: '500px' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              @ready="handleReady"
              @change="log('change', $event)"
              @focus="log('focus', $event)"
              @blur="log('blur', $event)"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, shallowRef} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'
import {useRoute} from "vue-router";
import {listFileTree,readFileContent} from "@/api/cloud/nfs.js";
import {selectStudentExperimentInfo,submitStudentExperimentInfo} from "@/api/course/lab.js";
import {ElMessage} from "element-plus";

interface Tree {
  label: string
  children?: Tree[]
  path?: string
}
export default {
  components: {
    Codemirror,
  },
  name: 'StudentLabDetail',
  setup() {
    const code = ref('')
    const extensions = [javascript(), oneDark]
    const labId=useRoute().query.labId
    const userId=useRoute().query.userId
    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state
      const ranges = state.selection.ranges
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
      const cursor = ranges[0].anchor
      const length = state.doc.length
      const lines = state.doc.lines
      // more state info ...
      // return ...
    }


    // Tree
    const handleNodeClick = (data: Tree) => {
      readFileContent(labId,data.path).then(res=>{
        code.value=res.data
      })
    }
    const treeData= ref([])

    const defaultProps = {
      children: 'children',
      label: 'label',
    }

    // 评价
    const comment = ref('')
    const score = ref('')
    const submitScore = () => {
      submitStudentExperimentInfo(labId,userId,parseInt(score.value),comment.value).then(res=>{
        ElMessage.success('提交成功')
      })
    }


    onMounted(() => {
      listFileTree(labId,userId).then(res=>{
        treeData.value=res.data
      })

      selectStudentExperimentInfo(labId,userId).then(res=>{
        comment.value=res.data.comment
        score.value=res.data.score
      })

    })



    return {
      code,
      extensions,
      handleReady,
      log: console.log,
      handleNodeClick,
      treeData,
      defaultProps,
      comment,
      score,
      submitScore
    }
  }
}
</script>

<style scoped>

</style>
