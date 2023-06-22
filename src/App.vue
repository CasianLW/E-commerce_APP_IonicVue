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
    <!-- <ion-header>
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
    </ion-header> -->

    <ion-content>
      <router-view />
    </ion-content>

    <ion-footer style="border-radius: 999px">
      <div style="border-radius: 999px; display: flex; justify-content: center">
        <ion-tab-bar
          style="
            display: flex;
            position: fixed;
            bottom: 5vh;
            margin: auto;
            border: none;
            padding: 6px 0px;
            width: 90%;
            justify-content: center;
            border-radius: 999px;
            background-color: transparent;
          "
          slot="bottom"
        >
          <div
            style="
              display: flex;
              background-color: black;
              gap: 0px;
              width: 100%;
              padding: 16px 8px;
              border-radius: 999px;
              align-items: center;
              justify-content: center;
            "
          >
            <ion-tab-button class="icon-container">
              <a href="">
                <ion-menu-button></ion-menu-button>
                <ion-label>Menu</ion-label>
              </a>
            </ion-tab-button>
            <ion-tab-button class="icon-container">
              <!-- <img src="@/ressources/basketIcon.svg" alt="Panier" /> -->
              <a>
                <ion-icon name="bag"></ion-icon>
                <ion-label>Panier</ion-label>
              </a>
            </ion-tab-button>
            <ion-tab-button
              exact-active-class="active-link"
              to="/homepage"
              class="icon-container"
              tab="home"
            >
              <router-link exact-active-class="active-link" to="/homepage">
                <!-- <img src="@/ressources/homeIcon.svg" alt="Acueil" /> -->
                <ion-icon name="home"></ion-icon>
                <ion-label>Accueil</ion-label>
              </router-link>
            </ion-tab-button>
            <ion-tab-button class="icon-container" tab="news" href="/news">
              <router-link exact-active-class="active-link" to="/news">
                <!-- <img src="@/ressources/newsIcon.svg" alt="Actualités" /> -->
                <ion-icon name="newspaper"></ion-icon>

                <ion-label>Actualités</ion-label>
              </router-link>
            </ion-tab-button>
            <ion-tab-button
              class="icon-container"
              tab="account"
              :href="accountLink"
            >
              <router-link exact-active-class="active-link" :to="accountLink">
                <!-- <img src="@/ressources/profileIcon.svg" alt="Compte" /> -->
                <ion-icon :icon="personCircleIcon"></ion-icon>

                <ion-label>Compte</ion-label>
              </router-link>
            </ion-tab-button>
          </div>
        </ion-tab-bar>
      </div>
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
  IonIcon,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/vue";
import { addIcons } from "ionicons";
import {
  arrowBack,
  arrowForward,
  home,
  bag,
  personCircle,
  newspaper,
} from "ionicons/icons";
import { useAuthStore } from "@/stores/auth.js";

import { menuController } from "@ionic/vue";
import { useRouter } from "vue-router";

// Register the IonIcon component globally
addIcons({ arrowBack, arrowForward, home, bag, personCircle, newspaper });
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
    IonIcon,
    IonFooter,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet,
  },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const personCircleIcon = personCircle;

    function closeMenu() {
      menuController.close();
    }

    function logout() {
      authStore.logout();
      localStorage.removeItem("token");
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
      personCircleIcon,
    };
  },
});
</script>

<style scoped>
.active-link {
  color: #d3fe57 !important;
}

.logo {
  height: 48px; /* Vous pouvez ajuster la taille du logo selon vos besoins */
}

/* .icon-container img {
  width: 32px;
  max-width: 44px;
} */
.icon-container ion-label {
  color: white;
  text-decoration: none !important;
  font-size: 12px;
  font-weight: 400;
}
.icon-container a {
  display: flex;
  flex-flow: column;
  align-items: center;
  float: inline-end;
  margin: 0;
  padding: 0;
}
.icon-container router-link {
  margin: 0;
  padding: 0;
}
.icon-container {
  background-color: transparent;
  /* margin: 0 12px; */
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* font-size: 12px; */
  /* color: white;
  text-decoration: none; */
}
ion-icon {
  font-size: 24px;
}
</style>
