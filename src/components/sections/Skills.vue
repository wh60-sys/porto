<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { skills, radarData } from "@/data/portfolio";
import type { SkillCategory } from "@/types/portfolio";
import Icon from "@/components/ui/Icon.vue";

const root = ref<HTMLElement | null>(null);
const radarCanvas = ref<HTMLCanvasElement | null>(null);

const categories: { key: SkillCategory; label: string; icon: string }[] = [
  { key: "Technical", label: "Technical Skills", icon: "code" },
  { key: "Soft Skills", label: "Soft Skills", icon: "users" },
  { key: "Tools", label: "Tools & Platform", icon: "sparkles" },
];

const skillsByCategory = computed(() => {
  return categories.map((c) => ({
    ...c,
    items: skills.filter((s) => s.category === c.key),
  }));
});

function drawRadar(ctx: CanvasRenderingContext2D, progress = 1) {
  const { width, height } = ctx.canvas;
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const cx = width / (2 * dpr);
  const cy = height / (2 * dpr);
  const radius = Math.min(cx, cy) - 32;
  const n = radarData.length;

  // Rings
  ctx.lineWidth = 1;
  for (let r = 1; r <= 4; r++) {
    ctx.beginPath();
    const rr = (radius * r) / 4;
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + Math.cos(angle) * rr;
      const y = cy + Math.sin(angle) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(255,255,255,${0.05 + r * 0.025})`;
    ctx.stroke();
  }

  // Spokes
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
  }

  // Data polygon
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "rgba(0,87,168,0.55)");
  grad.addColorStop(1, "rgba(200,150,10,0.55)");

  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const v = (radarData[i].value / 100) * progress;
    const x = cx + Math.cos(angle) * radius * v;
    const y = cy + Math.sin(angle) * radius * v;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(241,205,102,0.9)";
  ctx.stroke();

  // Points
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const v = (radarData[i].value / 100) * progress;
    const x = cx + Math.cos(angle) * radius * v;
    const y = cy + Math.sin(angle) * radius * v;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#F1CD66";
    ctx.fill();
    ctx.strokeStyle = "rgba(10,14,26,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Labels
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = '600 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lx = cx + Math.cos(angle) * (radius + 18);
    const ly = cy + Math.sin(angle) * (radius + 18);
    ctx.fillText(radarData[i].label, lx, ly);
  }
}

function setupCanvas() {
  const canvas = radarCanvas.value;
  if (!canvas) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  return canvas.getContext("2d");
}

onMounted(() => {
  const { fadeUp, gsap, ScrollTrigger } = useScrollAnimation();

  // Radar
  const ctx = setupCanvas();
  if (ctx) {
    const obj = { p: 0 };
    drawRadar(ctx, 0);
    ScrollTrigger.create({
      trigger: radarCanvas.value!,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          p: 1,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => drawRadar(ctx, obj.p),
        });
      },
    });

    window.addEventListener("resize", () => {
      const c = setupCanvas();
      if (c) drawRadar(c, 1);
    });
  }

  // Skills bars
  if (root.value) {
    root.value.querySelectorAll("[data-reveal]").forEach((el) => fadeUp(el));

    const bars = root.value.querySelectorAll("[data-bar]");
    bars.forEach((bar) => {
      const target = Number(bar.getAttribute("data-level") || 0);
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${target}%`,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }
});
</script>

<template>
  <section
    id="skills"
    ref="root"
    class="relative py-24 sm:py-32"
  >
    <div class="container-x">
      <div class="mx-auto max-w-3xl text-center">
        <div data-reveal class="section-label mx-auto">Skills & Kompetensi</div>
        <h2 data-reveal class="mt-4 font-display text-3xl font-bold sm:text-5xl">
          Stack yang sedang
          <span class="text-gradient-gold">terus berkembang</span>
        </h2>
        <p
          data-reveal
          class="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Setiap semester di UNSIA, saya menambah satu keahlian baru sembari
          memperkuat fondasi yang sudah ada.
        </p>
      </div>

      <div class="mt-16 grid gap-10 lg:grid-cols-12">
        <!-- Bars -->
        <div class="space-y-10 lg:col-span-7">
          <div
            v-for="cat in skillsByCategory"
            :key="cat.key"
            data-reveal
            class="rounded-card glass p-6 sm:p-8"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-unsia-500/20 text-unsia-200"
              >
                <Icon :name="cat.icon" :size="18" />
              </span>
              <h3 class="font-display text-lg font-bold">{{ cat.label }}</h3>
            </div>
            <ul class="mt-6 space-y-5">
              <li v-for="s in cat.items" :key="s.name">
                <div class="mb-2 flex items-end justify-between gap-3">
                  <span class="text-sm font-medium text-white/85">{{ s.name }}</span>
                  <span class="font-display text-sm font-bold text-gold">
                    {{ s.level }}%
                  </span>
                </div>
                <div
                  class="relative h-2 w-full overflow-hidden rounded-full bg-white/8"
                >
                  <span
                    data-bar
                    :data-level="s.level"
                    class="block h-full rounded-full"
                    style="background: linear-gradient(90deg, #4889CB, #C8960A);"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Radar -->
        <div data-reveal class="lg:col-span-5">
          <div
            class="sticky top-24 rounded-card glass p-6 sm:p-8"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-display text-lg font-bold">Visualisasi Kompetensi</h3>
              <span class="chip !text-white/70 hover:!text-gold">
                Realtime
              </span>
            </div>
            <p class="mt-2 text-sm text-white/65">
              Hexagonal radar yang diperbarui setiap semester berdasarkan
              evaluasi mata kuliah dan proyek.
            </p>
            <div class="relative mt-4 aspect-square w-full">
              <canvas ref="radarCanvas" class="h-full w-full"></canvas>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2">
              <div
                v-for="r in radarData"
                :key="r.label"
                class="rounded-btn border border-white/10 bg-white/5 p-2 text-center"
              >
                <p class="text-[10px] uppercase tracking-widest text-white/55">
                  {{ r.label }}
                </p>
                <p class="font-display text-base font-bold text-gold">
                  {{ r.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
