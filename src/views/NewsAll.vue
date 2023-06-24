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
        <h1 style="font-weight: 900; font-size: 40px; color: white">
          Tous les articles
        </h1>
        <div class="news-all">
          <NewsCard
            v-for="(event, index) in paginatedEvents"
            :key="event.id"
            :id="event.id"
            :imgSrc="event.image"
            :imgAlt="event.title"
            :description="event.content"
            :author="event.author"
            :timeAgo="formatTimeAgo(event.createdAt)"
          />
        </div>
        <div class="pagination">
          <button
            :class="{ 'page-btn': true, active: currentPage === pageNumber }"
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="setCurrentPage(pageNumber)"
          >
            {{ pageNumber }}
          </button>
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

const formatTimeAgo = (dateTime) => {
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
};

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
  setup() {
    const authStore = useAuthStore();
    const events = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 2;
    const loaded = ref(false);

    onMounted(async () => {
      await authStore.getEvents();
      events.value = authStore.events.filter((event) => event.published);
      loaded.value = true;
    });

    const paginatedEvents = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return events.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() =>
      Math.ceil(events.value.length / itemsPerPage)
    );

    const setCurrentPage = (page) => {
      currentPage.value = page;
    };

    return {
      events,
      paginatedEvents,
      currentPage,
      itemsPerPage,
      totalPages,
      setCurrentPage,
      formatTimeAgo,
      loaded,
    };
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.page-btn {
  margin: 0 0.5rem;
  padding: 0.5rem;
  background-color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.page-btn:hover {
  background-color: #000000;
}

.page-btn.active {
  background-color: #7458ea;
}
</style>
