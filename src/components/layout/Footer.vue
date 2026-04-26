<script setup lang="ts">
import { student } from "@/data/portfolio";
import Icon from "@/components/ui/Icon.vue";

const unsiaLinks = [
  { label: "UNSIA.ac.id", url: "https://unsia.ac.id/" },
  { label: "PMB UNSIA", url: "https://pmb.unsia.ac.id/" },
  { label: "Program Studi", url: "https://unsia.ac.id/#program-studi" },
  { label: "Syarat Pendaftaran", url: "https://unsia.ac.id/syarat-pendaftaran/" },
  { label: "Biaya Kuliah", url: "https://unsia.ac.id/keuangan/" },
  { label: "Virtual Tour", url: "https://unsia.ac.id/videotour/" },
  { label: "FAQ", url: "https://unsia.ac.id/faq/" },
];

const portfolioLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Saya", href: "#tentang" },
  { label: "UNSIA", href: "#unsia" },
  { label: "Kontak", href: "#kontak" },
];
</script>

<template>
  <footer class="relative mt-20 border-t border-white/10 bg-ink/80">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
    />
    <div class="container-x py-16">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3">
            <img
              src="/profil.jpeg"
              alt="Profil"
              class="h-14 w-14 rounded-full object-cover shadow-glow"
            />
            <div>
              <p class="font-display text-lg font-bold">{{ student.name }}</p>
              <p class="text-xs uppercase tracking-[0.2em] text-white/50">
                Mahasiswa UNSIA · {{ student.cohort }}
              </p>
            </div>
          </div>
          <p class="mt-6 max-w-md text-sm leading-relaxed text-white/65">
            Portfolio ini terhubung langsung dengan laman resmi
            <a
              href="https://unsia.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gold underline-offset-4 hover:underline"
              >Universitas Siber Asia</a
            >. Bagi yang ingin melanjutkan studi online, daftarkan dirimu sekarang.
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a
              v-for="s in student.socials"
              :key="s.label"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-gold"
            >
              <Icon :name="s.icon" :size="18" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h4 class="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/55">
            Portofolio
          </h4>
          <ul class="mt-4 space-y-2 text-sm text-white/75">
            <li v-for="l in portfolioLinks" :key="l.href">
              <a :href="l.href" class="transition hover:text-gold">{{ l.label }}</a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h4 class="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/55">
            Universitas Siber Asia
          </h4>
          <ul class="mt-4 grid grid-cols-2 gap-2 text-sm text-white/75">
            <li v-for="l in unsiaLinks" :key="l.url">
              <a
                :href="l.url"
                target="_blank"
                rel="noopener noreferrer"
                class="transition hover:text-gold"
                >{{ l.label }}</a
              >
            </li>
          </ul>
          <a
            href="https://pmb.unsia.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold mt-6"
          >
            Daftar UNSIA Sekarang
            <Icon name="arrow-right" :size="16" />
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center"
      >
        <p>
          © {{ new Date().getFullYear() }} {{ student.name }} · komunitas mahasiswa UNSIA.
        </p>
        <p class="flex items-center gap-2">
          <Icon name="shield" :size="14" class="text-gold" />
          Kampus Online Pertama & Terbaik Indonesia
        </p>
      </div>
    </div>
  </footer>
</template>
