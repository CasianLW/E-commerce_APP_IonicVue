import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAuthStore } from "@/stores/auth.js";

const routes = [
  {
    path: "/homepage",
    name: "Home",
    component: () => import("@/views/Homepage.vue"),
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: () => import("@/views/Subscriptions.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
  },
  {
    path: "/mentions-legales",
    name: "MentionsLegales",
    component: () => import("@/views/MentionsLegales.vue"),
  },
  {
    path: "/cgv",
    name: "CGV",
    component: () => import("@/views/CGV.vue"),
  },
  {
    path: "/politique-confidentialite",
    name: "PolitiqueConfidentialite",
    component: () => import("@/views/PolitiqueConfidentialite.vue"),
  },
  {
    path: "/offer",
    name: "Offer",
    component: () => import("@/views/Offer.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
  },
  {
    path: "/news/all",
    name: "NewsAll",
    component: () => import("@/views/NewsAll.vue"),
  },
  {
    path: "/news/:id",
    name: "Article",
    component: () => import("@/views/Article.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/forgot-password/:token",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword.vue"),
  },
  {
    path: "/checkout/success",
    name: "CheckoutSuccess",
    component: () => import("@/views/checkout/CheckoutSuccess.vue"),
  },
  {
    path: "/checkout/failed",
    name: "CheckoutFail",
    component: () => import("@/views/checkout/CheckoutFail.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/homepage",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.loggedIn) {
    return next({
      path: "/login",
    });
  }

  if (to.meta.requiresGuest && authStore.loggedIn) {
    return next({
      path: "/homepage",
    });
  }

  next();
});

export default router;
