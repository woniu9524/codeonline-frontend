import {defineStore} from "pinia";
import {uploadExperimentFile} from "@/api/course/courseManage";

const useCourseStore = defineStore(
    'course',
    {
        state: () => ({
            fileUrl: "",
        }),
        actions: {
            uploadExperimentFileAction(file,courseId){
                return new Promise((resolve,reject)=>{
                    uploadExperimentFile(file,courseId).then(res=>{
                        this.fileUrl=res.data.fileUrl;
                        resolve()
                    }).catch(error=>{
                        reject(error)
                    })
                })
            }

        }
    }
)

export default useCourseStore
