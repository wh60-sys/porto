import { defineStore } from "pinia";
import { Howl } from "howler";
import { ref, computed } from "vue";
import { tracks } from "@/data/portfolio";

export const useMusicStore = defineStore("music", () => {
  const isPlaying = ref(false);
  const isReady = ref(false);
  const currentIndex = ref(0);
  const volume = ref(0.4);
  const error = ref<string | null>(null);

  let howl: Howl | null = null;

  const currentTrack = computed(() => tracks[currentIndex.value]);

  function ensureHowl() {
    if (howl) return howl;
    if (!currentTrack.value) return null;

    howl = new Howl({
      src: [currentTrack.value.src],
      loop: true,
      volume: volume.value,
      html5: true,
      onload: () => {
        isReady.value = true;
        error.value = null;
      },
      onloaderror: (_id, err) => {
        error.value = String(err);
        isReady.value = false;
      },
      onplayerror: (_id, err) => {
        error.value = String(err);
      },
      onend: () => {
        isPlaying.value = false;
      },
    });
    return howl;
  }

  function play() {
    const h = ensureHowl();
    if (!h) return;
    h.volume(volume.value);
    h.play();
    isPlaying.value = true;
  }

  function pause() {
    if (howl) {
      howl.pause();
    }
    isPlaying.value = false;
  }

  function toggle() {
    if (isPlaying.value) pause();
    else play();
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v));
    if (howl) howl.volume(volume.value);
  }

  return {
    isPlaying,
    isReady,
    volume,
    error,
    currentTrack,
    play,
    pause,
    toggle,
    setVolume,
  };
});
