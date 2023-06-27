<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Mentions Légales</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main class="ion-margin-horizontal">
        <h1>Mentions Légales</h1>
        <p>
          Bienvenue dans les Mentions Légales de Gamoshi. Veuillez lire
          attentivement les informations suivantes concernant l'utilisation de
          notre site web.
        </p>

        <h2>1. Editeur du Site</h2>
        <p>Le site web est édité par GAMOSHI.</p>
        <p>Siège social : 14 rue des Jeux, GTA San Andreas</p>
        <p>Numéro de téléphone : 01 02 03 04 05</p>
        <p>Adresse e-mail : contact@gamoshi.com</p>

        <h2>2. Hébergement</h2>
        <p>Le site web est hébergé par Netlify.</p>
        <p>Adresse : 325 3RD STREET,SUITE 215, SAN FRANCISCO, CA 94107 (USA)</p>

        <h2>3. Propriété Intellectuelle</h2>
        <p>
          Tous les droits de propriété intellectuelle relatifs au site web et à
          son contenu sont réservés. Toute reproduction, représentation,
          modification, distribution ou exploitation du contenu du site web sans
          autorisation préalable écrite est strictement interdite.
        </p>

        <h2>4. Liens Externes</h2>
        <p>
          Notre site web peut contenir des liens vers des sites web tiers. Nous
          ne sommes pas responsables du contenu ou de la disponibilité de ces
          sites. L'activation de ces liens se fait sous votre propre
          responsabilité.
        </p>

        <h2>5. Responsabilité</h2>
        <p>
          Nous nous efforçons de maintenir notre site web à jour et accessible,
          mais nous ne pouvons garantir son fonctionnement continu et sans
          erreur. Nous ne serons pas responsables des dommages directs ou
          indirects découlant de l'utilisation de notre site web.
        </p>

        <h2>6. Protection des Données Personnelles</h2>
        <p>
          Pour plus d'informations sur la collecte et le traitement des données
          personnelles, veuillez consulter notre Politique de Confidentialité.
        </p>

        <h2>7. Loi Applicable et Juridiction</h2>
        <p>
          Les présentes Mentions Légales sont régies par la loi française. Tout
          litige découlant de l'utilisation de notre site web sera soumis à la
          juridiction exclusive des tribunaux compétents en France.
        </p>
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
  name: "MentionsLegales",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
  },
};
</script>
