<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
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
              <!-- <ion-label position="floating">Name</ion-label> -->
              <ion-input
                v-model="form.name"
                label="Name:"
                placeholder="Nom.."
              ></ion-input>
            </ion-item>
            <ion-item>
              <!-- <ion-label position="floating">Email</ion-label> -->
              <ion-input
                type="email"
                v-model="form.email"
                label="Email:"
                placeholder="exemple@mail.com"
              ></ion-input>
            </ion-item>
            <ion-item>
              <!-- <ion-label position="floating">Message</ion-label> -->
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

    function submitForm() {
      console.log(form.value);
      // Send form data to your server
    }

    return {
      form,
      submitForm,
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
