<template>
  <ion-page>
    <ion-back-button
      style="margin-right: auto"
      default-href="/"
    ></ion-back-button>

    <!-- <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content class="ion-padding">
      <p>
        Page a dev Dashboard
        <!-- Add your Privacy Policy text here -->
      </p>
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
  name: "Dashboard",
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
