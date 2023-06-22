<template>
  <ion-page>
    <!-- <ion-back-button
      style="margin-right: auto"
      default-href="/"
      v-if="canGoBack"
    ></ion-back-button> -->
    <!-- <ion-back-button
      style="margin-right: auto; width: fit-content"
      default-href="/"
    ></ion-back-button> -->
    <!-- <ion-header class="homepage-hero">
      <ion-toolbar>
        <ion-buttons slot="start">
        </ion-buttons>
        <ion-title>Homepage</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content>
      <div class="homepage-hero">
        <div style="display: grid">
          <div class="stack-item">
            <h1>
              Gamoshi <br />
              Play to earn
            </h1>
            <p>
              Défiez vos amis, partez l’aventure et <br />
              accédez aumarché d’items inter-game !
            </p>
          </div>
          <div
            class="stack-item"
            :style="{
              marginLeft: 'auto',
              marginTop: '40px',
              zIndex: '-10',
              width: '180px',
              height: '180px',
              borderRadius: '25px',
              backgroundSize: 'cover',
              backgroundImage: `url(${gameImage1})`,
            }"
          ></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>
            <img src="@/ressources/homepage/nftHeroHomepage.png" alt="" />
          </div>
          <div style="margin: auto">
            <p style="margin-top: 32px">
              Explication du concept, comment ca fonctionne, le pourquoi du
              commennt
            </p>
            <p style="color: #7458ea; margin-top: 32px; font-weight: 600">
              Explication du concept, comment ca fonctionne, le pourquoi du
              commennt
            </p>
          </div>
        </div>
      </div>
      <GameListComponent />
      <SubscriptionsComponent />
      <NewsletterComponent style="padding-bottom: 160px" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import NewsletterComponent from "@/components/NewsletterComponent.vue";
import SubscriptionsComponent from "@/components/SubscriptionsComponent.vue";
import GameListComponent from "@/components/homepage/GameListComponent.vue";

import gameImage1 from "@/ressources/games/gameImage1.jpg";

export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonList,
    NewsletterComponent,
    SubscriptionsComponent,
    GameListComponent,
  },
  setup() {
    const ionRouter = useIonRouter();
    const canGoBack = ref(false);

    onBeforeMount(() => {
      canGoBack.value = ionRouter.canGoBack();
    });

    return {
      canGoBack,
      gameImage1,
    };
  },
};
</script>

<style scoped>
.homepage-hero {
  position: relative; /* ou static */
  z-index: 200;
  top: 0;
  height: 370px;
  margin-bottom: 120px;

  width: 100vw;
  background: radial-gradient(
        138.74% 86.78% at 61.07% 7.08%,
        rgba(116, 88, 234, 0.5) 0%,
        rgba(211, 254, 87, 0.5) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    radial-gradient(
        121.76% 242.1% at -58.91% 21.8%,
        rgba(211, 254, 87, 0.5) 0%,
        rgba(116, 88, 234, 0.5) 47.86%,
        rgba(211, 254, 87, 0.5) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    linear-gradient(0deg, #000000, #000000), #7458ea;
  border-radius: 0px 0px 50px 50px;
  padding: 20px;
}
.homepage-hero p {
  color: #d3fe57;
  font-weight: 400;
  font-size: 15px;
}
.homepage-hero h1 {
  font-size: 40px;
  font-weight: 800;
}
.homepage-hero {
  color: white;
}
</style>
