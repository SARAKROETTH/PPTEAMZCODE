import { defineStore } from 'pinia';
import axios from 'axios';

export const useStudentLessionStore = defineStore("student_lession",{
  state: () => ({
    items: [],
  }),
  actions:{
    async fetchStudentLession(){
        try{
            const res = await axios.get('http://localhost:3000/zcode/student_lessons',{
                  headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            this.items = res.data;
        }catch(err){
            console.log(err)
        }
    },
    async createStudentLession(user_id,lesson_id,quiz_id,score,is_completed){
      try {
        const res = await axios.post('http://localhost:3000/zcode/student_lessons', {
          user_id:user_id,
           lesson_id:lesson_id,
           quiz_id:quiz_id,
           score:score,
           is_completed:is_completed
        });
      } catch (err) {
        console.log(err)
      }
    },
    async updateStudentLession(lesion_id ,student_id,score){
      try{
        const res = await axios.put(`http://localhost:3000/zcode/student_lessons/${lesion_id}`,{
          student_id : student_id,
          score : score
        });
        console.log('update sucess')
      }catch(err){
        console.log(err)
      }
    }
  }

});