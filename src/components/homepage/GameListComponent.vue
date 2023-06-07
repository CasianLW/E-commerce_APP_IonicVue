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
    <div class="game-list-section section">
      <div class="games-wrapper">
        <div v-for="(game, index) in games" :key="index" class="game-item">
          <div
            :style="{
              backgroundImage: 'url(' + game.image + ')',
              backgroundSize: 'cover',
              width:
                '100%' /* Modification pour s'adapter à la largeur de la colonne */,
              height:
                game.thumbnailType == 'square'
                  ? '168px'
                  : game.thumbnailType == 'small'
                  ? '120px'
                  : game.thumbnailType == 'medium'
                  ? '180px'
                  : game.thumbnailType == 'large'
                  ? '240px'
                  : 'auto',
            }"
          ></div>
          <p class="game-list-title">{{ game.title }}</p>
        </div>
      </div>
      <div class="voir-plus-part">
        <router-link class="voir-plus-btn" to="/voirplus">
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";
import gameImage1 from "@/ressources/games/gameImage1.jpg";
import gameImage2 from "@/ressources/games/gameImage2.jpg";
import gameImage3 from "@/ressources/games/gameImage3.jpg";
import gameImage4 from "@/ressources/games/gameImage4.jpg";
import gameImage5 from "@/ressources/games/gameImage5.jpg";

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
          image: gameImage1,
        },
        {
          title: "Wifa 2028",
          thumbnailType: "medium",
          category: ["RPG"],
          image: gameImage2,
        },
        {
          title: "Beach Run",
          thumbnailType: "small",
          category: ["FPS", "SANDBOX"],
          image: gameImage3,
        },
        {
          title: "Lost Mario",
          thumbnailType: "square",
          category: ["RPG", "SANDBOX"],
          image: gameImage4,
        },
        {
          title: "Simulator",
          thumbnailType: "large",
          category: ["SANDBOX"],
          image: gameImage5,
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
  bottom: 20%;
  z-index: -10;
  width: 40px;
  height: 32px;
  background-color: #d3fe57;
}
.filter-title {
  font-size: 20px;
}
.games-wrapper {
  column-count: 2; /* Nombre de colonnes */
  column-gap: 15px; /* Espace entre les colonnes */
}
.game-item {
  margin-bottom: 15px;
  position: relative; /* Ajouté pour positionner le titre par rapport à cet élément */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  break-inside: avoid;
}

.game-list-title {
  position: absolute; /* Positionnement absolu pour superposer l'image */
  padding: 8px 20px;
  background-color: black;
  font-size: 14px;
  width: fit-content;
  border-radius: 99px;
  color: #d3fe57;
  text-align: center;
  z-index: 1; /* S'assurer que le titre est au-dessus de l'image */
  bottom: 0;
}

/* Le conteneur d'image doit être relatif pour positionner le titre par rapport à lui */
.game-item > div {
  border-radius: 25px;
  position: relative;
  width: 100%;
  z-index: 0; /* S'assurer que l'image est sous le titre */
}
.game-list-section {
  position: relative;
  max-height: 460px;
  overflow: hidden;
  /* margin-bottom: -2px; */
}
.voir-plus-part {
  width: 90vw;
  background: linear-gradient(180deg, rgba(30, 30, 30, 0) 0%, #7458ea 100%);
  height: 100px;
  display: flex;
  position: absolute;
  z-index: 50;
  bottom: 0;
}
.voir-plus-btn {
  margin-top: 44px;
  background-color: #d3fe57;
  color: black;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 99px;
  font-weight: 800;
  margin: auto;
  /* text-decoration: none; */
}

/* styles */
</style>
