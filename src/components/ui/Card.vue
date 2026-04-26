<script setup lang="ts">
interface Props {
  href?: string;
  target?: string;
  accent?: "blue" | "gold" | "none";
}
withDefaults(defineProps<Props>(), { accent: "none" });
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="group relative block overflow-hidden rounded-card glass p-6 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-glow"
  >
    <div
      v-if="accent !== 'none'"
      class="pointer-events-none absolute inset-x-0 top-0 h-px"
      :class="
        accent === 'gold'
          ? 'bg-gradient-to-r from-transparent via-gold to-transparent'
          : 'bg-gradient-to-r from-transparent via-unsia-300 to-transparent'
      "
    />
    <slot />
  </component>
</template>
