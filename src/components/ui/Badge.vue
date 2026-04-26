<script setup lang="ts">
interface Props {
  variant?: "default" | "gold" | "outline";
  pulse?: boolean;
}
withDefaults(defineProps<Props>(), { variant: "default", pulse: false });
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
    :class="[
      variant === 'gold'
        ? 'bg-gold/15 text-gold border border-gold/40'
        : variant === 'outline'
          ? 'border border-white/30 bg-white/5 text-white/80'
          : 'bg-unsia-500/15 text-unsia-200 border border-unsia-400/40',
    ]"
  >
    <span
      v-if="pulse"
      class="relative flex h-2 w-2"
      aria-hidden="true"
    >
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        :class="variant === 'gold' ? 'bg-gold' : 'bg-unsia-300'"
      />
      <span
        class="relative inline-flex h-2 w-2 rounded-full"
        :class="variant === 'gold' ? 'bg-gold' : 'bg-unsia-300'"
      />
    </span>
    <slot />
  </span>
</template>
