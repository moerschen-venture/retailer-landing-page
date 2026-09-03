<script setup lang="ts">
const { t, tm, rt } = useI18n()
const items = computed(() => tm('home.faq.items') as Array<{ q: string; a: string }>)
const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="scroll-mt-20 bg-white py-20">
    <div class="container-page max-w-3xl">
      <h2 class="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{{ t('home.faq.title') }}</h2>

      <div class="mt-10 divide-y divide-ink-900/10 border-t border-ink-900/10">
        <div v-for="(item, i) in items" :key="i">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-ink-900"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            {{ rt(item.q) }}
            <svg
              class="h-5 w-5 flex-shrink-0 text-ink-900 transition-transform"
              :class="{ 'rotate-45': openIndex === i }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
          </button>
          <div v-show="openIndex === i" class="pb-5 pr-8 text-sm text-ink-800/70">
            {{ rt(item.a) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
