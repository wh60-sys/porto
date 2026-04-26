<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMusicStore } from "@/stores/musicStore";
import Icon from "@/components/ui/Icon.vue";

const music = useMusicStore();
const buttonDiameter = 56; // ubah nilai ini untuk mengatur diameter tombol musik

onMounted(() => {
  // Auto-play only in development; production requires user interaction.
  if (import.meta.env.DEV) {
    setTimeout(() => {
      try {
        music.play();
      } catch {
        /* ignore autoplay restrictions */
      }
    }, 600);
  }
});
</script>

<template>
  <div
    class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    aria-live="polite"
  >
    <button
      type="button"
      class="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-unsia-400 to-unsia-700 text-white shadow-glow transition-all duration-500 ease-smooth hover:scale-110"
      :style="{ width: `${buttonDiameter}px`, height: `${buttonDiameter}px` }"
      :aria-label="music.isPlaying ? 'Jeda musik' : 'Putar musik'"
      @click="music.toggle()"
    >
      <span
        class="absolute inset-0 rounded-full"
        :class="music.isPlaying ? 'animate-ping bg-unsia-400/50' : ''"
        aria-hidden="true"
      />
      <span
        class="absolute inset-0 rounded-full ring-2 ring-gold/40 animate-pulse-slow"
        aria-hidden="true"
      />
      <Icon
        :name="music.isPlaying ? 'pause' : 'music'"
        :size="22"
        class="relative z-10"
      />
    </button>
  </div>
</template>
