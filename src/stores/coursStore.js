import { defineStore } from "pinia";
import axios from "axios";

export const useCourseStore = defineStore("course", {
  state: () => ({
    items: [],
    loading: false,
    isError:false,
    intervalId : null,

  }),
  getters: {
    isUserAuthenticated(state) {

      return state.isAuthenticated;
    },
  },

  actions: {
    async fetchItems(){
       this.loading = true;
      this.error = null;
      try{
        const response = await axios.get(
          "http://localhost:3000/zcode/courses",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        this.items = response.data.map(item => ({...item,icon:this.getIcon(item.title)}));

      } catch (err) {
        this.isError = true;
      
      }finally{
         this.loading = false;
      }

    },
    getIcon(title) {
    const iconMap = {
      "HTML": '<i class="fa-brands fa-html5"></i>',
      "CSS": '<i class="fa-brands fa-css3-alt"></i>',
      "PYTHON": '<i class="fa-brands fa-python"></i>',
      "JAVA": '<i class="fa-brands fa-java"></i>',
      "C": '<i class="fa-solid fa-c"></i>',
      "C++": '<i class="fa-solid fa-laptop-code"></i>',
      "BOOSTRAP": '<i class="fa-brands fa-bootstrap"></i>',
      "TAILWIND": '<i class="fa-brands fa-css3"></i>',
      "JAVA SCRIPT": '<i class="fa-brands fa-js"></i>',
      "REACRT": '<i class="fa-brands fa-react"></i>',
      "VUE.JS":'<i class="fa-brands fa-vuejs"></i>',
    }
      return iconMap[title] || 'default-icon';
    }
    
    },
});
