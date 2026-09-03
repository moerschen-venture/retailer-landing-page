<script setup lang="ts">
withDefaults(defineProps<{ light?: boolean }>(), { light: false })
</script>

<template>
  <span class="inline-flex items-center gap-2">
    <svg class="h-6 w-6 flex-shrink-0 text-brand-500" viewBox="0 0 40 32" fill="currentColor" aria-hidden="true">
      <polygon points="14,11 22,11 14,30 6,30" />
      <polygon points="30,2 38,2 30,30 22,30" />
    </svg>
    <span
      class="text-base font-extrabold uppercase leading-[0.95] tracking-tight"
      :class="light ? 'text-white' : 'text-ink-950'"
    >
      Machine<br />Master
    </span>
  </span>
</template>
