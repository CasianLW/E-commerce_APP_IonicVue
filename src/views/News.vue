<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Actualités</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-margin-horizontal">
        <div class="header-actus">
          <h1>Actualités</h1>
          <p>Soyez toujours à jour avec les derières actus</p>
        </div>
        <div class="actualites">
          <div class="categories">
            <div style="background-image: url()"></div>
          </div>
        </div>
        <div></div>
      </main>
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
} from "@ionic/vue";
export default {
  name: "PolitiqueConfidentialité",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
};
</script>

<style scoped>
.header-actus p {
  font-weight: 400;
  font-size: 14px;
  padding: 0;
  margin: 0;
}
.header-actus h1 {
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0;
}
.header-actus {
  color: white;
}
ion-content {
  --background: radial-gradient(
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
}
</style>
