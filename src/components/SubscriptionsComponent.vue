<template>
  <div
    style="
      margin: auto;
      background-color: #7458ea;
      border-radius: 0 0 25px 25px;
      padding-bottom: 4px;
      margin-top: -2px;
      z-index: 100;
      position: relative;
    "
    class="section"
  >
    <ion-card-header style="flex-direction: column; text-align: center">
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
      <Carousel style="width: 100%">
        <Slide style="width: 100%" v-for="(item, index) in items" :key="index">
          <ion-card-content class="slider-item">
            <ion-card-title
              style="text-transform: uppercase"
              class="card-title"
              >{{ item.name }}</ion-card-title
            >
            <div>
              <div
                class="list-item"
                v-for="(list, i) in item.listItems"
                :key="i"
              >
                <img src="@/ressources/checkboxIcon.svg" alt="icone checkbox" />
                <p>{{ list }}</p>
              </div>
            </div>
            <div class="subscribe-infos">
              <p style="margin-bottom: 4px">{{ item.price }} / MONTH</p>
              <!-- <button>Subscribe</button> -->
              <router-link
                class="button-subscribe"
                v-if="userIsAuthenticated"
                to="/homepage"
                @click.prevent="subscribe(item)"
                >Subscribe</router-link
              >
              <router-link class="button-subscribe" v-else to="/login"
                >Login to Subscribe</router-link
              >
            </div>
          </ion-card-content>
        </Slide>

        <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
          <Pagination v-if="slidesCount > 1" />
        </template>
      </Carousel>
      <!-- <div class="slider-infos">
        <div class="active-slide"></div>
        <div class=""></div>
        <div class=""></div>
      </div> -->
    </ion-card-content>
  </div>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue";

import "vue3-carousel/dist/carousel.css";
import { useAuthStore } from "@/stores/auth.js";
import { computed, ref, onMounted } from "vue";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default {
  name: "SubscriptionsComponent",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    const authStore = useAuthStore();
    const userIsAuthenticated = computed(() => authStore.loggedIn);
    const items = ref([]);

    const subscribe = async (item) => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/store/create-checkout-session`,
          {
            price_id: item.stripePriceId,
            customer_id: authStore.user.stripeCustomerId,
          }
        );

        // const data = await response.json();
        const data = await response.data;
        console.log(data);

        // then redirect to Stripe Checkout
        // if (data.id) {
        if (data.url) {
          // Note: this assumes your website is already configured to handle deep links.
          // window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
          window.location.href = `${data.url}`;
        } else {
          throw new Error("Failed to create checkout session.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onMounted(async () => {
      try {
        await authStore.getSubscriptions();
        items.value = authStore.subscriptions.map((sub) => {
          // split listItems into an array
          return {
            ...sub,
            listItems: sub.listItems.split("/"),
          };
        });
        console.log(items.value);
      } catch (error) {
        console.log(error);
      }
    });

    return {
      userIsAuthenticated,
      items,
      subscribe,
    };
  },
};
</script>

<style scoped>
.slider-item {
  max-height: 220px;
  padding-bottom: 88px !important;
  border-radius: 20px;
  background-color: #d3fe57;
  width: 100%;
}
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
.subscribe-infos .button-subscribe {
  text-decoration: none;
  color: white;
  font-size: 12px;
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

/* classes pour le carrousel */
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  /* style the navigation arrows */
  color: #fff;
  position: absolute !important;
  bottom: 0;
}

.carousel__pagination {
  /* style the pagination component */
  /* background-color: #000; */
  border-radius: 999px;
  bottom: 0;
  right: 5%;
  position: absolute;
  z-index: 100;
}

.carousel__pagination-item {
  /* style the pagination items */
  color: #fff;
}

.carousel__item {
  /* add space between slides */
  margin-right: 10px;
}
:deep(.carousel__pagination-button)::after {
  border-radius: 99px !important;
  width: 28px;
  height: 6px;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  position: absolute;
  top: 20%;
  border-radius: 99px;
}
</style>
