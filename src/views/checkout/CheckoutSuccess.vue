<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Checkout Success</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-padding">
        <div class="header-article">
          <h1>Thank You For Your Purchase!</h1>
          <div class="square-image-container">
            <img
              style="border-radius: 25px"
              src="@/ressources/checkout/successPay.png"
              alt="Success"
            />
          </div>
          <p>Your email: {{ user?.email }}</p>
          <p>Your Session ID: {{ sessionId }}</p>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";

export default {
  name: "CheckoutSuccess",
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
    const route = useRoute();
    const sessionId = ref(route.query.session_id);
    const user = ref(null);

    const authStore = useAuthStore();

    onMounted(async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:3000/api/store/user-info",
        //   {
        //     withCredentials: true,
        //   }
        // );
        await authStore.getUser();
        user.value = authStore.user;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });

    return {
      sessionId,
      user,
    };
  },
};
</script>

<style scoped>
.header-article {
  color: white;
}
.header-article h1 {
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0.5em;
}
.square-image-container {
  width: 100%;
  padding-top: 100%; /* ratio 1:1 */
  position: relative;
}
.square-image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.header-article p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
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
