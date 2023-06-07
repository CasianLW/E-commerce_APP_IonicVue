<template>
  <ion-card
    style="
      margin: auto;
      background-color: #7458ea;
      border-radius: 0 0 25px 25px;
    "
    class="section"
  >
    <ion-card-header
      style="flex-direction: column; text-align: center; margin: 28px 0"
    >
      <ion-card-title style="color: #d3fe57" class="section-title"
        >Subscriptions</ion-card-title
      >
      <ion-card-subtitle
        style="
          color: white;
          text-transform: none;
          font-weight: 300;
          width: 80%;
          margin: 0 auto;
        "
        class="section-soustitle"
      >
        Des multiples avantages s’ouvrent à vous grâce à votre engagement
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content
      class="slider-container"
      style="
        background-color: #7458ea;
        margin: 8px;
        border-radius: 20px;
        padding: 0;
      "
    >
      <ion-card-content
        class="slider-item"
        style="
          padding-bottom: 68px !important;
          border-radius: 20px;
          background-color: #d3fe57;
        "
      >
        <ion-card-title class="card-title">Supporter</ion-card-title>
        <div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
        </div>
        <div class="subscribe-infos">
          <p>4.99€ / MONTH</p>
          <button>Subscribe</button>
        </div>
      </ion-card-content>
      <ion-card-content
        class="slider-item"
        style="
          padding-bottom: 68px !important;
          border-radius: 20px;
          background-color: #d3fe57;
        "
      >
        <ion-card-title class="card-title">Supporter</ion-card-title>
        <div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
          <div class="list-item">
            <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
            <p>Early accès à tous les jeux</p>
          </div>
        </div>
        <div class="subscribe-infos">
          <p>4.99€ / MONTH</p>
          <button>Subscribe</button>
        </div>
      </ion-card-content>
      <div class="slider-infos">
        <div class="active-slide"></div>
        <div class=""></div>
        <div class=""></div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
} from "@ionic/vue";

export default {
  name: "SubscriptionsComponent",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
  },
  data() {
    return {
      inputFocus: false, // whether input is focused
    };
  },
  methods: {
    handleFocus() {
      this.inputFocus = true;
    },
    handleBlur() {
      this.inputFocus = false;
    },
  },
};
</script>

<style scoped>
.card-title {
  color: #7458ea;
  text-decoration: underline;
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 20px;
}
.list-item {
  display: flex;
  color: black;
  gap: 8px;
  font-weight: 600;
  margin: 4px 0;
}
.list-item p {
  margin-bottom: 0;
  font-size: 12px;
}
.subscribe-infos {
  position: absolute;
  bottom: 5%;
  widows: fit-content;
}
.subscribe-infos p {
  text-align: center;
  color: black;
  font-size: 10px;
  font-weight: 800;
  margin: 0;
}
.subscribe-infos button {
  background-color: black;
  padding: 8px 24px;
  border-radius: 99px;
}
.slider-infos {
  display: flex;
  gap: 8px;
  position: absolute;
  right: 5%;
  bottom: 5%;
}
.slider-infos div {
  height: 6px;
  border-radius: 99px;
  width: 28px;
  background-color: rgba(0, 0, 0, 0.6);
}
.active-slide {
  background-color: black !important;
}
</style>
