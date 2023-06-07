<template>
  <div>
    <ion-card-header>
      <ion-card-title>Game List</ion-card-title>
    </ion-card-header>

    <div>
      <Carousel v-bind="settings">
        <Slide
          v-for="(category, index) in categories"
          :key="index"
          @click="activateCategory(index)"
        >
          <div class="slider-categorie">
            <ion-card-title class="filter-title">{{
              category.name
            }}</ion-card-title>

            <div v-if="category.active" class="blub-form"></div>
          </div>
        </Slide>
        <!-- <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
          <Pagination v-if="slidesCount > 1" />
        </template> -->
      </Carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";

export default {
  name: "GameListComponent",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      settings: {
        itemsToShow: 4,
        snapAlign: "center",
      },
      categories: [
        { name: "ALL", active: true },
        { name: "FPS", active: false },
        { name: "RPG", active: false },
        { name: "SANDBOX", active: false },
      ],
      games: [
        {
          title: "Survival Island",
          thumbnailType: "large",
          category: ["FPS"],
          image: "@/ressources/games/gameImage1",
        },
        {
          title: "Wifa 2028",
          thumbnailType: "medium",
          category: ["RPG"],
          image: "@/ressources/games/gameImage1",
        },
        {
          title: "Beach Run",
          thumbnailType: "small",
          category: ["FPS", "SANDBOX"],
          image: "@/ressources/games/gameImage1",
        },
        {
          title: "Lost Mario",
          thumbnailType: "square",
          category: ["RPG", "SANDBOX"],
          image: "@/ressources/games/gameImage1",
        },
        {
          title: "Simulator",
          thumbnailType: "large",
          category: ["SANDBOX"],
          image: "@/ressources/games/gameImage1",
        },
      ],
    };
  },
  methods: {
    activateCategory(index) {
      // First deactivate all categories
      this.categories.forEach((category) => {
        category.active = false;
      });

      // Then activate the clicked category
      this.categories[index].active = true;
    },
  },
};
</script>

<style scoped>
.blub-form {
  /* border-radius: 1rem 2rem 3rem 4rem; */
  border-radius: 57% 43% 54% 46% / 50% 23% 77% 50%;
  position: absolute;
  bottom: 30%;
  z-index: -10;
  width: 40px;
  height: 32px;
  background-color: #d3fe57;
}
.filter-title {
  font-size: 20px;
}
/* styles */
</style>
