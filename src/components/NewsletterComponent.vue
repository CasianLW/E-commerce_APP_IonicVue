<template>
  <ion-card style="margin: auto" class="newsletter">
    <ion-card-header class="header_newsletter">
      <img
        style="max-width: 120px; margin: auto"
        class="newsletternew"
        src="@/ressources/newsletterIcon.png"
      />
      <ion-card-title class="newsletter4">Newsletter</ion-card-title>
      <ion-card-subtitle
        class="soyezaucourantaveclesdernièresnouveautésdirectementdansvotreboitemail"
      >
        Soyez au courant avec les dernières nouveautés directement dans votre
        boite mail
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-input
        class="email_input"
        :class="{ 'input-focus': inputFocus }"
        placeholder="xyz@yourmail.com..."
        @ionFocus="handleFocus"
        @ionBlur="handleBlur"
      ></ion-input>
      <ion-button class="subscribebtn" expand="full">Subscribe</ion-button>
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
  name: "NewsletterComponent",
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
.email_input.input-focus {
  background-color: #eee;
  color: black;
  transform: scale(1.05);
}
.newsletter {
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0px;
  display: flex;
  /* gap: 12px; */
}
.header_newsletter {
  flex-direction: column;
}
.newsletternew {
  /* height: 112px; */
  /* width: 112px; */
  filter: drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.25));
}
.newsletter4 {
  color: #000000;
}
.soyezaucourantaveclesdernièresnouveautésdirectementdansvotreboitemail {
  color: #000000;

  font-size: 12px;
}
.email_input {
  background-color: #ffffff;
  /* width: 100%; */
  border: #000000 solid 1px;
  border-radius: 999px;
  text-align: left;
  padding-left: 20px !important;
}
.yourmail {
  color: #646464;
}
.card-content-ios {
  width: 100%;
}
.subscribebtn {
  border-radius: 999px;
  width: 50%;
  float: right;
  background-color: #000000;
}
.subscribe2 {
  color: #ffffff;
}
</style>
