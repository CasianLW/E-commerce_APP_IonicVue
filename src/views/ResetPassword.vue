<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Reset Password</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main>
        <img
          style="width: 70%; margin: auto; display: block"
          src="@/ressources/connexion/resetPassImage.png"
          alt="Image forgot password"
        />
        <div v-if="!passwordReset">
          <h1
            size="large"
            class="ion-text-center ion-align-items-center ion-padding-bottom"
          >
            Entrez votre nouveau mot de passe
          </h1>
          <form
            class="ion-margin-bottom ion-margin-top"
            @submit.prevent="resetPassword"
          >
            <ion-item>
              <Field name="password" :rules="passwordRules">
                <template #default="{ field }">
                  <ion-input
                    type="password"
                    v-bind="field"
                    autocomplete="new-password"
                    label="New password:"
                  ></ion-input>
                </template>
              </Field>
            </ion-item>
            <!-- <div class="ion-margin-horizontal">
              <ErrorMessage name="password" class="error" />
            </div> -->
            <ion-item>
              <Field name="password_confirmation" rules="confirmed:@password">
                <template #default="{ field }">
                  <ion-input
                    type="password"
                    v-bind="field"
                    autocomplete="new-password"
                    label="Confirm password:"
                  ></ion-input>
                </template>
              </Field>
            </ion-item>

            <div class="ion-margin-horizontal">
              <ErrorMessage name="password" class="error" />
            </div>
            <div class="ion-margin-horizontal">
              <ErrorMessage name="password_confirmation" class="error" />
            </div>

            <ion-button
              class="ion-margin"
              expand="full"
              shape="round"
              type="submit"
              :disabled="hasErrors"
              >Reset</ion-button
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
              Votre mot de passe a bien été changé
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
import { useRouter, useRoute } from "vue-router";
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
import { required, confirmed, min } from "@vee-validate/rules";

defineRule("required", required);
defineRule("password", (value) => {
  if (!/(?=.*[A-Z])/.test(value)) {
    return "Le mot de passe doit contenir au moins une lettre capitale";
  }
  return true;
});
defineRule("passwordNumber", (value) => {
  if (!/(?=.*\d)/.test(value)) {
    return "Le mot de passe doit contenir au moins un chiffre";
  }
  return true;
});
defineRule("passwordLowercase", (value) => {
  if (!/(?=.*[a-z])/.test(value)) {
    return "Le mot de passe doit contenir au moins une lettre minuscule";
  }
  return true;
});
defineRule("confirmed", confirmed);
defineRule("min", min);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: "Ce champ est obligatoire",
      password: "Le mot de passe doit contenir au moins une lettre capitale",
      passwordNumber: "Le mot de passe doit contenir au moins un chiffre",
      passwordLowercase:
        "Le mot de passe doit contenir au moins une lettre minuscule",
      confirmed: "Les mots de passe ne correspondent pas",
      min: "Le mot de passe doit avoir au moins 8 caractéres",
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
    const passwordRules =
      "required|min:8|password|passwordNumber|passwordLowercase";

    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const passwordReset = ref(false);

    const resetPassword = handleSubmit(async (values) => {
      activeSpinner.value = true;
      try {
        await authStore.resetPassword(route.params.token, values.password);
        passwordReset.value = true;
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Failed to reset password";
      }
      activeSpinner.value = false;
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    });

    return {
      error,
      errorMessage,
      resetPassword,
      passwordReset,
      handleSubmit,
      errors,
      passwordRules,
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
