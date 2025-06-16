import { defineStore } from 'pinia';
import axios from "axios";

export const useStudentStore = defineStore("student",{
state: () => ({
    student: null,
}),
actions:{
    async fetchDataStudent(studentID){
        try{
            const res = await axios.get(`http://localhost:3000/zcode/users/${studentID}`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            this.student = res.data;
        }catch(err){
            console.log(err);
        }
    }
}


});