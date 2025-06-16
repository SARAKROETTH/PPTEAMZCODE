import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index.router.js";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authToken: null,
  }),
  
  getters: {
    authuser:(state) => state.authUser,
    authToken: (state) => state.authToken,
  },

  actions: {
    async getToken(){
        await axios.get("http://localhost:3000/zcode//auth/verify");
    },
    async login(from){
        await this.getToken();
        await axios.post("http://localhost:3000/zcode/auth/login", from, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }).then((response) => {
          this.authUser = response.data.user;
          this.authToken = response.data.token;
            router.push('/');
        }).catch((error) => {
          console.error("Login failed:", error);
          throw new Error("Login failed");
        });
    }

  }
});
