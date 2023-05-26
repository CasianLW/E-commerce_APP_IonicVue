import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = "https://api-app-notes-ajvs.onrender.com";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    loggedIn: false,
  }),
  actions: {
    async register(username, email, password) {
      try {
        const response = await axios.post(`${apiUrl}/api/auth/register`, {
          email: email,
          password: password,
          name: username,
        });
        //console.log(response.data);

        const user = response.data;

        this.loggedIn = true;
        this.user = user;
        localStorage.setItem("token", user.token);
      } catch (error) {
        throw error;
      }
    },
    async login(email, password) {
      console.log(email);
      console.log(password);

      try {
        const response = await axios.post(`${apiUrl}/api/auth/login`, {
          email: email,
          password: password,
        });

        const user = response.data;
        console.log(user.user);
        console.log(this.loggedIn);

        this.loggedIn = true;

        this.user = user;
        localStorage.setItem("token", user.token);
        console.log(this.loggedIn);

        console.log("user");
        console.log(this.user);
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      if (!this.user.token) {
        throw new Error("Token does not exist");
      }

      try {
        await axios.post(
          `${apiUrl}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
          }
        );
        this.loggedIn = false;
        this.user = {};
        localStorage.removeItem("token");
        localStorage.clear(); // Clear all items in local storage
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
