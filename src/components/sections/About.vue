<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { aboutMedia, programStudi, student } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const root = ref<HTMLElement | null>(null);
const photoWrap = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const slides = aboutMedia;
const index = ref(0);
const isDragging = ref(false);
const dragOffset = ref(0);
const startX = ref(0);

const total = slides.length;

const trackStyle = computed(() => ({
  transform: `translateX(calc(${-index.value * 100}% + ${dragOffset.value}px))`,
  transition: isDragging.value
    ? "none"
    : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
}));

function go(i: number) {
  index.value = (i + total) % total;
}
function next() {
  go(index.value + 1);
}
function prev() {
  go(index.value - 1);
}

function onPointerDown(e: PointerEvent) {
  isDragging.value = true;
  startX.value = e.clientX;
  dragOffset.value = 0;
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}
function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  dragOffset.value = e.clientX - startX.value;
}
function onPointerUp(e: PointerEvent) {
  if (!isDragging.value) return;
  const width = trackRef.value?.parentElement?.clientWidth ?? 1;
  const threshold = Math.max(40, width * 0.18);
  if (dragOffset.value > threshold) prev();
  else if (dragOffset.value < -threshold) next();
  isDragging.value = false;
  dragOffset.value = 0;
  (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
}

let auto: number | null = null;
function startAuto() {
  stopAuto();
  auto = window.setInterval(() => {
    if (!isDragging.value) next();
  }, 5500);
}
function stopAuto() {
  if (auto !== null) {
    clearInterval(auto);
    auto = null;
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
}

onMounted(() => {
  const { fadeUp } = useScrollAnimation();
  if (root.value) {
    root.value
      .querySelectorAll("[data-reveal]")
      .forEach((el) => fadeUp(el));
  }
  if (photoWrap.value) {
    fadeUp(photoWrap.value, { y: 60, duration: 1.1 });
  }
  startAuto();
});

onBeforeUnmount(() => {
  stopAuto();
});
</script>

<template>
  <section
    id="tentang"
    ref="root"
    class="relative py-24 sm:py-32"
  >
    <div class="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
      <!-- Carousel column · Netflix-style poster -->
      <div class="lg:col-span-5">
        <div ref="photoWrap" class="relative mx-auto max-w-md">
          <div
            class="group relative overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
            tabindex="0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Galeri foto & video"
            @keydown="onKey"
            @mouseenter="stopAuto"
            @mouseleave="startAuto"
            @focus="stopAuto"
            @blur="startAuto"
          >
            <!-- Track -->
            <div
              ref="trackRef"
              class="flex aspect-[2/3] w-full touch-pan-y select-none"
              :style="trackStyle"
              @pointerdown="onPointerDown"
              @pointermove="onPointerMove"
              @pointerup="onPointerUp"
              @pointercancel="onPointerUp"
            >
              <div
                v-for="(m, i) in slides"
                :key="i"
                class="relative h-full w-full shrink-0"
              >
                <template v-if="m.type === 'video'">
                  <video
                    class="h-full w-full object-cover"
                    :poster="m.poster"
                    :src="m.src"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    :autoplay="i === index"
                  />
                </template>
                <template v-else>
                  <img
                    :src="m.src"
                    :alt="m.caption || `Foto ${student.name}`"
                    class="h-full w-full object-cover"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                </template>
                <!-- Netflix-style bottom gradient -->
                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent"
                />
                <div class="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <p class="font-display text-base font-bold tracking-tight">
                    {{ student.name }}
                  </p>
                  <p v-if="m.caption" class="mt-0.5 text-xs text-white/70">
                    {{ m.caption }}
                  </p>
                </div>
                <span
                  v-if="m.type === 'video'"
                  class="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                >
                  <Icon name="play" :size="10" />
                  Video
                </span>
              </div>
            </div>

            <!-- Counter -->
            <div
              class="pointer-events-none absolute left-3 top-3 inline-flex items-center rounded-sm bg-black/70 px-2 py-1 text-[10px] font-bold tracking-[0.15em] text-white tabular-nums"
            >
              {{ String(index + 1).padStart(2, "0") }} / {{ String(total).padStart(2, "0") }}
            </div>

            <!-- Arrows -->
            <button
              type="button"
              class="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all duration-300 hover:bg-black/80 group-hover:opacity-100 focus:opacity-100"
              aria-label="Sebelumnya"
              @click="prev"
            >
              <Icon name="arrow-right" :size="18" class="rotate-180" />
            </button>
            <button
              type="button"
              class="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all duration-300 hover:bg-black/80 group-hover:opacity-100 focus:opacity-100"
              aria-label="Berikutnya"
              @click="next"
            >
              <Icon name="arrow-right" :size="18" />
            </button>

            <!-- Bottom progress bars (Netflix-style) -->
            <div
              class="pointer-events-auto absolute inset-x-4 bottom-2 flex items-center gap-1"
              role="tablist"
            >
              <button
                v-for="(_, i) in slides"
                :key="i"
                type="button"
                role="tab"
                :aria-selected="i === index"
                :aria-label="`Slide ${i + 1}`"
                class="h-0.5 flex-1 rounded-full transition-all duration-300"
                :class="i === index ? 'bg-white' : 'bg-white/30 hover:bg-white/55'"
                @click="go(i)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Content column -->
      <div class="lg:col-span-7">
        <div data-reveal class="section-label">Profil</div>
        <h2 data-reveal class="mt-4 font-display text-4xl font-bold sm:text-6xl">
          {{ student.name }}
        </h2>
        <p data-reveal class="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          Mahasiswa
          <span class="text-gradient-gold">Universitas Siber Asia</span>,
          membangun karier sambil belajar.
        </p>

        <!-- Program studi - separated card per prodi -->
        <div data-reveal class="mt-14">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.25em] text-white/55"
              >
                Program Studi PJJ
              </p>
              <h3 class="mt-2 font-display text-xl font-bold sm:text-2xl">
                Pilihan jurusan di
                <span class="text-gradient-gold">Universitas Siber Asia</span>
              </h3>
            </div>
            <a
              href="https://unsia.ac.id/#program-studi"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold transition hover:text-gold-soft sm:inline-flex"
            >
              Semua Prodi
              <Icon name="arrow-right" :size="12" />
            </a>
          </div>

          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <article
              v-for="p in programStudi"
              :key="p.url"
              data-prodi
              class="group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] p-5 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-glow"
              :class="
                p.accent === 'gold'
                  ? 'hover:!border-gold/50'
                  : 'hover:!border-unsia-300/50'
              "
            >
              <!-- Top accent line -->
              <span
                class="pointer-events-none absolute inset-x-0 top-0 h-px"
                :class="
                  p.accent === 'gold'
                    ? 'bg-gradient-to-r from-transparent via-gold/70 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-unsia-300/70 to-transparent'
                "
              />
              <!-- Soft corner glow -->
              <span
                class="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                :class="p.accent === 'gold' ? 'bg-gold/40' : 'bg-unsia-400/40'"
              />

              <!-- Header: name + tagline (logo disembunyikan) -->
              <header class="flex items-start gap-3">
                <div class="min-w-0 flex-1">
                  <h4
                    class="font-display text-lg font-extrabold leading-tight"
                  >
                    {{ p.name }}
                  </h4>
                  <p v-if="p.tagline" class="mt-1 text-xs text-white/65">
                    {{ p.tagline }}
                  </p>
                </div>
              </header>

              <!-- Detail row -->
              <dl
                class="mt-5 grid grid-cols-3 gap-2 rounded-btn border border-white/10 bg-black/30 p-2.5 text-center"
              >
                <div>
                  <dt
                    class="text-[9px] font-semibold uppercase tracking-widest text-white/50"
                  >
                    Gelar
                  </dt>
                  <dd
                    class="mt-0.5 font-display text-xs font-bold"
                    :class="p.accent === 'gold' ? 'text-gold' : 'text-unsia-200'"
                  >
                    {{ p.gelar || "—" }}
                  </dd>
                </div>
                <div class="border-x border-white/10">
                  <dt
                    class="text-[9px] font-semibold uppercase tracking-widest text-white/50"
                  >
                    Durasi
                  </dt>
                  <dd class="mt-0.5 font-display text-xs font-bold">
                    {{ p.durasi || "—" }}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-[9px] font-semibold uppercase tracking-widest text-white/50"
                  >
                    Mode
                  </dt>
                  <dd class="mt-0.5 font-display text-xs font-bold">
                    Online
                  </dd>
                </div>
              </dl>

              <!-- Action buttons per prodi -->
              <div class="mt-5 flex flex-col gap-2">
                <a
                  :href="p.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-1.5 rounded-btn px-3 py-2 text-xs font-display font-semibold transition-all duration-300"
                  :class="
                    p.accent === 'gold'
                      ? 'bg-gold text-night hover:bg-gold-soft'
                      : 'bg-unsia-500 text-white hover:bg-unsia-400'
                  "
                >
                  Detail Prodi
                  <Icon name="arrow-right" :size="13" />
                </a>
                <div class="grid grid-cols-2 gap-2">
                  <a
                    :href="p.syaratUrl || 'https://unsia.ac.id/syarat-pendaftaran/'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-1.5 rounded-btn border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white/85 transition hover:border-gold/40 hover:bg-white/10 hover:text-gold"
                  >
                    <Icon name="list" :size="12" />
                    Syarat
                  </a>
                  <a
                    :href="p.biayaUrl || 'https://unsia.ac.id/keuangan/'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-1.5 rounded-btn border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white/85 transition hover:border-gold/40 hover:bg-white/10 hover:text-gold"
                  >
                    <Icon name="wallet" :size="12" />
                    Biaya
                  </a>
                </div>
              </div>
            </article>
          </div>

          <a
            href="https://unsia.ac.id/#program-studi"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-btn border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white/70 transition hover:border-gold/40 hover:text-gold sm:hidden"
          >
            Semua Program Studi UNSIA
            <Icon name="arrow-right" :size="12" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
