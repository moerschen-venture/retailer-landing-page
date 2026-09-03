<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  image?: string
  path: string
}>()

const { t } = useI18n()
</script>

<template>
  <NuxtLink :to="path" class="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div class="aspect-[16/10] overflow-hidden bg-ink-900/5">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-semibold text-ink-900">{{ title }}</h3>
      <p v-if="description" class="mt-2 line-clamp-3 flex-1 text-sm text-ink-800/70">{{ description }}</p>
      <span class="mt-4 text-sm font-semibold text-brand-600 group-hover:underline">{{ t('common.readMore') }} →</span>
    </div>
  </NuxtLink>
</template>
