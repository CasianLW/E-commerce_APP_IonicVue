<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="canGoBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Homepage</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <h1>Welcome to the App</h1>
        <p>Get started with our features below:</p>

        <ion-list>
          <ion-item router-link="/features">Features</ion-item>
          <ion-item router-link="/docs">Docs</ion-item>
          <ion-item router-link="/contact">Contact Us</ion-item>
        </ion-list>
      </div>
      <SubscriptionsComponent />
      <NewsletterComponent />
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
  IonList,
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import { useIonRouter } from "@ionic/vue";
import NewsletterComponent from "@/components/NewsletterComponent.vue";
import SubscriptionsComponent from "@/components/SubscriptionsComponent.vue";

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
    IonList,
    NewsletterComponent,
    SubscriptionsComponent,
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

<style scoped>
.container {
  padding: 20px;
}

h1 {
  text-align: center;
}

ion-list {
  margin-top: 20px;
}
</style>
