<script setup lang="ts">
interface Props {
  name: string;
  size?: number | string;
  strokeWidth?: number | string;
}
withDefaults(defineProps<Props>(), { size: 20, strokeWidth: 1.8 });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Lucide-inspired set, hand-rolled to avoid extra deps -->
    <template v-if="name === 'play'">
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'pause'">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'music'">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </template>
    <template v-else-if="name === 'moon'">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </template>
    <template v-else-if="name === 'menu'">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </template>
    <template v-else-if="name === 'x'">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </template>
    <template v-else-if="name === 'arrow-down'">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </template>
    <template v-else-if="name === 'arrow-right'">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </template>
    <template v-else-if="name === 'sparkles'">
      <path d="M12 3l2.4 5.4L20 11l-5.6 2.6L12 19l-2.4-5.4L4 11l5.6-2.6L12 3z" />
      <path d="M19 3v4M21 5h-4M5 17v4M7 19H3" />
    </template>
    <template v-else-if="name === 'rocket'">
      <path d="M14.5 2.5C18 4 21 7.5 21.5 11l-7 2.5-3 4.5-2-2 4-3 2.5-7z" />
      <path d="M9 15l-3.5 3.5M3 21l3.5-3.5" />
    </template>
    <template v-else-if="name === 'list'">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </template>
    <template v-else-if="name === 'wallet'">
      <path d="M3 7a2 2 0 0 1 2-2h14v4H5a2 2 0 0 1-2-2z" />
      <path d="M3 7v10a2 2 0 0 0 2 2h14v-4" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </template>
    <template v-else-if="name === 'book'">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
      <path d="M4 4.5v15" />
    </template>
    <template v-else-if="name === 'map'">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </template>
    <template v-else-if="name === 'help'">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </template>
    <template v-else-if="name === 'flag'">
      <path d="M4 21V4h13l-2 4 2 4H4" />
    </template>
    <template v-else-if="name === 'code'">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </template>
    <template v-else-if="name === 'award'">
      <circle cx="12" cy="9" r="6" />
      <polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88" />
    </template>
    <template v-else-if="name === 'trophy'">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3" />
    </template>
    <template v-else-if="name === 'users'">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </template>
    <template v-else-if="name === 'phone'">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2z" />
    </template>
    <template v-else-if="name === 'whatsapp'">
      <path
        d="M20.5 12a8.5 8.5 0 1 0-15.62 4.7L4 21l4.4-1.13A8.5 8.5 0 0 0 20.5 12z"
      />
      <path d="M8.5 9.5c0-1 .8-1.5 1.5-1.5h.6c.4 1 .9 1.9 1.5 2.7-.4.6-.8 1-1.4 1.4.8 1.3 1.9 2.4 3.2 3.2.4-.6.8-1 1.4-1.4.8.6 1.7 1.1 2.7 1.5v.6c0 .7-.5 1.5-1.5 1.5C12.4 17.5 6.5 11.6 6.5 7c0-1 .8-1.5 1.5-1.5z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'linkedin'">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2a4 4 0 0 1 4-2z" fill="currentColor" stroke="none" />
      <rect x="2" y="9" width="4" height="12" fill="currentColor" stroke="none" />
      <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'github'">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </template>
    <template v-else-if="name === 'instagram'">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </template>
    <template v-else-if="name === 'check'">
      <polyline points="20 6 9 17 4 12" />
    </template>
    <template v-else-if="name === 'star'">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </template>
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
    </template>
    <template v-else-if="name === 'volume'">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="10" />
    </template>
  </svg>
</template>
