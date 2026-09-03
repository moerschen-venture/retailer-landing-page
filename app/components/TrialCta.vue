<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="bg-brand-600">
    <div class="container-page flex flex-col items-center gap-6 py-16 text-center text-white">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('home.trialCta.title') }}</h2>
      <p class="max-w-xl text-brand-50/90">{{ t('home.trialCta.subtitle') }}</p>
      <NuxtLink :to="localePath('/contact')" class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">
        {{ t('home.trialCta.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>
