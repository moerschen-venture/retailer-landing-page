<script setup lang="ts">
interface OnboardingPlan {
  title: string
  features: string[]
  oneTime: string
  perBrand: string
  variableCost?: string
}

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

const simpleBenefits = computed(() => tm('home.pricing.simple.benefits') as string[])
const onboarding = computed(() => tm('home.pricing.combined.onboarding') as OnboardingPlan)
const subscription = computed(() => tm('home.pricing.combined.subscription') as OnboardingPlan)
</script>

<template>
  <section id="pricing" class="scroll-mt-20 bg-gradient-to-b from-brand-500 to-white py-20">
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{{ t('home.pricing.title') }}</h2>
        <p class="mt-4 text-white/90">{{ t('home.pricing.subtitle') }}</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:items-start">
        <!-- Simple tier: Händlerbörse (retailer exchange) -->
        <div class="rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lg">
          <h3 class="text-xl font-semibold text-ink-900">{{ t('home.pricing.simple.name') }}</h3>
          <p class="mt-3 text-sm text-ink-800/70">{{ t('home.pricing.simple.description') }}</p>

          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-6 w-full">
            {{ t('home.pricing.simple.cta') }}
          </NuxtLink>

          <div class="mt-6 rounded-xl border border-ink-900/10 p-4">
            <p class="text-3xl font-bold text-ink-950">{{ t('home.pricing.simple.monthlyPrice') }}€</p>
            <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.perMonth') }}</p>
          </div>
          <p class="my-3 text-center text-sm text-ink-800/50">{{ t('home.pricing.labels.or') }}</p>
          <div class="rounded-xl border border-ink-900/10 p-4">
            <p class="flex items-center gap-2 text-3xl font-bold text-ink-950">
              {{ t('home.pricing.simple.yearlyPrice') }}€
              <span class="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">{{ t('home.pricing.simple.yearlyDiscount') }}</span>
            </p>
            <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.perYear') }}</p>
          </div>

          <hr class="my-6 border-ink-900/10" />

          <h4 class="font-semibold text-ink-900">{{ t('home.pricing.simple.benefitsTitle') }}</h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li v-for="(feature, i) in simpleBenefits" :key="i" class="flex items-start gap-2">
              <PricingCheck />
              <span class="text-ink-900">{{ rt(feature) }}</span>
            </li>
          </ul>
        </div>

        <!-- Combined tier: Whitelabel catalogue + configurator -->
        <div class="rounded-3xl border border-ink-900/10 bg-white p-8 shadow-lg">
          <p class="section-eyebrow">{{ t('home.pricing.combined.eyebrow') }}</p>
          <h3 class="mt-2 text-xl font-semibold text-ink-900">{{ t('home.pricing.combined.title') }}</h3>
          <p class="mt-3 text-sm text-ink-800/70">{{ t('home.pricing.combined.description') }}</p>

          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-6 w-full">
            {{ t('home.pricing.combined.cta') }}
          </NuxtLink>

          <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h4 class="font-semibold text-ink-900">{{ rt(onboarding.title) }}</h4>
              <ul class="mt-4 space-y-3 text-sm">
                <li v-for="(feature, i) in onboarding.features" :key="i" class="flex items-start gap-2">
                  <PricingCheck />
                  <span class="text-ink-900">{{ rt(feature) }}</span>
                </li>
              </ul>

              <div class="mt-6 rounded-xl border border-ink-900/10 p-4">
                <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.oneTimePayment') }}</p>
                <p class="text-2xl font-bold text-ink-950">{{ rt(onboarding.oneTime) }}€</p>
              </div>
              <p class="my-2 text-sm text-ink-800/50">{{ t('home.pricing.labels.then') }}</p>
              <div class="rounded-xl bg-ink-900/5 p-4">
                <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.perBrand') }}</p>
                <p class="text-2xl font-bold text-ink-950">{{ rt(onboarding.perBrand) }}€</p>
                <p class="text-xs text-ink-800/50">{{ t('home.pricing.labels.monthly') }}</p>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-ink-900">{{ rt(subscription.title) }}</h4>
              <ul class="mt-4 space-y-3 text-sm">
                <li v-for="(feature, i) in subscription.features" :key="i" class="flex items-start gap-2">
                  <PricingCheck />
                  <span class="text-ink-900">{{ rt(feature) }}</span>
                </li>
              </ul>

              <div class="mt-6 rounded-xl border border-ink-900/10 p-4">
                <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.oneTimePayment') }}</p>
                <p class="text-2xl font-bold text-ink-950">{{ rt(subscription.oneTime) }}€</p>
              </div>
              <p class="my-2 text-sm text-ink-800/50">{{ t('home.pricing.labels.then') }}</p>
              <div class="rounded-xl bg-ink-900/5 p-4">
                <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.perBrand') }}</p>
                <p class="text-2xl font-bold text-ink-950">{{ rt(subscription.perBrand) }}€</p>
                <p class="text-xs text-ink-800/50">{{ t('home.pricing.labels.monthly') }}</p>
              </div>
              <div v-if="subscription.variableCost" class="mt-4 rounded-xl bg-ink-900/5 p-4">
                <p class="text-sm text-ink-800/50">{{ t('home.pricing.labels.variableCosts') }}</p>
                <p class="text-2xl font-bold text-ink-950">€{{ rt(subscription.variableCost) }}</p>
                <p class="text-xs text-ink-800/50">{{ t('home.pricing.labels.variableCostsNote') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
