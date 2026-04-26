<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { gallery } from "@/data/portfolio";
import type { GalleryCategory, GalleryItem } from "@/types/portfolio";
import Modal from "@/components/ui/Modal.vue";
import Icon from "@/components/ui/Icon.vue";

type Filter = "Semua" | GalleryCategory;
const filters: Filter[] = ["Semua", "Proyek", "Sertifikat", "Kegiatan"];

const active = ref<Filter>("Semua");
const root = ref<HTMLElement | null>(null);
const lightboxItem = ref<GalleryItem | null>(null);

const filtered = computed(() =>
  active.value === "Semua"
    ? gallery
    : gallery.filter((g) => g.category === active.value),
);

function openLightbox(item: GalleryItem) {
  lightboxItem.value = item;
}
function closeLightbox() {
  lightboxItem.value = null;
}

const currentIndex = computed(() =>
  lightboxItem.value
    ? filtered.value.findIndex((g) => g.id === lightboxItem.value!.id)
    : -1,
);

function prev() {
  if (currentIndex.value < 0) return;
  const i = currentIndex.value - 1;
  if (i >= 0) lightboxItem.value = filtered.value[i];
}
function next() {
  if (currentIndex.value < 0) return;
  const i = currentIndex.value + 1;
  if (i < filtered.value.length) lightboxItem.value = filtered.value[i];
}

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
    id="portofolio"
    ref="root"
    class="relative py-24 sm:py-32"
  >
    <div class="container-x">
      <div class="mx-auto max-w-3xl text-center">
        <div data-reveal class="section-label mx-auto">Galeri Portofolio</div>
        <h2 data-reveal class="mt-4 font-display text-3xl font-bold sm:text-5xl">
          Kumpulan
          <span class="text-gradient-gold">karya, sertifikat & momen kampus</span>
        </h2>
        <p
          data-reveal
          class="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Setiap kotak adalah cerita dari perjalanan kuliah online di UNSIA —
          klik untuk melihat lebih dekat.
        </p>
      </div>

      <!-- Filter tabs -->
      <div data-reveal class="mt-10 flex flex-wrap justify-center gap-2">
        <button
          v-for="f in filters"
          :key="f"
          type="button"
          class="rounded-full border px-5 py-2 text-sm font-display font-semibold transition-all"
          :class="
            active === f
              ? 'border-gold bg-gold text-night shadow-gold'
              : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:bg-white/10'
          "
          @click="active = f"
        >
          {{ f }}
          <span class="ml-2 text-xs opacity-70">
            {{
              f === "Semua"
                ? gallery.length
                : gallery.filter((g) => g.category === f).length
            }}
          </span>
        </button>
      </div>

      <!-- Masonry grid -->
      <transition-group
        name="masonry"
        tag="div"
        class="masonry mt-10"
      >
        <div
          v-for="item in filtered"
          :key="item.id"
          class="masonry-item"
        >
          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-card border border-white/10 bg-white/5 text-left transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow"
            @click="openLightbox(item)"
          >
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              :class="
                item.span === 2 ? 'aspect-[4/5]' : item.span === 3 ? 'aspect-[3/5]' : 'aspect-[4/3]'
              "
              loading="lazy"
              decoding="async"
            />
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-95 transition-all duration-500 ease-smooth group-hover:translate-y-0"
            >
              <span
                class="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold"
              >
                {{ item.category }}
              </span>
              <h3 class="mt-2 font-display text-lg font-bold leading-tight">
                {{ item.title }}
              </h3>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="t in item.tags"
                  :key="t"
                  class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/85"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </transition-group>
    </div>

    <Modal :open="!!lightboxItem" @close="closeLightbox">
      <div v-if="lightboxItem" class="relative">
        <img
          :src="lightboxItem.imageUrl"
          :alt="lightboxItem.title"
          class="max-h-[70vh] w-full object-cover"
        />
        <div class="grid gap-6 px-6 py-6 sm:grid-cols-3 sm:px-8">
          <div class="sm:col-span-2">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold"
            >
              {{ lightboxItem.category }}
            </span>
            <h3 class="mt-2 font-display text-2xl font-bold sm:text-3xl">
              {{ lightboxItem.title }}
            </h3>
            <p class="mt-3 text-sm text-white/75 sm:text-base">
              {{ lightboxItem.description }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="t in lightboxItem.tags"
                :key="t"
                class="rounded-full bg-white/10 px-3 py-1 text-xs"
              >
                {{ t }}
              </span>
            </div>
          </div>
          <div class="flex items-end justify-end gap-2">
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 disabled:opacity-30"
              :disabled="currentIndex <= 0"
              @click="prev"
              aria-label="Sebelumnya"
            >
              <Icon name="arrow-right" :size="18" class="rotate-180" />
            </button>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 disabled:opacity-30"
              :disabled="currentIndex >= filtered.length - 1"
              @click="next"
              aria-label="Berikutnya"
            >
              <Icon name="arrow-right" :size="18" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </section>
</template>

<style scoped>
.masonry-enter-active,
.masonry-leave-active {
  transition:
    opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.masonry-enter-from,
.masonry-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
</style>
