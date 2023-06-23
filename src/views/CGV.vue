<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title class="ion-text-center ion-align-items-center"
            >Conditions Générales de Vente (CGV)</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <main class="ion-margin-horizontal">
        <h1>CGV</h1>
        <p>
          Bienvenue sur les Conditions Générales de Vente (CGV) de Gamoshi,
          votre partenaire de confiance pour la vente de jeux en ligne et
          d'abonnements pass.
        </p>

        <p>
          Veuillez lire attentivement les CGV suivantes avant d'utiliser nos
          services. En accédant à notre site web ou en passant une commande,
          vous acceptez ces conditions et vous vous engagez à les respecter.
        </p>

        <h2>1. Commandes</h2>
        <p>
          Nous nous réservons le droit d'accepter ou de refuser toute commande
          passée sur notre site web. Une fois votre commande passée, vous
          recevrez une confirmation de notre part. Veuillez vérifier
          attentivement les détails de votre commande dans la confirmation et
          nous contacter immédiatement en cas d'erreur.
        </p>

        <h2>2. Prix et Paiement</h2>
        <p>
          Les prix indiqués sur notre site web sont en euros et incluent toutes
          les taxes applicables. Le paiement doit être effectué au moment de la
          commande. Nous acceptons les modes de paiement suivants : carte de
          crédit, virement bancaire, etc. Veuillez noter que nous ne serons pas
          responsables des frais bancaires ou des autres frais liés à votre
          paiement.
        </p>

        <h2>3. Livraison</h2>
        <p>
          Les délais de livraison peuvent varier en fonction de votre
          emplacement et du produit commandé. Nous mettrons tout en œuvre pour
          respecter les délais de livraison indiqués, mais nous ne pouvons
          garantir une livraison exacte à une date donnée. Veuillez consulter
          notre politique de livraison pour plus d'informations.
        </p>

        <h2>4. Droit de Rétractation</h2>
        <p>
          Conformément à la législation en vigueur, vous disposez d'un délai de
          rétractation de 14 jours à compter de la réception de votre commande
          pour exercer votre droit de rétractation. Veuillez consulter notre
          politique de retour pour plus d'informations sur les conditions de
          retour et de remboursement.
        </p>

        <h2>5. Propriété Intellectuelle</h2>
        <p>
          Tous les droits de propriété intellectuelle liés aux produits et
          contenus proposés sur notre site web sont réservés. Vous ne pouvez pas
          copier, reproduire, distribuer ou utiliser ces éléments sans notre
          autorisation préalable écrite.
        </p>

        <h2>6. Limitation de Responsabilité</h2>
        <p>
          Nous nous efforçons de fournir des produits et des services de haute
          qualité, mais nous ne pouvons garantir l'absence d'erreurs ou
          d'interruptions. En aucun cas, nous ne serons responsables des
          dommages directs, indirects, spéciaux, accessoires ou consécutifs
          découlant de l'utilisation de nos produits ou services.
        </p>

        <h2>7. Modification des CGV</h2>
        <p>
          Nous nous réservons le droit de modifier ces Conditions Générales de
          Vente à tout moment. Toute modification prendra effet dès sa
          publication sur notre site web. Il est de votre responsabilité de
          consulter régulièrement les CGV mises à jour.
        </p>

        <h2>8. Contact</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant nos CGV,
          veuillez nous contacter via la page suivante:
          <ion-button expand="full" shape="round" routerLink="/contact">
            Contact
          </ion-button>
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
  IonButton,
} from "@ionic/vue";
export default {
  name: "CGV",
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
