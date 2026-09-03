<script setup lang="ts">
interface Tier {
  name: string
  price: string
  priceSuffix?: string
  period: string
  note?: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const tiers = computed(() => tm('home.pricing.tiers') as Tier[])
</script>

<template>
  <section id="pricing" class="scroll-mt-20 bg-gradient-to-b from-brand-500 to-white py-20">
    <div class="container-page">
      <div class="max-w-2xl text-center sm:mx-auto">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{{ t('home.pricing.title') }}</h2>
        <p class="mt-4 text-white/90">{{ t('home.pricing.subtitle') }}</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          :class="[
            'flex flex-col rounded-2xl border bg-white p-8 shadow-lg',
            tier.highlighted ? 'border-brand-500 ring-1 ring-brand-500' : 'border-ink-900/10'
          ]"
        >
          <h3 class="text-lg font-semibold text-ink-900">{{ rt(tier.name) }}</h3>
          <p class="mt-4 flex items-baseline gap-1">
            <span class="text-3xl font-bold text-ink-950">{{ rt(tier.price) }}€</span>
            <span v-if="tier.priceSuffix" class="text-xs text-ink-800/50">({{ rt(tier.priceSuffix) }})</span>
          </p>
          <p class="text-sm text-ink-800/60">{{ rt(tier.period) }}</p>
          <p v-if="tier.note" class="mt-1 text-xs text-ink-800/50">{{ rt(tier.note) }}</p>
          <p class="mt-4 text-sm text-ink-800/70">{{ rt(tier.description) }}</p>

          <ul class="mt-6 flex-1 space-y-3 text-sm">
            <li v-for="(feature, fi) in tier.features" :key="fi" class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              <span class="text-ink-900">{{ rt(feature) }}</span>
            </li>
          </ul>

          <NuxtLink
            :to="localePath('/contact')"
            :class="[
              'mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition',
              tier.highlighted ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-ink-900/5 text-ink-900 hover:bg-ink-900/10'
            ]"
          >
            {{ rt(tier.cta) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
