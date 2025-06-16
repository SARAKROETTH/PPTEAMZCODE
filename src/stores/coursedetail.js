import { defineStore } from 'pinia';
import axios from 'axios';

export const useCourseDetailStore = defineStore('courseDetail', {
  state: () => ({
    items: null,
  }),
  actions:{
    async fetechItem(params) {
      try{
        const response = await axios.get(`http://localhost:3000/zcode/detailcourse/${params}`,{
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        this.items = response.data

      }catch(err){
        console.log(err)
      }
    }

  }
});
       
