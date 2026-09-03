<script setup lang="ts">
const { t } = useI18n()

// Identified from the live carousel's image filenames (no alt text available) — swap for real logo assets once provided.
const brands = ['JCB', 'Kubota', 'Kärcher', 'Alke']
</script>

<template>
  <section class="bg-white py-14">
    <div class="container-page">
      <p class="text-center text-sm font-semibold uppercase tracking-wide text-ink-800/50">
        {{ t('home.brands.title') }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <span
          v-for="brand in brands"
          :key="brand"
          class="text-lg font-semibold text-ink-900/40 grayscale transition hover:text-ink-900/70 hover:grayscale-0"
        >
          {{ brand }}
        </span>
      </div>
    </div>
  </section>
</template>
