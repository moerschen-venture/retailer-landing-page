<script setup lang="ts">
const props = defineProps<{ active: string }>()

const { t } = useI18n()
const localePath = useLocalePath()

const moduleLinks = [
  { key: 'catalogue', slug: 'catalogue' },
  { key: 'configurator', slug: 'configurator' },
  { key: 'usedMachines', slug: 'used-machines' },
  { key: 'retailerExchange', slug: 'retailer-exchange' }
]
</script>

<template>
  <nav class="border-b border-white/10 bg-ink-900">
    <div class="container-page flex flex-wrap gap-6 overflow-x-auto">
      <NuxtLink
        v-for="mod in moduleLinks"
        :key="mod.slug"
        :to="localePath(`/module/${mod.slug}`)"
        class="whitespace-nowrap border-b-2 py-4 text-sm font-medium transition"
        :class="mod.slug === props.active ? 'border-brand-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'"
      >
        {{ t(`nav.${mod.key}`) }}
      </NuxtLink>
    </div>
  </nav>
</template>
