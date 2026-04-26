<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { student } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const root = ref<HTMLElement | null>(null);
const name = ref("");
const email = ref("");
const message = ref("");

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(
    `Halo ${student.name}, dari ${name.value || "Calon Mahasiswa UNSIA"}`,
  );
  const body = encodeURIComponent(
    `Halo ${student.name},\n\n${message.value}\n\n— ${name.value} (${email.value})`,
  );
  return `mailto:${student.email}?subject=${subject}&body=${body}`;
});

const whatsappMsg = encodeURIComponent(
  "Halo! Saya tertarik bertanya soal kuliah online di Universitas Siber Asia (UNSIA).",
);
const whatsappHref = `https://wa.me/${student.whatsapp}?text=${whatsappMsg}`;

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
    id="kontak"
    ref="root"
    class="relative py-16 sm:py-20"
  >
    <div class="container-x">
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <!-- Left: Contact form -->
        <div class="lg:col-span-7">
          <div data-reveal class="section-label">Kontak</div>
          <h2 data-reveal class="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Mari ngobrol soal
            <span class="text-gradient-gold">karya, kolaborasi, atau UNSIA</span>
          </h2>
          <p
            data-reveal
            class="mt-3 max-w-xl text-base text-white/70 sm:text-lg"
          >
            Kirim pesan langsung lewat form di bawah, atau pakai WhatsApp untuk
            bertanya soal pengalaman kuliah online di Universitas Siber Asia.
          </p>

          <form
            data-reveal
            class="mt-8 grid gap-4 rounded-card glass p-6 sm:p-8"
            @submit.prevent
          >
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60">
                  Nama Lengkap
                </span>
                <input
                  v-model="name"
                  type="text"
                  autocomplete="name"
                  placeholder="Nama kamu"
                  class="w-full rounded-btn border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </label>
              <label class="block">
                <span class="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60">
                  Email
                </span>
                <input
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="kamu@email.com"
                  class="w-full rounded-btn border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </label>
            </div>
            <label class="block">
              <span class="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60">
                Pesan
              </span>
              <textarea
                v-model="message"
                rows="5"
                placeholder="Tulis pesan kamu di sini..."
                class="w-full resize-none rounded-btn border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
              ></textarea>
            </label>
            <div class="mt-2 flex flex-wrap items-center gap-3">
              <a :href="mailtoHref" class="btn-gold">
                <Icon name="mail" :size="16" />
                Kirim via Email
              </a>
              <a
                :href="whatsappHref"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost"
              >
                <Icon name="whatsapp" :size="16" />
                Chat di WhatsApp
              </a>
            </div>
          </form>
        </div>

        <!-- Right: Contact card + closing CTA -->
        <div class="space-y-6 lg:col-span-5">
          <div data-reveal class="rounded-card glass p-6 sm:p-8">
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-white/55"
            >
              Hubungi Saya
            </p>
            <ul class="mt-4 space-y-4 text-sm">
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-unsia-500/15 text-unsia-200">
                  <Icon name="mail" :size="16" />
                </span>
                <a
                  :href="`mailto:${student.email}`"
                  class="font-medium text-white/85 hover:text-gold"
                >
                  {{ student.email }}
                </a>
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <Icon name="whatsapp" :size="16" />
                </span>
                <a
                  :href="whatsappHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-white/85 hover:text-gold"
                >
                  +{{ student.whatsapp }}
                </a>
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon name="globe" :size="16" />
                </span>
                <a
                  href="https://unsia.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-white/85 hover:text-gold"
                >
                  unsia.ac.id
                </a>
              </li>
            </ul>
          </div>

          <!-- Closing CTA -->
          <div
            data-reveal
            class="relative overflow-hidden rounded-card border border-gold/30 p-8"
            style="background: linear-gradient(135deg, rgba(0,87,168,0.95), rgba(200,150,10,0.85));"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl"
              aria-hidden="true"
            />
            <p
              class="text-xs font-semibold uppercase tracking-[0.3em] text-white/85"
            >
              Penutup
            </p>
            <h3 class="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              Siap kuliah online?
              <span class="block">Daftar UNSIA sekarang.</span>
            </h3>
            <p class="mt-3 text-sm text-white/85">
              Kuliah fleksibel, terakreditasi BAN-PT & EAHEA, ribuan alumni
              sudah membuktikan.
            </p>
            <a
              href="https://pmb.unsia.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex items-center gap-2 rounded-btn bg-night px-6 py-3 text-sm font-display font-semibold text-white shadow-glow transition hover:bg-ink"
            >
              Daftar di pmb.unsia.ac.id
              <Icon name="arrow-right" :size="16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
