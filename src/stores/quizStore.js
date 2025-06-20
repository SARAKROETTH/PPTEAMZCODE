import { defineStore } from 'pinia';
import axios from "axios";

export const useQuizStore = defineStore('quizStore', {
     state:() =>({
        quizitem:{},
        quizitemAll:null,
        Datequize:null
     }),
     actions:{
        async fetchQuiz(){
            try{
                const res = await axios.get('http://localhost:3000/zcode/quizzes')
                this.Datequize = res.data
            }catch(err){
                console.log(err)

            }

        },
        async fetchItem(path){
            try{
                const res = await axios.get(`http://localhost:3000/zcode/quiz_questions/option/${path}`)
                this.quizitem = res.data

            }catch(err){

            }

        },
        async fetchItemAll(){
            try{
                const res = await axios.get(`http://localhost:3000/zcode/quiz_questions`);

                this.quizitemAll = res.data
            }catch(err){
                console.log(err)
            }
        }
     }

});