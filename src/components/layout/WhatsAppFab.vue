<script setup lang="ts">
import { computed } from "vue";
import { student } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const message = encodeURIComponent(
  "Halo! Saya tertarik bertanya soal kuliah online di Universitas Siber Asia (UNSIA).",
);

const whatsappUrl = computed(
  () => `https://wa.me/${student.whatsapp}?text=${message}`,
);
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-24 right-6 z-30 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-display font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-500 ease-smooth hover:scale-105 hover:bg-emerald-400 sm:bottom-6 sm:right-24"
    aria-label="Tanya soal kuliah di UNSIA via WhatsApp"
  >
    <span
      class="absolute inset-0 -z-10 rounded-full bg-emerald-400/40 animate-ping"
      aria-hidden="true"
    />
    <Icon name="whatsapp" :size="20" />
    <span class="hidden sm:inline">Tanya soal UNSIA</span>
  </a>
</template>
