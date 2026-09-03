<script setup lang="ts">
const props = defineProps<{
  i18nKey: string
  variant?: 'light' | 'peach'
  iconPrefix: string
}>()

const { t, tm, rt } = useI18n()
const items = computed(() => tm(`${props.i18nKey}.items`) as Array<{ title: string; description: string }>)
const isPeach = computed(() => props.variant === 'peach')
</script>

<template>
  <section :class="['py-20', isPeach ? 'bg-peach-50' : 'bg-white']">
    <div class="container-page">
      <div class="max-w-2xl">
        <p class="section-eyebrow">{{ t(`${i18nKey}.eyebrow`) }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{{ t(`${i18nKey}.title`) }}</h2>
        <p class="mt-4 text-ink-800/70">{{ t(`${i18nKey}.subtitle`) }}</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="isPeach ? '' : 'rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm'"
        >
          <img :src="`/images/icons/${iconPrefix}-${i + 1}.png`" alt="" class="h-12 w-12" loading="lazy" />
          <h3 class="mt-4 font-semibold text-ink-900">{{ rt(item.title) }}</h3>
          <p class="mt-2 text-sm text-ink-800/70">{{ rt(item.description) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
