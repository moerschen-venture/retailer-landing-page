<script setup lang="ts">
const props = defineProps<{
  i18nKey: string
  variant?: 'light' | 'peach'
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
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
          </span>
          <h3 class="mt-4 font-semibold text-ink-900">{{ rt(item.title) }}</h3>
          <p class="mt-2 text-sm text-ink-800/70">{{ rt(item.description) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
