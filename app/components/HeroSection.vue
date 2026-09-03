<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative overflow-hidden bg-ink-950 text-white">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-700),transparent_55%)]" aria-hidden="true" />
    <div class="container-page relative py-24 sm:py-32">
      <p class="section-eyebrow text-brand-300">{{ t('home.hero.eyebrow') }}</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {{ t('home.hero.title') }}
      </h1>
      <p class="mt-6 max-w-2xl text-lg text-ink-100/80">
        {{ t('home.hero.subtitle') }}
      </p>
      <div class="mt-10 flex flex-wrap items-center gap-4">
        <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('home.hero.ctaPrimary') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>
