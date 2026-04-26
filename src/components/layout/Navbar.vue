<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useThemeStore } from "@/stores/themeStore";
import { useReferralModal } from "@/composables/useReferralModal";
import { student } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const themeStore = useThemeStore();
const referralModal = useReferralModal();
const scrolled = ref(false);
const mobileOpen = ref(false);

function openReferral() {
  mobileOpen.value = false;
  referralModal.open();
}

const links = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#unsia", label: "UNSIA" },
  { href: "#kontak", label: "Kontak" },
];

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

function jumpTo(href: string) {
  mobileOpen.value = false;
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth"
    :class="
      scrolled
        ? 'backdrop-blur-xl bg-night/70 border-b border-white/10 supports-[backdrop-filter]:bg-night/60'
        : 'bg-transparent'
    "
  >
    <div class="container-x flex h-16 items-center justify-between gap-4">
      <a
        href="#beranda"
        class="group flex items-center gap-3"
        @click.prevent="jumpTo('#beranda')"
      >
        <div class="relative">
          <img
            src="/profil.jpeg"
            alt="Profil"
            class="h-12 w-12 rounded-full object-cover shadow-glow"
          />
          <span
            class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold animate-pulse-slow"
          />
        </div>
        <div class="hidden flex-col leading-tight sm:flex">
          <span class="font-display text-sm font-bold tracking-tight">
            {{ student.name }}
          </span>
          <span class="text-[11px] uppercase tracking-[0.2em] text-white/50">
            
          </span>
        </div>
      </a>

      <nav class="hidden items-center gap-1 lg:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-btn px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          @click.prevent="jumpTo(link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          :aria-label="themeStore.theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
          @click="themeStore.toggle()"
        >
          <Icon :name="themeStore.theme === 'dark' ? 'sun' : 'moon'" :size="18" />
        </button>

        <button
          type="button"
          class="hidden items-center gap-1.5 rounded-btn border border-gold/40 bg-gold/10 px-3 py-2 text-xs font-display font-bold uppercase tracking-widest text-gold transition hover:bg-gold/20 lg:inline-flex"
          @click="openReferral"
        >
          <Icon name="sparkles" :size="13" />
          Kode Referal
        </button>

        <a
          href="https://pmb.unsia.ac.id/"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden btn-primary lg:inline-flex"
        >
          Daftar UNSIA
          <Icon name="arrow-right" :size="16" />
        </a>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 lg:hidden"
          aria-label="Buka menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <transition name="mobile">
      <div v-if="mobileOpen" class="lg:hidden">
        <div
          class="container-x flex flex-col gap-1 border-t border-white/10 bg-night/90 px-5 py-4 backdrop-blur-xl"
        >
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-btn px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/5"
            @click.prevent="jumpTo(link.href)"
          >
            {{ link.label }}
          </a>
          <button
            type="button"
            class="mt-2 inline-flex items-center justify-center gap-1.5 rounded-btn border border-gold/40 bg-gold/10 px-4 py-3 text-xs font-display font-bold uppercase tracking-widest text-gold transition hover:bg-gold/20"
            @click="openReferral"
          >
            <Icon name="sparkles" :size="14" />
            Kode Referal
          </button>
          <a
            href="https://pmb.unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary mt-1 justify-center"
          >
            Daftar ke UNSIA
            <Icon name="arrow-right" :size="16" />
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.mobile-enter-active,
.mobile-leave-active {
  transition:
    max-height 350ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 250ms ease;
  overflow: hidden;
  max-height: 600px;
}
.mobile-enter-from,
.mobile-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
