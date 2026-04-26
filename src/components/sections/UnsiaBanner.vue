<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { unsiaCards } from "@/data/portfolio";
import { useReferralModal } from "@/composables/useReferralModal";
import Card from "@/components/ui/Card.vue";
import Icon from "@/components/ui/Icon.vue";

const root = ref<HTMLElement | null>(null);
const referralModal = useReferralModal();

onMounted(() => {
  const { fadeUp } = useScrollAnimation();
  if (root.value) {
    root.value
      .querySelectorAll("[data-reveal]")
      .forEach((el) => fadeUp(el));
  }
});
</script>

<template>
  <section
    id="unsia"
    ref="root"
    class="relative py-16 sm:py-20"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 -z-10"
      style="background: radial-gradient(900px 500px at 50% 0%, rgba(0,87,168,0.4), transparent 60%);"
      aria-hidden="true"
    />
    <div class="container-x">
      <div class="mx-auto max-w-3xl text-center">
        <div data-reveal class="section-label mx-auto">
          Bergabung dengan UNSIA
        </div>
        <h2
          data-reveal
          class="mt-3 font-display text-3xl font-bold sm:text-5xl"
        >
          Wujudkan kuliah online berkualitas di
          <span class="text-gradient-gold">Universitas Siber Asia</span>
        </h2>
        <p data-reveal class="mt-3 text-base text-white/75 sm:text-lg">
          Kampus Online Pertama & Terbaik Indonesia. Terakreditasi BAN-PT
          dan EAHEA Internasional. Belajar dari mana saja, kapan saja.
        </p>

        <div
          data-reveal
          class="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://pmb.unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold"
          >
            <Icon name="rocket" :size="16" />
            Daftar PMB Sekarang
          </a>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-btn border border-gold/45 bg-gold/10 px-5 py-2.5 font-display text-sm font-bold text-gold transition hover:bg-gold/20"
            @click="referralModal.open()"
          >
            <Icon name="sparkles" :size="16" />
            Pakai Kode Referal Saya
          </button>
          <a
            href="https://unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          >
            Kunjungi UNSIA.ac.id
            <Icon name="arrow-right" :size="16" />
          </a>
        </div>
      </div>

      <!-- Cards -->
      <div class="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="c in unsiaCards"
          :key="c.url"
          :href="c.url"
          target="_blank"
          :accent="c.accent === 'gold' ? 'gold' : 'blue'"
          data-card
        >
          <div class="min-w-0">
            <h3 class="font-display text-base font-bold leading-tight">
              {{ c.title }}
            </h3>
            <p class="mt-3 text-sm leading-snug text-white/65">{{ c.description }}</p>
            <span
              class="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold/90"
            >
              Buka
              <Icon name="arrow-right" :size="14" />
            </span>
          </div>
        </Card>
      </div>

      <!-- Accreditation strip -->
      <div
        data-reveal
        class="mt-8 grid gap-5 rounded-card glass p-5 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-4"
      >
        <div class="lg:col-span-5">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
            Akreditasi Resmi
          </p>
          <h3 class="mt-1.5 font-display text-xl font-bold sm:text-2xl">
            Diakui Nasional & Internasional
          </h3>
          <p class="mt-1.5 text-sm leading-snug text-white/70">
            Universitas Siber Asia terakreditasi BAN-PT (Indonesia) dan EAHEA
            (Eropa) — pengakuan kualitas pendidikan tinggi yang setara global.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3 lg:col-span-4">
          <a
            href="https://unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-card border border-gold/30 bg-gold/10 p-3 text-center transition hover:bg-gold/20"
          >
            <p class="font-display text-xl font-extrabold text-gold sm:text-2xl">
              BAN-PT
            </p>
            <p class="mt-0.5 text-[10px] uppercase tracking-widest text-white/65">
              Akreditasi Nasional
            </p>
          </a>
          <a
            href="https://unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-card border border-unsia-300/30 bg-unsia-500/10 p-3 text-center transition hover:bg-unsia-500/20"
          >
            <p class="font-display text-xl font-extrabold text-unsia-200 sm:text-2xl">
              EAHEA
            </p>
            <p class="mt-0.5 text-[10px] uppercase tracking-widest text-white/65">
              Akreditasi Internasional
            </p>
          </a>
        </div>
        <div class="lg:col-span-3">
          <div
            class="rounded-card bg-gradient-to-br from-gold/30 via-gold/10 to-transparent p-3 text-center"
          >
            <p
              class="font-display text-xs font-bold uppercase tracking-widest text-gold"
            >
              Kampus Online
            </p>
            <p class="font-display text-base font-extrabold leading-tight sm:text-lg">
              Pertama & Terbaik
            </p>
            <p class="text-[11px] text-white/65">di Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
