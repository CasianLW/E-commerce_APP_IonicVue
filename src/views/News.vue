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
              <div class="active-element"></div>
              <div class="active-text">Tendances</div>
              <div>Récents</div>
            </div>
          </div>
        </div>
        <div></div>
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
export default {
  name: "News",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
  data() {
    return {
      activeChoice: "Tendances", // This will hold the current active choice
    };
  },
  methods: {
    setActiveChoice(choice) {
      this.activeChoice = choice;
    },
  },
};
</script>

<style scoped>
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
  transform: translateX(4px);
  z-index: 0;
  width: 45% !important;
  height: 36px;
  background-color: #d3fe57;
  border-radius: 25px;
}
.active-text {
  color: #000000;
}
</style>
