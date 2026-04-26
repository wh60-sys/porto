<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { timeline } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const root = ref<HTMLElement | null>(null);
const line = ref<SVGPathElement | null>(null);

onMounted(() => {
  const { fadeUp, gsap, ScrollTrigger } = useScrollAnimation();
  if (root.value) {
    root.value
      .querySelectorAll("[data-reveal]")
      .forEach((el) => fadeUp(el));

    const items = root.value.querySelectorAll("[data-event]");
    items.forEach((item, i) => {
      gsap.from(item, {
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    if (line.value) {
      const length = line.value.getTotalLength();
      gsap.set(line.value, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      ScrollTrigger.create({
        trigger: root.value,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(line.value, {
            strokeDashoffset: length * (1 - self.progress),
          });
        },
      });
    }
  }
});
</script>

<template>
  <section
    id="timeline"
    ref="root"
    class="relative py-24 sm:py-32"
  >
    <div class="container-x">
      <div class="mx-auto max-w-3xl text-center">
        <div data-reveal class="section-label mx-auto">Timeline Akademik</div>
        <h2 data-reveal class="mt-4 font-display text-3xl font-bold sm:text-5xl">
          Perjalanan kuliah online di
          <span class="text-gradient-gold">UNSIA</span>
        </h2>
        <p
          data-reveal
          class="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Dari semester pertama hingga sekarang, setiap milestone menjadi pijakan
          menuju karier digital.
        </p>
      </div>

      <div class="relative mt-16">
        <!-- Animated SVG line in center on desktop, left on mobile -->
        <svg
          class="pointer-events-none absolute left-6 top-0 h-full w-2 md:left-1/2 md:-translate-x-1/2"
          viewBox="0 0 4 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="time-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#0057A8" />
              <stop offset="50%" stop-color="#C8960A" />
              <stop offset="100%" stop-color="#0057A8" />
            </linearGradient>
          </defs>
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="1000"
            stroke="rgba(255,255,255,0.08)"
            stroke-width="2"
          />
          <path
            ref="line"
            d="M2 0 L2 1000"
            stroke="url(#time-grad)"
            stroke-width="2"
            fill="none"
          />
        </svg>

        <ol class="relative space-y-10 md:space-y-16">
          <li
            v-for="(ev, i) in timeline"
            :key="ev.title"
            data-event
            class="relative pl-16 md:pl-0"
          >
            <div
              class="grid items-center gap-6 md:grid-cols-2"
              :class="i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'"
            >
              <div
                class="md:px-10"
                :class="i % 2 === 0 ? 'md:text-right' : ''"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.25em] text-gold"
                >
                  {{ ev.semester }} · {{ ev.date }}
                </p>
                <h3 class="mt-2 font-display text-2xl font-bold leading-tight">
                  {{ ev.title }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-white/70">
                  {{ ev.description }}
                </p>
                <span
                  v-if="ev.achievement"
                  class="mt-3 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold"
                >
                  <Icon name="award" :size="12" />
                  {{ ev.achievement }}
                </span>
              </div>
              <div class="md:px-10">
                <div
                  class="rounded-card glass p-5 transition-all hover:shadow-glow"
                  :class="i % 2 === 0 ? 'md:ml-0' : 'md:mr-0'"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-unsia-400 to-unsia-700 text-white shadow-glow"
                    >
                      <Icon :name="ev.icon" :size="22" />
                    </span>
                    <div>
                      <p
                        class="text-[11px] uppercase tracking-[0.25em] text-white/55"
                      >
                        Milestone
                      </p>
                      <p class="font-display text-sm font-bold">
                        {{ ev.semester }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div class="rounded-btn bg-white/5 p-2">
                      <p class="text-[10px] uppercase tracking-widest text-white/55">Status</p>
                      <p class="font-display text-xs font-bold text-gold">Lulus</p>
                    </div>
                    <div class="rounded-btn bg-white/5 p-2">
                      <p class="text-[10px] uppercase tracking-widest text-white/55">Mode</p>
                      <p class="font-display text-xs font-bold">Online</p>
                    </div>
                    <div class="rounded-btn bg-white/5 p-2">
                      <p class="text-[10px] uppercase tracking-widest text-white/55">Kampus</p>
                      <p class="font-display text-xs font-bold">UNSIA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dot -->
            <span
              class="absolute left-6 top-3 -translate-x-1/2 md:left-1/2"
              aria-hidden="true"
            >
              <span class="relative flex h-4 w-4 items-center justify-center">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40"
                />
                <span
                  class="relative inline-flex h-3 w-3 rounded-full bg-gold ring-4 ring-night"
                />
              </span>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
