<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";

interface Props {
  open: boolean;
  title?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: "close"): void }>();

function handleKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.open) emit("close");
}

onMounted(() => window.addEventListener("keydown", handleKey));
onBeforeUnmount(() => window.removeEventListener("keydown", handleKey));

watch(
  () => props.open,
  (open) => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
  },
);
</script>

<template>
  <transition name="modal">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-md"
        @click="emit('close')"
      />
      <div
        class="relative z-10 w-full max-w-5xl overflow-hidden rounded-card glass shadow-glow"
      >
        <button
          type="button"
          class="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 transition hover:bg-black/70"
          aria-label="Tutup"
          @click="emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <slot />
        <div v-if="title" class="px-6 pb-6 pt-4">
          <h3 class="font-display text-2xl font-bold">{{ title }}</h3>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active > .relative,
.modal-leave-active > .relative {
  transition:
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from > .relative,
.modal-leave-to > .relative {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
