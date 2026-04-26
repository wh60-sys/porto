<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { student } from "@/data/portfolio";
import Badge from "@/components/ui/Badge.vue";
import Icon from "@/components/ui/Icon.vue";

const heroRoot = ref<HTMLElement | null>(null);
const heroImage = ref<HTMLElement | null>(null);
const eyebrow = ref<HTMLElement | null>(null);
const heading = ref<HTMLElement | null>(null);
const subtitle = ref<HTMLElement | null>(null);
const ctaWrap = ref<HTMLElement | null>(null);
const badgeWrap = ref<HTMLElement | null>(null);

onMounted(() => {
  const { gsap, parallax } = useScrollAnimation();

  // Initial reveal
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (badgeWrap.value)
    tl.from(badgeWrap.value, { y: 18, opacity: 0, duration: 0.7 });

  if (eyebrow.value)
    tl.from(eyebrow.value, { y: 18, opacity: 0, duration: 0.7 }, "-=0.4");

  if (heading.value) {
    const chars = heading.value.querySelectorAll("[data-char]");
    tl.from(
      chars,
      {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.025,
        ease: "expo.out",
      },
      "-=0.5",
    );
  }

  if (subtitle.value)
    tl.from(subtitle.value, { y: 18, opacity: 0, duration: 0.6 }, "-=0.4");

  if (ctaWrap.value) {
    const buttons = ctaWrap.value.querySelectorAll("[data-cta]");
    tl.from(
      buttons,
      { y: 24, opacity: 0, duration: 0.6, stagger: 0.12 },
      "-=0.3",
    );
  }

  // Parallax on hero image
  if (heroImage.value) {
    parallax(heroImage.value, { yPercent: 22, trigger: heroRoot.value! });
  }
});

const fullName = `${student.name}`;
const chars = fullName.split("");
</script>

<template>
  <section
    id="beranda"
    ref="heroRoot"
    class="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24"
  >
    <!-- Background image -->
    <div
      ref="heroImage"
      class="absolute inset-0 -z-20 will-change-transform"
      aria-hidden="true"
    >
      <img
        :src="student.photoUrl"
        alt=""
        class="h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />
    </div>

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 -z-10"
      style="background: linear-gradient(135deg, rgba(0,87,168,0.85), rgba(0,26,58,0.92)); "
      aria-hidden="true"
    />
    <!-- Vignette + grain -->
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      style="background: radial-gradient(1000px 600px at 80% 0%, rgba(200,150,10,0.18), transparent 60%);"
      aria-hidden="true"
    />

    <div class="container-x relative grid w-full gap-10 pb-24 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-8">
        <div ref="badgeWrap" class="mb-6">
          <Badge variant="gold" :pulse="true">
            Mahasiswa Aktif UNSIA
          </Badge>
        </div>

        <p
          ref="eyebrow"
          class="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/70"
        >
          <span class="h-px w-10 bg-gold/70" />
          student
        </p>

        <h1
          ref="heading"
          class="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span
            v-for="(c, i) in chars"
            :key="i"
            data-char
            class="inline-block"
            :class="c === ' ' ? 'w-3' : ''"
            >{{ c === " " ? "\u00A0" : c }}</span
          >
        </h1>

        <p
          ref="subtitle"
          class="mt-6 max-w-2xl font-display text-lg text-white/80 sm:text-xl"
        >
          {{ student.program }} ·
          <span class="text-gold">{{ student.cohort }}</span>
          <br />
          <span class="text-white/65 text-base">
            Membangun karya digital sambil menempuh studi online di
            <a
              href="https://unsia.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white underline-offset-4 hover:underline"
              >Universitas Siber Asia</a
            >.
          </span>
        </p>

        <div
          ref="ctaWrap"
          class="mt-10 flex flex-wrap items-center gap-4"
        >
          <a data-cta href="#tentang" class="btn-primary">
            Tentang Saya
            <Icon name="arrow-down" :size="16" />
          </a>
          <a
            data-cta
            href="https://pmb.unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold"
          >
            Daftar ke UNSIA
            <Icon name="arrow-right" :size="16" />
          </a>
          <a data-cta href="#tentang" class="btn-ghost">
            Tentang Saya
          </a>
        </div>

      </div>

      <!-- Floating accreditation card -->
      <div class="hidden lg:col-span-4 lg:block">
        <div class="relative ml-auto max-w-sm animate-float">
          <div
            class="rounded-card glass p-6 shadow-glow"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"
              >
                <Icon name="shield" :size="20" />
              </span>
              <div>
                <p class="font-display text-sm font-bold">Akreditasi Resmi</p>
                <p class="text-xs uppercase tracking-widest text-white/55">
                  BAN-PT · EAHEA
                </p>
              </div>
            </div>
            <div class="mt-5 grid grid-cols-2 gap-3">
              <a
                href="https://unsia.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-btn border border-white/15 bg-white/5 p-3 text-center transition hover:border-gold/40 hover:bg-gold/5"
              >
                <p class="font-display text-lg font-bold text-gold">BAN-PT</p>
                <p class="text-[10px] uppercase tracking-widest text-white/55">
                  Nasional
                </p>
              </a>
              <a
                href="https://unsia.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-btn border border-white/15 bg-white/5 p-3 text-center transition hover:border-gold/40 hover:bg-gold/5"
              >
                <p class="font-display text-lg font-bold text-gold">EAHEA</p>
                <p class="text-[10px] uppercase tracking-widest text-white/55">
                  Internasional
                </p>
              </a>
            </div>
            <p
              class="mt-5 rounded-btn bg-gold/10 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-gold"
            >
              Kampus Online Pertama & Terbaik
            </p>
          </div>
          <div
            class="absolute -inset-3 -z-10 rounded-[20px] bg-gradient-to-br from-unsia-500/30 to-gold/30 blur-2xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#tentang"
      class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition hover:text-white"
      aria-label="Scroll ke bawah"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span class="block h-8 w-[2px] origin-top animate-pulse-slow bg-gradient-to-b from-gold to-transparent" />
      </div>
    </a>
  </section>
</template>
