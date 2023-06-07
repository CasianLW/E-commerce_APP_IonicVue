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
        <ion-title>Logo</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <router-view />
    </ion-content>

    <ion-footer>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/homepage">
            <img src="@/ressources/homeIcon.svg" alt="Acueil" />
            <ion-label>Acueil</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="offer" href="/offer">
            <img src="@/ressources/offerIcon.svg" alt="Offre" />
            <ion-label>Offre</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="news" href="/news">
            <img src="@/ressources/newsIcon.svg" alt="Actualités" />
            <ion-label>Actualités</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="account" :href="accountLink">
            <img src="@/ressources/profileIcon.svg" alt="Compte" />
            <ion-label>Compte</ion-label>
          </ion-tab-button>
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
