<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import MusicPlayer from "@/components/layout/MusicPlayer.vue";
import WhatsAppFab from "@/components/layout/WhatsAppFab.vue";
import { useThemeStore } from "@/stores/themeStore";

const theme = useThemeStore();

onMounted(() => {
  // Apply on mount to ensure body class is correct.
  theme.set(theme.theme);
});
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade-page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
    <MusicPlayer />
    <WhatsAppFab />
  </div>
</template>

<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
