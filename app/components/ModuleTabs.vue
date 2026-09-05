<script setup lang="ts">
const props = defineProps<{ active: string }>()

const { t } = useI18n()
const localePath = useLocalePath()

const moduleLinks = [
  { key: 'tabCatalogue', slug: 'catalogue', icon: 'book' },
  { key: 'tabUsedMachines', slug: 'used-machines', icon: 'truck' },
  { key: 'tabConfigurator', slug: 'configurator', icon: 'list' },
  { key: 'tabRetailerExchange', slug: 'retailer-exchange', icon: 'search' }
]
</script>

<template>
  <nav class="bg-[#151c25]">
    <div class="container-page flex flex-wrap justify-between overflow-x-auto">
      <NuxtLink
        v-for="mod in moduleLinks"
        :key="mod.slug"
        :to="localePath(`/module/${mod.slug}`)"
        class="flex items-center gap-2 whitespace-nowrap border-b-2 px-2 py-4 text-base font-medium transition"
        :class="mod.slug === props.active ? 'border-brand-500 text-white' : 'border-transparent text-[#626f83] hover:text-white/80'"
      >
        <svg v-if="mod.icon === 'book'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4.5A1.5 1.5 0 015.5 3H10v14H5.5A1.5 1.5 0 014 15.5v-11zM16 4.5A1.5 1.5 0 0014.5 3H10v14h4.5a1.5 1.5 0 001.5-1.5v-11z" />
        </svg>
        <svg v-else-if="mod.icon === 'truck'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2 5h9v8H2V5zM11 8h3.5L16 10.5V13h-4.5V8z" />
          <circle cx="5.5" cy="14.5" r="1.5" />
          <circle cx="13" cy="14.5" r="1.5" />
        </svg>
        <svg v-else-if="mod.icon === 'list'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 5h9M7 10h9M7 15h9M3 5h.01M3 10h.01M3 15h.01" />
        </svg>
        <svg v-else class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="9" cy="9" r="5.5" />
          <path stroke-linecap="round" d="M17 17l-3.5-3.5" />
        </svg>
        {{ t(`nav.${mod.key}`) }}
      </NuxtLink>
    </div>
  </nav>
</template>
