import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    loggedIn: !!localStorage.getItem("token"),
    events: [],
  }),
  actions: {
    async register(name, email, password, phone, zip, city, location) {
      console.log(name, email, password, phone, zip, city, location);

      try {
        const response = await fetch(`${apiUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
            zip: zip,
            city: city,
            location: location,
          }),
        });

        if (!response.ok) {
          throw new Error(`Registration failed with status ${response.status}`);
        }

        const user = await response.json();

        if (user) {
          this.loggedIn = true;
          this.user = user;
          localStorage.setItem("token", user.token);
        } else {
          throw new Error("Registration failed: no user data in response");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },

    async login(email, password) {
      // console.log(email);
      // console.log(password);

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
    async sendPasswordResetLink(email) {
      try {
        await axios.post(`${apiUrl}/api/auth/forgot-password`, {
          email: email,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async resetPassword(token, password) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/auth/reset-password/${token}`,
          {
            password: password,
          }
        );

        // Traiter la réponse de la requête si nécessaire
        // ...

        return response.data; // ou toute autre donnée pertinente à renvoyer
      } catch (error) {
        throw error; // Renvoyer l'erreur pour une gestion ultérieure
      }
    },
    async getEvents() {
      try {
        const response = await axios.get(`${apiUrl}/api/store/events`);
        this.events = response.data.events;
      } catch (error) {
        console.error("Fetching events failed:", error);
        throw error;
      }
    },
    async getArticle(id) {
      try {
        const response = await axios.get(`${apiUrl}/api/store/events/${id}`, {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        // The response data should be the article, you might need to adjust this according to your API
        const article = response.data;
        return article;
      } catch (error) {
        console.error("Fetching article failed:", error);
        throw error;
      }
    },

    async createCheckoutSession() {
      if (!this.loggedIn) {
        throw new Error("User must be logged in to start checkout session");
      }

      const response = await axios.post(
        `${apiUrl}/api/checkout-session`,
        {
          stripeCustomerId: this.user.stripeCustomerId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        }
      );

      return response.data.sessionId;
    },
  },
});
