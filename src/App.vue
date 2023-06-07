<template>
  <ion-menu side="end" content-id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Global pages -->
        <!-- <ion-item @click="closeMenu" router-link="/homepage">Homepage</ion-item> -->
        <!-- <ion-item @click="closeMenu" router-link="/subscriptions"
          >Subscriptions</ion-item
        > -->
        <ion-item @click="closeMenu" router-link="/contact">Contact</ion-item>
        <ion-item @click="closeMenu" router-link="/mentions-legales"
          >Mentions Legales</ion-item
        >
        <ion-item @click="closeMenu" router-link="/cgv">CGV</ion-item>
        <ion-item @click="closeMenu" router-link="/politique-confidentialite"
          >Politique Confidentialité</ion-item
        >

        <!-- Protected by userIsAuthenticated -->
        <ion-item
          @click="closeMenu"
          v-if="userIsAuthenticated"
          router-link="/account"
          >Account</ion-item
        >
        <ion-item
          @click="closeMenu"
          v-if="userIsAuthenticated"
          router-link="/dashboard"
          >Dashboard</ion-item
        >

        <!-- If !userIsAuthenticated -->
        <ion-item
          @click="closeMenu"
          v-if="!userIsAuthenticated"
          router-link="/login"
          >Login</ion-item
        >
        <ion-item
          @click="closeMenu"
          v-if="!userIsAuthenticated"
          router-link="/register"
          >Register</ion-item
        >

        <ion-item v-if="userIsAuthenticated" @click="logout">Logout</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <div class="ion-page" id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <router-link style="margin-left: 20%" to="/homepage">
            <img
              src="@/ressources/gamoshiLogo.svg"
              alt="Logo gamoshi"
              class="logo"
            />
          </router-link>
        </ion-buttons>
        <ion-buttons slot="end">
          <div class="icon-container">
            <img src="@/ressources/basketIcon.svg" alt="Panier" />
            <ion-label>Panier</ion-label>
          </div>
          <div class="icon-container">
            <ion-menu-button></ion-menu-button>
            <ion-label>Menu</ion-label>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <router-view />
    </ion-content>

    <ion-footer>
      <ion-tabs>
        <ion-tab-bar
          style="
            display: flex;
            position: fixed;
            bottom: 5vh;
            margin: auto;
            width: 100%;
            justify-content: center;
          "
          slot="bottom"
        >
          <div
            style="
              display: flex;
              background-color: black;
              gap: 4px;
              padding: 8px 20px;
              border-radius: 999px;
            "
          >
            <ion-tab-button tab="home">
              <router-link class="icon-container" to="/homepage">
                <img src="@/ressources/homeIcon.svg" alt="Acueil" />
                <ion-label>Accueil</ion-label>
              </router-link>
            </ion-tab-button>
            <ion-tab-button tab="offer" href="/offer">
              <router-link class="icon-container" to="/offer">
                <img src="@/ressources/offerIcon.svg" alt="Offre" />
                <ion-label>Offre</ion-label>
              </router-link>
            </ion-tab-button>
            <ion-tab-button tab="news" href="/news">
              <router-link class="icon-container" to="/news">
                <img src="@/ressources/newsIcon.svg" alt="Actualités" />
                <ion-label>Actualités</ion-label>
              </router-link>
            </ion-tab-button>
            <ion-tab-button tab="account" :href="accountLink">
              <router-link class="icon-container" :to="accountLink">
                <img src="@/ressources/profileIcon.svg" alt="Compte" />
                <ion-label>Compte</ion-label>
              </router-link>
            </ion-tab-button>
          </div>
        </ion-tab-bar>
      </ion-tabs>
    </ion-footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth.js";

import { menuController } from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
  },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    function closeMenu() {
      menuController.close();
    }

    function logout() {
      authStore.logout();
      closeMenu();
      router.push({ path: "/logout" });
      window.location.reload(); // Refresh the page
    }
    const userIsAuthenticated = computed(() => authStore.loggedIn);
    const accountLink = computed(() =>
      userIsAuthenticated.value ? "/account" : "/login"
    );

    return {
      userIsAuthenticated,
      logout,
      closeMenu,
      accountLink,
    };
  },
});
</script>

<style scoped>
.logo {
  height: 48px; /* Vous pouvez ajuster la taille du logo selon vos besoins */
}

.icon-container img {
  width: 32px;
  max-width: 44px;
}
.icon-container {
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  text-decoration: none;
}
</style>
