<script setup lang="ts">
const { t } = useI18n()
const page = useLegalPage('data-privacy')
usePageSeo({ title: page?.title ?? t('seo.dataPrivacy.title'), description: t('seo.dataPrivacy.description') })
</script>

<template>
  <div class="container-page max-w-3xl py-20">
    <h1 class="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{{ page?.title }}</h1>
    <div class="prose mt-8 max-w-none" v-html="page?.html" />
  </div>
</template>
