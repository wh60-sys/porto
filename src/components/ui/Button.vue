<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "gold" | "ghost";
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button",
  fullWidth: false,
});

const classes = computed(() => {
  const base =
    props.variant === "primary"
      ? "btn-primary"
      : props.variant === "gold"
        ? "btn-gold"
        : "btn-ghost";
  return [base, props.fullWidth ? "w-full" : ""].join(" ");
});

const tag = computed(() => (props.href ? "a" : props.to ? "router-link" : "button"));
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :target="target"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
    :type="!href && !to ? type : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
