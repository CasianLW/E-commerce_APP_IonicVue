<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/homepage"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Politique de Confidentialité</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main class="ion-margin-horizontal">
        <h1>Politique de Confidentialité</h1>
        <p>
          Bienvenue dans la Politique de Confidentialité de Gamoshi. Chez
          Gamoshi, nous accordons une grande importance à la protection de vos
          informations personnelles et à votre vie privée. Cette politique
          explique comment nous collectons, utilisons et protégeons vos données
          personnelles lorsque vous utilisez nos services.
        </p>

        <h2>1. Collecte des Informations</h2>
        <p>
          Lorsque vous utilisez notre site web ou nos services, nous pouvons
          collecter des informations personnelles telles que votre nom, votre
          adresse e-mail, votre adresse de livraison, etc. Nous collectons ces
          informations de différentes manières, notamment lorsque vous créez un
          compte, passez une commande ou vous abonnez à notre newsletter.
        </p>

        <h2>2. Utilisation des Informations</h2>
        <p>
          Nous utilisons les informations personnelles que nous collectons pour
          fournir et améliorer nos services, traiter vos commandes,
          personnaliser votre expérience utilisateur, vous contacter au sujet de
          votre compte ou de vos commandes, vous envoyer des newsletters et des
          offres promotionnelles, etc. Nous ne partagerons jamais vos
          informations personnelles avec des tiers sans votre consentement, sauf
          dans les cas prévus par la loi.
        </p>

        <h2>3. Protection des Informations</h2>
        <p>
          Nous prenons des mesures de sécurité appropriées pour protéger vos
          informations personnelles contre tout accès non autorisé, perte,
          divulgation ou destruction. Cependant, veuillez noter qu'aucune
          méthode de transmission sur Internet ou de stockage électronique n'est
          totalement sécurisée. Nous ne pouvons donc pas garantir une sécurité
          absolue de vos informations.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Notre site web utilise des cookies pour améliorer votre expérience
          utilisateur, analyser les tendances, administrer le site, etc. Les
          cookies sont de petits fichiers texte stockés sur votre appareil
          lorsque vous visitez notre site. Vous pouvez configurer votre
          navigateur pour refuser les cookies ou vous alerter lorsque des
          cookies sont envoyés. Veuillez noter que certaines fonctionnalités de
          notre site peuvent ne pas fonctionner correctement si les cookies sont
          désactivés.
        </p>

        <h2>5. Liens Vers des Sites Tiers</h2>
        <p>
          Notre site web peut contenir des liens vers des sites web tiers. Nous
          ne sommes pas responsables des pratiques de confidentialité de ces
          sites. Nous vous encourageons à lire les politiques de confidentialité
          de ces sites avant de fournir vos informations personnelles.
        </p>

        <h2>6. Modification de la Politique de Confidentialité</h2>
        <p>
          Nous nous réservons le droit de modifier cette Politique de
          Confidentialité à tout moment. Toute modification prendra effet dès sa
          publication sur notre site web. Il est de votre responsabilité de
          consulter régulièrement notre Politique de Confidentialité mise à
          jour.
        </p>

        <h2>7. Contact</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant notre
          Politique de Confidentialité, veuillez nous contacter à la page
          suivante:
        </p>
        <ion-button expand="full" shape="round" routerLink="/contact">
          Contact
        </ion-button>
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
export default {
  name: "PolitiqueConfidentialité",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonButton,
  },
};
</script>
