<script setup lang="ts">
interface SolutionItem {
  tab: string
  title: string
  description: string
  link: string
}

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const items = computed(() => tm('home.solutions.items') as SolutionItem[])
const activeIndex = ref(0)
const active = computed(() => items.value[activeIndex.value])
</script>

<template>
  <section id="modules" class="bg-brand-50/50 py-20">
    <div class="container-page">
      <div class="max-w-2xl">
        <p class="section-eyebrow">{{ t('home.solutions.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{{ t('home.solutions.title') }}</h2>
        <p class="mt-4 text-ink-800/70">{{ t('home.solutions.subtitle') }}</p>
      </div>

      <div class="mt-12 flex flex-wrap gap-2 border-b border-ink-900/10">
        <button
          v-for="(item, i) in items"
          :key="i"
          type="button"
          class="rounded-t-lg px-4 py-3 text-sm font-semibold transition"
          :class="i === activeIndex ? 'border-b-2 border-brand-600 text-brand-700' : 'text-ink-800/60 hover:text-ink-900'"
          @click="activeIndex = i"
        >
          {{ rt(item.tab) }}
        </button>
      </div>

      <div v-if="active" class="mt-8 grid gap-8 rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm lg:grid-cols-[2fr_1fr] lg:items-center">
        <div>
          <h3 class="text-xl font-semibold text-ink-900">{{ rt(active.title) }}</h3>
          <p class="mt-3 text-ink-800/70">{{ rt(active.description) }}</p>
        </div>
        <NuxtLink :to="localePath(active.link)" class="btn-primary justify-self-start lg:justify-self-end">
          {{ t('common.learnMore') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
