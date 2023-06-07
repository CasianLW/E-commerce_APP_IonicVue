<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Game List</ion-card-title>
    </ion-card-header>

    <ion-card-content> </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";

export default {
  name: "GameListComponent",
  data() {
    return {
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
};
</script>

<style scoped>
/* styles */
</style>
