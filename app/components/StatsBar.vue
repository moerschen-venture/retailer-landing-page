<script setup lang="ts">
const { tm, rt } = useI18n()
const stats = computed(() => tm('home.stats') as Array<{ value: string; label: string; highlight?: boolean }>)
</script>

<template>
  <section class="border-b border-ink-900/10 bg-white">
    <div class="container-page grid grid-cols-1 gap-8 py-14 sm:grid-cols-3">
      <div v-for="(stat, i) in stats" :key="i" class="text-center sm:text-left">
        <p
          class="flex items-center justify-center gap-2 text-4xl font-bold sm:justify-start"
          :class="stat.highlight ? 'text-[#27b300]' : 'text-ink-950'"
        >
          <svg v-if="stat.highlight" class="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 15l5-5 3 3 6-7M18 6h3v3" />
            <circle cx="4" cy="19.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="9" cy="19.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="4" cy="15.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="9" cy="15.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          {{ rt(stat.value) }}
        </p>
        <p class="mt-2 text-sm text-ink-800/70">{{ rt(stat.label) }}</p>
      </div>
    </div>
  </section>
</template>
