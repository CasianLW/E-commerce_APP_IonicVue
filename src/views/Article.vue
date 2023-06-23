<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Article</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-padding">
        <div class="header-article">
          <h1>{{ article.title }}</h1>
          <div class="square-image-container">
            <img
              style="border-radius: 25px"
              :src="article.image"
              :alt="article.title"
            />
          </div>
          <p>{{ article.content }}</p>
          <div style="display: flex; gap: 8px; justify-content: right">
            <p style="color: #7458ea; font-weight: 700">{{ article.author }}</p>
            <p>{{ formatTimeAgo(article.createdAt) }}</p>
          </div>
        </div>
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
} from "@ionic/vue";
import { useAuthStore } from "../stores/auth";

import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Article",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
  methods: {
    formatTimeAgo(dateTime) {
      const now = new Date();
      const createdAt = new Date(dateTime);
      const timeDiff = now - createdAt;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      let timeAgo = "";
      if (days > 0) {
        timeAgo += `${days}d${days > 1 ? "" : ""}`;
      }
      if (hours > 0) {
        timeAgo += `${days > 0 ? " " : ""}${hours}h${hours > 1 ? "" : ""}`;
      }
      if (timeAgo === "") {
        timeAgo = "just now";
      } else {
        timeAgo += " ago";
      }

      return timeAgo;
    },
  },
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const article = ref({});
    const id = route.params.id;

    onMounted(async () => {
      if (!id) {
        router.push("/home");
        return;
      }

      try {
        const result = await store.getArticle(id);
        article.value = result.event;
        console.log(result);
      } catch (error) {
        console.log(error);
        router.push("/home");
      }
    });

    return {
      article,
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
