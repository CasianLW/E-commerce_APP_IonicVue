<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Contact Us</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-padding">
        <h2>Get In Touch</h2>

        <form @submit.prevent="submitForm">
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input v-model="form.name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model="form.email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Message</ion-label>
            <ion-textarea v-model="form.message"></ion-textarea>
          </ion-item>
          <ion-button expand="full" type="submit" class="ion-margin-top"
            >Submit</ion-button
          >
        </form>

        <h2>Find Us</h2>
        <p>123 Fake Street, Example City, EX1 2BD</p>
        <p>Phone: 01234 567890</p>
        <p>Email: info@example.com</p>

        <div id="map">
          <GoogleMaps />
        </div>
      </div>
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
