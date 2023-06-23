<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Actualités</ion-title
          >
        </ion-toolbar>
      </ion-header>
      <main class="ion-margin-horizontal">
        <div class="header-actus">
          <h1>Actualités</h1>
          <p>Soyez toujours à jour avec les derières actus</p>
        </div>
        <div class="actualites">
          <div class="categories">
            <div class="categorie">
              <div class="image-container">
                <img
                  src="@/ressources/actualites/gamingImage.jpg"
                  alt="gaming image"
                />
              </div>
              <p class="categorie-title">Gaming</p>
            </div>
            <div class="categorie">
              <div class="image-container">
                <img
                  src="@/ressources/actualites/nftImage.jpg"
                  alt="nft image"
                />
              </div>
              <p class="categorie-title">NFT</p>
            </div>
            <div class="categorie">
              <div class="image-container">
                <img
                  src="@/ressources/actualites/cryptoImage.jpg"
                  alt="crypto image"
                />
              </div>
              <p class="categorie-title">Crypto</p>
            </div>
          </div>
          <div class="news">
            <div class="news-choice">
              <div
                class="active-element"
                :style="{
                  transform:
                    activeChoice === 'Récents'
                      ? 'translateX(4px)'
                      : 'translateX(calc(100% + 4px))',
                }"
              ></div>
              <div
                :class="{ 'active-text': activeChoice === 'Récents' }"
                @click="setActiveChoice('Récents')"
              >
                Récents
              </div>
              <div
                :class="{ 'active-text': activeChoice === 'Tendances' }"
                @click="setActiveChoice('Tendances')"
              >
                Tendances
              </div>
            </div>
            <!-- <div class="news-list"> -->
            <div
              :class="[
                'news-list',
                { 'active-tendances': activeChoice === 'Tendances' },
              ]"
            >
              <div
                :class="[
                  'recents-list',
                  { 'active-news': activeChoice === 'Récents' },
                ]"
              >
                <NewsCard
                  v-for="(event, index) in events.slice().reverse().slice(0, 4)"
                  :key="event.id"
                  :id="event.id"
                  :imgSrc="event.image"
                  :imgAlt="event.title"
                  :description="event.content"
                  :author="event.author"
                  :timeAgo="formatTimeAgo(event.createdAt)"
                />
              </div>
              <div
                :class="[
                  'tendances-list',
                  { 'active-news': activeChoice === 'Tendances' },
                ]"
              >
                <NewsCard
                  v-for="i in 4"
                  :key="i"
                  imgSrc="https://images.unsplash.com/photo-1635002962487-2c1d4d2f63c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                  imgAlt="technologie image"
                  description="Nouvelle tendance permettant aux joueurs de ressentir plus de sensations"
                  author="Auteur"
                  timeAgo="1h ago"
                />
              </div>
            </div>
          </div>
        </div>
        <ion-button expand="full" shape="round" routerLink="/news/all">
          Tous les articles
        </ion-button>
        <NewsletterComponent style="padding-top: 40px" />
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
} from "@ionic/vue";
import NewsCard from "@/components/news/NewsCard.vue";
import NewsletterComponent from "@/components/NewsletterComponent.vue";
import { useAuthStore } from "../stores/auth";
import { onMounted, computed, ref } from "vue";
export default {
  name: "News",
  components: {
    NewsCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    NewsletterComponent,
    IonButton,
  },
  data() {
    return {
      activeChoice: "Récents", // This will hold the current active choice
    };
  },
  setup() {
    const authStore = useAuthStore();
    const events = ref([]);
    const loaded = ref(false);

    onMounted(async () => {
      await authStore.getEvents();
      // events.value = authStore.events;
      events.value = authStore.events.filter((event) => event.published);

      loaded.value = true;
    });

    return {
      events: computed(() => events.value),
      loaded,
    };
  },
  methods: {
    setActiveChoice(choice) {
      this.activeChoice = choice;
    },
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
.news-list {
  display: flex;
  flex-direction: row;
  gap: 5%;
  transform: translateX(0%) scale(1) !important;
  transition: all 0.3s ease-in-out;
}
.news-list > div {
  opacity: 0;
}
.news-list div {
  flex: 1 0 100%;
  transition: all 0.3s ease-in-out;
  /* transform: translateX(-100%) scale(1); */
}

.active-tendances {
  transform: translateX(-105%) scale(1) !important;
}
.news-list div.active-news {
  opacity: 1 !important;
}
.categories {
  margin-top: 40px;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}
.categories::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.categorie {
  position: relative;
  width: 140px;
  border-radius: 25px;
  text-align: center;
  background-color: transparent;
  flex: 0 0 auto;
  margin-right: 16px;
}
.categorie-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 8px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 15%,
    rgba(0, 0, 0, 0) 100%
  );

  color: white;
  font-size: 16px;
  font-weight: 500;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}
.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  border-radius: inherit;
}
.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.header-actus p {
  font-weight: 400;
  font-size: 14px;
  padding: 0;
  margin: 0;
}
.header-actus h1 {
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 0;
}
.header-actus {
  color: white;
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

/*select news  */
.news {
  margin-top: 72px;
}
.news-choice div {
  font-weight: 500;
  width: 50%;
  z-index: 10;
}
.news-choice {
  color: white;
  background-color: #000000;
  border-radius: 25px;
  height: 44px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}
.active-element {
  transition: all 0.3s ease-in-out;
  position: absolute;
  /* transform: translateX(4px); */
  /* left: 0; */
  z-index: 0;
  width: 45% !important;
  /* margin: 0 8px 0 8px; */
  height: 36px;
  background-color: #d3fe57;
  border-radius: 25px;
}
.active-text {
  color: #000000;
}
</style>
