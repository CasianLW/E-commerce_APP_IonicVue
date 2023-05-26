<template>
  <ion-menu side="start" content-id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Global pages -->
        <ion-item @click="closeMenu" router-link="/homepage">Homepage</ion-item>
        <ion-item @click="closeMenu" router-link="/subscriptions"
          >Subscriptions</ion-item
        >
        <ion-item @click="closeMenu" router-link="/contact">Contact</ion-item>
        <ion-item @click="closeMenu" router-link="/mentions-legales"
          >Mentions Legales</ion-item
        >
        <ion-item @click="closeMenu" router-link="/cgv">CGV</ion-item>
        <ion-item @click="closeMenu" router-link="/politique-confidentialité"
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
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <router-view />
    </ion-content>
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

    return {
      userIsAuthenticated,
      logout,
      closeMenu,
    };
  },
});
</script>
