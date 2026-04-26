import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";

// Handle GitHub Pages SPA redirect
if (typeof window !== 'undefined' && window.location.search.includes('?/')) {
  const path = window.location.search.slice(2).replace(/~and~/g, '&');
  window.history.replaceState(null, '', path);
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
