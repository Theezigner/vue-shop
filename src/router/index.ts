import { createRouter, createWebHistory,  } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
  { path: "/shop", name: "shop", component: () => import("@/pages/Shop.vue") },
  { path: "/product/:slug", name: "product", component: () => import("@/pages/ProductDetail.vue") },
  { path: "/cart", name: "cart", component: () => import("@/pages/Cart.vue") },
  { path: "/checkout", name: "checkout", component: () => import("@/pages/Checkout.vue") },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("@/pages/NotFound.vue") },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
   
    return { top: 0 };
  },
});