<script setup lang="ts">
const { t } = useI18n()
const page = useLegalPage('impressum')
usePageSeo({ title: page?.title ?? t('seo.impressum.title'), description: t('seo.impressum.description') })
</script>

<template>
  <div>
    <section class="bg-ink-950 py-20 text-white">
      <div class="container-page max-w-3xl">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ page?.title }}</h1>
      </div>
    </section>

    <section class="bg-[#f2f4f7] py-16">
      <div class="container-page max-w-3xl">
        <div class="rounded-xl bg-white p-8 sm:p-10">
          <div class="prose max-w-none" v-html="page?.html" />
        </div>
      </div>
    </section>
  </div>
</template>
