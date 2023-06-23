<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Forgot Password</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main>
        <img
          style="width: 70%; margin: auto; display: block"
          src="@/ressources/connexion/forgotPassImage.png"
          alt="Image forgot password"
        />
        <div v-if="!resetLinkSent">
          <h1
            size="large"
            class="ion-text-center ion-align-items-center ion-padding-bottom"
          >
            Récupérez votre mot de passe
          </h1>
          <form
            class="ion-margin-bottom ion-margin-top"
            @submit.prevent="sendResetLink"
          >
            <ion-item>
              <Field name="email" :rules="emailRules">
                <template #default="{ field }">
                  <ion-input
                    type="text"
                    v-bind="field"
                    autocomplete="email"
                    label="Email:"
                  ></ion-input>
                </template>
              </Field>
            </ion-item>
            <div class="ion-margin-horizontal">
              <ErrorMessage name="email" class="error" />
            </div>
            <ion-button
              class="ion-margin"
              expand="full"
              shape="round"
              type="submit"
              :disabled="hasErrors"
              >Submit</ion-button
            >
            <div class="ion-text-center" v-if="activeSpinner">
              <br />
              <br />
              <ion-spinner color="primary"></ion-spinner>
            </div>
          </form>
          <div v-if="error" class="error ion-text-center">
            {{ errorMessage }}
          </div>
        </div>
        <div v-else>
          <h1 size="large" class="ion-text-center ion-align-items-center">
            Succès
          </h1>
          <ion-card-content>
            <p class="ion-padding-bottom">
              Vérifiez votre boîte mail pour réinitialiser votre mot de passe
              (le lien expirera dans 10 minutes)
            </p>
            <ion-button expand="full" shape="round" routerLink="/login">
              Se connecter
            </ion-button>
          </ion-card-content>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonInput,
  IonBackButton,
  IonItem,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import {
  useForm,
  Field,
  ErrorMessage,
  configure,
  defineRule,
} from "vee-validate";
import { required, email } from "@vee-validate/rules";

defineRule("customRequired", (value: string) => {
  if (!value || value.trim() === "") {
    return "Champ obligatoire";
  }
  return true;
});

defineRule("required", required);
defineRule("email", email);
defineRule("customEmail", (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value || !emailRegex.test(value)) {
    return "Entrez une adresse email valide";
  }

  return true;
});

configure({
  generateMessage: (ctx) => {
    const messages = {
      customRequired: "Champ obligatoire",
      customEmail: "Entrez une adresse email valide",
      required: "Ce champ est obligatoire",
      email: "Entrez une adresse email valide",
    };

    const messageKey = ctx.rule.name as keyof typeof messages;

    return messages[messageKey] ?? "This field is invalid";
  },
});
export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    Field,
    ErrorMessage,
    IonSpinner,
    IonInput,
    IonBackButton,
    IonItem,
    IonButton,
    IonButtons,
  },
  setup() {
    const activeSpinner = ref(false);
    const { handleSubmit, resetForm, errors } = useForm();
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    const error = ref(false);
    const errorMessage = ref("");
    const emailRules = "customRequired|email";

    const authStore = useAuthStore();
    const router = useRouter();

    const resetLinkSent = ref(false);

    const sendResetLink = handleSubmit(async (values) => {
      activeSpinner.value = true;
      try {
        await authStore.sendPasswordResetLink(values.email);
        resetLinkSent.value = true;
        // router.push({ path: "/login" });
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Failed to send reset link";
      }
      activeSpinner.value = false;
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    });

    return {
      error,
      errorMessage,
      sendResetLink,
      resetLinkSent,
      handleSubmit,
      errors,
      emailRules,
      activeSpinner,
      hasErrors,
    };
  },
};
</script>

<style scoped>
template {
  display: block;
}
</style>
