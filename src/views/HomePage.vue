<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="canGoBack" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Homepage</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button
              v-if="canGoBack"
              default-href="/"
            ></ion-back-button>
          </ion-buttons>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
            >UI Components</a
          >
        </p>
      </div>
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
import { onBeforeMount, ref } from "vue";
import { useIonRouter } from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
  setup() {
    const ionRouter = useIonRouter();
    const canGoBack = ref(false);

    onBeforeMount(() => {
      canGoBack.value = ionRouter.canGoBack();
    });

    return {
      canGoBack,
    };
  },
};
</script>
