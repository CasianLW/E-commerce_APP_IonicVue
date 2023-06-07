<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button @click="redirectToCheckout">Checkout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
const { createCheckoutSession } = useAuthStore();

export default {
  methods: {
    async redirectToCheckout() {
      const stripe = await loadStripe(process.env.VITE_APP_STRIPE_PUBLIC_KEY);

      // Make a request to your backend and get the session ID
      const sessionId = await this.getSessionIdFromYourBackend();

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.log(error);
      }
    },

    async handleCheckout() {
      try {
        const sessionId = await createCheckoutSession();
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
  },
};
</script>
