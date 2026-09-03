<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative overflow-hidden bg-ink-950 text-white">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-700),transparent_55%)]" aria-hidden="true" />
    <div class="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div>
        <h1 class="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-6 max-w-lg text-lg text-ink-100/80">
          {{ t('home.hero.subtitle') }}
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('home.hero.ctaPrimary') }}</NuxtLink>
        </div>
      </div>

      <div class="aspect-video overflow-hidden rounded-2xl bg-black/40 lg:aspect-[4/3]">
        <iframe
          src="https://player.vimeo.com/video/964545132?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1"
          class="h-full w-full"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="MachineMaster product preview"
        />
      </div>
    </div>
  </section>
</template>
