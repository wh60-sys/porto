import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const base = import.meta.env.BASE_URL || "/";

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80,
      };
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
