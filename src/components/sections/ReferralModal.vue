<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { referral, student } from "@/data/portfolio";
import { useReferralModal } from "@/composables/useReferralModal";
import Modal from "@/components/ui/Modal.vue";
import Icon from "@/components/ui/Icon.vue";

const { isOpen, close } = useReferralModal();
const copied = ref(false);
const codeChars = computed(() => referral.code.split(""));

async function copyCode() {
  try {
    await navigator.clipboard.writeText(referral.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    copied.value = false;
  }
}

const whatsappMsg = computed(() =>
  encodeURIComponent(
    `Halo ${student.name}, saya mau pakai kode referal "${referral.code}" untuk daftar di UNSIA. Boleh minta info lanjut?`,
  ),
);
const whatsappHref = computed(
  () => `https://wa.me/${student.whatsapp}?text=${whatsappMsg.value}`,
);

watch(isOpen, (v) => {
  if (!v) copied.value = false;
});
</script>

<template>
  <Modal :open="isOpen" @close="close">
    <div class="relative max-w-xl">
      <!-- Decorative top gradient -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gold/15 via-gold/5 to-transparent"
      />
      <div
        class="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-gold/30 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-unsia-500/30 blur-3xl"
      />

      <div class="relative px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
        <!-- Header -->
        <div class="text-center">
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold"
          >
            <Icon name="sparkles" :size="11" />
            Kode Referal Eksklusif
          </span>
          <h3 class="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
            Daftar UNSIA pakai kode dari
            <span class="text-gradient-gold">{{ referral.ownerName }}</span>
          </h3>
          <p class="mt-2 text-sm text-white/65">
            {{ referral.ownerProgram }} · Tunjukkan kode ini saat mengisi
            formulir pendaftaran di pmb.unsia.ac.id
          </p>
        </div>

        <!-- Code display -->
        <div class="mt-6 rounded-card border border-gold/30 bg-black/40 p-4 sm:p-5">
          <p
            class="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gold/85"
          >
            Kode Referal
          </p>
          <div
            class="mt-3 flex items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Kode referal"
          >
            <span
              v-for="(ch, i) in codeChars"
              :key="i"
              class="inline-flex h-12 min-w-[2.25rem] items-center justify-center rounded-md border border-gold/40 bg-gradient-to-b from-gold/15 to-gold/5 px-2 font-display text-2xl font-extrabold tracking-wider text-gold sm:h-14 sm:min-w-[2.75rem] sm:text-3xl"
            >
              {{ ch }}
            </span>
          </div>
          <button
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-btn border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
            @click="copyCode"
          >
            <Icon :name="copied ? 'check' : 'list'" :size="14" />
            {{ copied ? "Berhasil Disalin!" : "Salin Kode" }}
          </button>
        </div>

        <!-- Perks -->
        <div class="mt-5">
          <p
            class="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55"
          >
            Benefit untuk Kamu
          </p>
          <ul class="mt-2.5 grid gap-2">
            <li
              v-for="(p, i) in referral.perks"
              :key="i"
              class="flex items-start gap-2.5 text-sm text-white/80"
            >
              <span
                class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold"
              >
                <Icon name="check" :size="12" />
              </span>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>

        <!-- CTAs -->
        <div class="mt-6 grid gap-2.5 sm:grid-cols-2">
          <a
            :href="referral.registerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-btn bg-gold px-4 py-3 text-sm font-display font-bold text-night transition hover:bg-gold-soft"
          >
            <Icon name="rocket" :size="16" />
            Daftar di pmb.unsia.ac.id
          </a>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-btn border border-white/15 bg-white/5 px-4 py-3 text-sm font-display font-bold text-white transition hover:border-gold/40 hover:bg-white/10"
          >
            <Icon name="whatsapp" :size="16" />
            Chat dulu via WhatsApp
          </a>
        </div>

        <!-- Footer link to benefits -->
        <a
          :href="referral.benefitUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-white/55 transition hover:text-gold"
        >
          <Icon name="globe" :size="12" />
          Cek detail benefit lengkap di unsia.ac.id
          <Icon name="arrow-right" :size="11" />
        </a>
      </div>
    </div>
  </Modal>
</template>
