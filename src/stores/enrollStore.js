import { defineStore } from "pinia";
import axios from "axios";

export const useEnrollmentStore = defineStore('enrollCourse',{
    state:() =>({
        enrollCourse:null
    }),
    actions:{
        async getEnrollmentAll(){
            try{
                const res = await axios.get('http://localhost:3000/zcode/enrolments',{
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                this.enrollCourse = res.data;
            }catch(err){
                console.log(err)
            }
        },
        async createEnrollment(user_id,course_id){
            try{
                await axios.post('http://localhost:3000/zcode/enrolments',{
                    user_id: user_id,
                    course_id: course_id
                });
            }catch(err){
                console.log(err)
            }
        }

    }
})