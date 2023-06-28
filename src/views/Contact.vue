<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/homepage"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center ion-align-items-center"
          >Contact</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main>
        <div class="ion-padding">
          <h2>Get In Touch</h2>
          <form @submit.prevent="submitForm">
            <ion-item>
              <ion-input
                v-model="form.name"
                label="Name:"
                placeholder="Nom.."
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                type="email"
                v-model="form.email"
                label="Email:"
                placeholder="exemple@mail.com"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-textarea
                style="height: 140px"
                v-model="form.message"
                label="Message:"
                placeholder="(200 characters max)"
              ></ion-textarea>
            </ion-item>
            <ion-button
              expand="full"
              shape="round"
              type="submit"
              class="ion-margin-top ion-margin-bottom"
              >Submit</ion-button
            >
            <p style="color: #7458ea" class="ion-text-center">
              {{ mailMessage }}
            </p>
          </form>
          <h2 class="ion-padding-top">Find Us</h2>
          <p>14 rue des Jeux, GTA, San Andreas</p>
          <p>01 02 03 01 05</p>
          <p>info@gamoshi.com</p>
          <div id="map">
            <GoogleMaps />
          </div>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
import GoogleMaps from "@/components/GoogleMaps.vue";
import { useAuthStore } from "../stores/auth";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    GoogleMaps,
  },
  setup() {
    const form = ref({
      name: "",
      email: "",
      message: "",
    });
    const mailMessage = ref("");

    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
      form.value.name = authStore.user?.name;
      form.value.email = authStore.user?.email;
    }

    async function submitForm() {
      try {
        const response = await authStore.sendEmail(
          form.value.name,
          form.value.email,
          form.value.message
        );
        console.log("Email sent successfully");
        console.log(response.data);
        // Clear the form after a successful submission
        form.value.name = "";
        form.value.email = "";
        form.value.message = "";
      } catch (error) {
        console.error("Sending email failed:", error);
        mailMessage.value = "Sending email failed";
        setTimeout(() => {
          mailMessage.value = "";
        }, 3000);
      }
    }

    return {
      form,
      submitForm,
      mailMessage,
    };
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 300px;
  background-color: #ccc;
}
</style>
