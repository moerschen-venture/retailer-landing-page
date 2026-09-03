<script setup lang="ts">
withDefaults(defineProps<{ light?: boolean; subtitle?: boolean }>(), { light: false, subtitle: false })

const { t } = useI18n()
</script>

<template>
  <span class="inline-flex items-center gap-2">
    <svg class="h-6 w-6 flex-shrink-0 text-brand-500" viewBox="0 0 40 32" fill="currentColor" aria-hidden="true">
      <polygon points="14,11 22,11 14,30 6,30" />
      <polygon points="30,2 38,2 30,30 22,30" />
    </svg>
    <span class="leading-[0.95]">
      <span
        class="block text-base font-extrabold uppercase tracking-tight"
        :class="light ? 'text-white' : 'text-ink-950'"
      >
        Machine<br />Master
      </span>
      <span v-if="subtitle" class="mt-0.5 block text-[11px] font-medium normal-case" :class="light ? 'text-white/70' : 'text-ink-800/60'">
        {{ t('nav.logoSubtitle') }} <span class="text-brand-500">{{ t('nav.logoSubtitleHighlight') }}</span>
      </span>
    </span>
  </span>
</template>
