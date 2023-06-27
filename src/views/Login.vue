<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title class="ion-text-center" size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Login</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main>
        <img
          style="width: 70%; margin: auto; display: block"
          src="@/ressources/connexion/loginImage.png"
          alt="Image connexion"
        />
        <h1
          size="large"
          class="ion-text-center ion-align-items-center ion-padding-bottom"
        >
          Connectez-vous
        </h1>
        <form class="ion-margin-bottom ion-margin-top" @submit.prevent="login">
          <ion-item>
            <!-- <ion-label position="stacked">Email:</ion-label> -->
            <Field name="email" :rules="emailRules">
              <template #default="{ field }">
                <ion-input
                  type="text"
                  v-bind="field"
                  autocomplete="email"
                  label="Email:"
                ></ion-input>

                <!-- <div v-if="field.value">
                  <ErrorMessage name="email" />
                </div> -->
              </template>
            </Field>
          </ion-item>
          <div class="ion-margin-horizontal">
            <ErrorMessage name="email" class="error" />
          </div>
          <ion-item>
            <!-- <ion-label position="stacked">Password:</ion-label> -->
            <Field name="password" :rules="passwordRules">
              <template #default="{ field }">
                <ion-input
                  type="password"
                  v-bind="field"
                  autocomplete="current-password"
                  label="Password:"
                ></ion-input>
                <!-- <div v-if="field.value">
                  <ErrorMessage name="password" />
                </div> -->
              </template>
            </Field>
          </ion-item>
          <div class="ion-margin-horizontal">
            <ErrorMessage name="password" class="error" />
          </div>

          <ion-button
            class="ion-margin"
            expand="full"
            shape="round"
            type="submit"
            :disabled="hasErrors"
            >Login</ion-button
          >
          <div style="text-align: center">
            <router-link style="margin: auto" to="/register">
              Pas de compte? S'enregistrer
            </router-link>
          </div>
          <div style="text-align: center; margin-top: 12px; text">
            <router-link style="margin: auto" to="/forgot-password">
              Mot de passe oublié
            </router-link>
          </div>
          <div class="ion-text-center" v-if="activeSpinner">
            <br />
            <br />
            <ion-spinner color="primary"></ion-spinner>
          </div>
        </form>

        <div v-if="error" class="error ion-text-center">{{ errorMessage }}</div>
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
  IonLabel,
} from "@ionic/vue";
import {
  useForm,
  Field,
  ErrorMessage,
  configure,
  defineRule,
} from "vee-validate";
import { required, min, email } from "@vee-validate/rules";

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
defineRule("min", min);
defineRule("password", (value: string) => {
  if (!/(?=.*[A-Z])/.test(value)) {
    return "Le mot de passe doit contenir au moins une lettre capitale";
  }

  return true;
});

configure({
  generateMessage: (ctx) => {
    const messages = {
      customRequired: "Champ obligatoire",
      customEmail: "Entrez une adresse email valide",
      password: "Le mot de passe doit contenir au moins une lettre capitale",
      required: "Ce champ est obligatoire",
      min: "Le mot de passe doit avoir au moins 8 caractéres",
      email: "Entrez une adresse email valide", // This is the custom message for the email rule
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
    IonLabel,
  },
  setup() {
    const activeSpinner = ref(false);
    const { handleSubmit, resetForm, errors } = useForm();
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    const error = ref(false);
    const errorMessage = ref("");
    const emailRules = "customRequired|email";
    const passwordRules = "required|min:8|password";

    const authStore = useAuthStore();
    const router = useRouter();

    const login = handleSubmit(async (values) => {
      activeSpinner.value = true;
      try {
        await authStore.login(values.email, values.password);
        router.push({ path: "/" });
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Authenification échouée";
      }
      activeSpinner.value = false;
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    });

    return {
      error,
      errorMessage,
      login,
      handleSubmit,
      errors,
      emailRules,
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
