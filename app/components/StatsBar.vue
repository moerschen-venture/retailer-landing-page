<script setup lang="ts">
const { tm, rt } = useI18n()
const stats = computed(() => tm('home.stats') as Array<{ value: string; label: string }>)
</script>

<template>
  <section class="border-b border-ink-900/10 bg-white">
    <div class="container-page grid grid-cols-1 gap-8 py-14 sm:grid-cols-3">
      <div v-for="(stat, i) in stats" :key="i" class="text-center sm:text-left">
        <p class="text-4xl font-bold text-ink-950">{{ rt(stat.value) }}</p>
        <p class="mt-2 text-sm text-ink-800/70">{{ rt(stat.label) }}</p>
      </div>
    </div>
  </section>
</template>
