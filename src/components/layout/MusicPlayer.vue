<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMusicStore } from "@/stores/musicStore";
import Icon from "@/components/ui/Icon.vue";

const music = useMusicStore();
const expanded = ref(false);

onMounted(() => {
  // Auto-play attempt: most browsers will block autoplay without interaction.
  // We attempt and silently ignore failures; user can press the button.
  setTimeout(() => {
    try {
      music.play();
    } catch {
      /* ignore autoplay restrictions */
    }
  }, 600);
});
</script>

<template>
  <div
    class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    aria-live="polite"
  >
    <transition name="track">
      <div
        v-if="expanded"
        class="w-72 rounded-card glass p-4 shadow-glow"
      >
        <div class="flex items-center gap-3">
          <div
            class="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-unsia-500"
            :class="music.isPlaying ? 'animate-spin' : ''"
            style="animation-duration: 6s"
          >
            <Icon name="music" :size="20" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {{ music.isPlaying ? "Sedang memutar" : "Ambient Music" }}
            </p>
            <p class="truncate font-display text-sm font-semibold">
              {{ music.currentTrack?.title ?? "—" }}
            </p>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            :aria-label="music.isPlaying ? 'Jeda musik' : 'Putar musik'"
            @click="music.toggle()"
          >
            <Icon :name="music.isPlaying ? 'pause' : 'play'" :size="16" />
          </button>
          <Icon name="volume" :size="16" class="text-white/60" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="music.volume"
            class="flex-1 accent-gold"
            aria-label="Volume"
            @input="(e) => music.setVolume(Number((e.target as HTMLInputElement).value))"
          />
        </div>
        <p
          v-if="music.error"
          class="mt-3 text-[11px] text-white/55"
        >
          File audio belum tersedia. Tambahkan
          <code class="text-gold">public/audio/ambient.mp3</code> untuk
          mengaktifkan ambient music.
        </p>
      </div>
    </transition>

    <button
      type="button"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-unsia-400 to-unsia-700 text-white shadow-glow transition-all duration-500 ease-smooth hover:scale-110"
      :aria-label="expanded ? 'Tutup pemutar musik' : 'Buka pemutar musik'"
      @click="expanded = !expanded"
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

<style scoped>
.track-enter-active,
.track-leave-active {
  transition:
    opacity 300ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
}
.track-enter-from,
.track-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
</style>
