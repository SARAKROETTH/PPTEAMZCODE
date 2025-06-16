import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", {
  state: () => ({
    items: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    intervalId : null,
  }),
  getters: {
    isUserAuthenticated(state) {
      return state.isAuthenticated;
    },
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost:3000/zcode/auth/verify",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        this.items = response.data;
        localStorage.setItem("token", this.items.token);
        this.isAuthenticated = true;
      } catch (err) {
        this.error = "Failed to fetch items";
        console.log(err);
          this.isAuthenticated = false;

      } finally {
        this.loading = false;
        this.isAuthenticated = false;
      }
    }
  },
});
