<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >News</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-padding">
        <h1>Tous les articles</h1>
        <div class="news-all">
          <NewsCard
            v-for="(event, index) in events"
            :key="event.id"
            :id="event.id"
            :imgSrc="event.image"
            :imgAlt="event.title"
            :description="event.content"
            :author="event.author"
            :timeAgo="formatTimeAgo(event.createdAt)"
          />
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
import NewsCard from "@/components/news/NewsCard.vue";
import { useAuthStore } from "../stores/auth";
import { onMounted, computed, ref } from "vue";
export default {
  name: "NewsAll",
  components: {
    NewsCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
  data() {
    return {};
  },
  setup() {
    const authStore = useAuthStore();
    const events = ref([]);
    const loaded = ref(false);

    onMounted(async () => {
      await authStore.getEvents();
      events.value = authStore.events.filter((event) => event.published);

      loaded.value = true;
    });

    return {
      events: computed(() => events.value),
      loaded,
    };
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
};
</script>

<style scoped>
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
