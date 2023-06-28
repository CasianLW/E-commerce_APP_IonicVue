<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Account</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-padding">
        <div class="header-account">
          <h1>{{ user.name }}</h1>
          <div class="square-image-container">
            <img
              style="border-radius: 25px"
              :src="
                user.avatar
                  ? user.avatar
                  : 'https://avatars.dicebear.com/api/male/john.png'
              "
              :alt="user.name"
            />
          </div>
          <div v-if="user.subscriptionID != null" class="subscription-status">
            Subscribed
          </div>
          <div v-else class="subscription-status">Not Subscribed</div>
          <div class="user-info">
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
            <p>{{ user.location }}, {{ user.city }}, {{ user.zip }}</p>
          </div>
          <div class="ion-margin-top" v-if="!editSuccessful">
            <ion-button shape="round" expand="full" @click="editInfos"
              >Edit Infos</ion-button
            >
          </div>
          <div v-else style="color: white; text-align: center">
            Infos updated
          </div>
        </div>
        <div v-if="!resetLinkSent">
          <ion-button
            color="dark"
            shape="round"
            expand="full"
            @click="changePassword"
            >Change Password</ion-button
          >
        </div>
        <div v-else>
          <div style="color: white">
            A reset link has been sent to your email address.
          </div>
        </div>
        <teleport to="body">
          <ion-modal :is-open="showModal" @ionModalDidDismiss="closeModal">
            <ion-header>
              <ion-toolbar>
                <ion-title>Confirm action</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <p style="color: white; text-align: center">
                Are you sure you want to reset your password?
              </p>
              <div style="text-align: center">
                <ion-button
                  color="success"
                  size="large"
                  @click="handleResetLink"
                  >Yes</ion-button
                >
                <ion-button color="danger" size="large" @click="closeModal"
                  >No</ion-button
                >
              </div>
            </ion-content>
          </ion-modal>
        </teleport>
        <teleport to="body">
          <ion-modal
            :is-open="showEditModal"
            @ionModalDidDismiss="showEditModal = false"
          >
            <ion-header>
              <ion-toolbar>
                <ion-title>Edit Profile</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <form @submit.prevent="handleEditUser">
                <ion-item>
                  <ion-input
                    label="Name:"
                    v-model="newName"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Avatar image:"
                    placeholder="url to image"
                    v-model="newImage"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Email:"
                    v-model="newEmail"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="Location:"
                    v-model="newLocation"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    label="City:"
                    v-model="newCity"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Zip:" v-model="newZip" required></ion-input>
                </ion-item>
                <ion-button expand="full" type="submit">Submit</ion-button>
                <ion-button
                  expand="full"
                  color="danger"
                  @click="showEditModal = false"
                  >Cancel</ion-button
                >
              </form>
            </ion-content>
          </ion-modal>
        </teleport>
      </main>
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
  IonButton,
  IonModal,
  IonText,
  IonInput,
  IonLabel,
  IonItem,
} from "@ionic/vue";

import { ref } from "vue";

import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "Account",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonButton,
    IonModal,
    IonText,
    IonInput,
    IonLabel,
    IonItem,
  },
  setup() {
    const error = ref(false);
    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();
    const user = ref(authStore.user);
    const showModal = ref(false);
    const showEditModal = ref(false);
    const resetLinkSent = ref(false);
    const editSuccessful = ref(false);

    const newName = ref(user.value.name);
    const newEmail = ref(user.value.email);
    const newLocation = ref(user.value.location);
    const newCity = ref(user.value.city);
    const newZip = ref(user.value.zip);
    const newImage = ref(user.value.avatar);
    // const newImage = computed(() => user.value.avatar);
    function editInfos() {
      showEditModal.value = true;
    }
    async function handleEditUser() {
      try {
        await authStore.editUser(
          user.value.id,
          newName.value,
          newEmail.value,
          newLocation.value,
          newCity.value,
          newZip.value,
          newImage.value
        );
        editSuccessful.value = true;
        // fetch the updated user data
        // user = authStore.user;
        user.value = authStore.user;
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Failed to update user info";
      }
      setTimeout(() => {
        errorMessage.value = "";
        editSuccessful.value = false;
      }, 3000);
      showEditModal.value = false;
    }

    // console.log(user);
    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };

    function changePassword() {
      openModal();
    }

    // function editInfos() {
    //   router.push("/edit-infos");
    // }
    async function handleResetLink() {
      try {
        await authStore.sendPasswordResetLink(user.email);
        resetLinkSent.value = true;
      } catch (err) {
        error.value = true;
        console.log(err);
        errorMessage.value = "Failed to send reset link";
      }
      setTimeout(() => {
        errorMessage.value = "";
        resetLinkSent.value = false;
      }, 3000);
      closeModal();
    }

    return {
      user,
      newName,
      newEmail,
      newLocation,
      newCity,
      newZip,
      newImage,
      changePassword,
      editInfos,
      handleResetLink,
      handleEditUser,
      showModal,
      showEditModal,
      openModal,
      closeModal,
      resetLinkSent,
      editSuccessful,
    };
  },
};
</script>

<style scoped>
.header-account {
  color: white;
}
.header-account h1 {
  text-align: center;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0.5em;
}
.square-image-container {
  width: 50%;
  margin: auto;
  padding-top: 50%; /* ratio 1:1 */
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
.subscription-status {
  text-align: center;
  font-size: 20px;
  margin: 10px 0;
}
.user-info p {
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
