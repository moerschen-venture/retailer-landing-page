<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()

const mobileOpen = ref(false)

const moduleLinks = [
  { key: 'catalogue', slug: 'catalogue' },
  { key: 'configurator', slug: 'configurator' },
  { key: 'usedMachines', slug: 'used-machines' },
  { key: 'retailerExchange', slug: 'retailer-exchange' }
]

const otherLocale = computed(() => locales.value.find((l) => (typeof l === 'string' ? l : l.code) !== locale.value))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink-900/10 bg-white/90 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold text-ink-900">
        <span class="inline-block h-7 w-7 rounded-md bg-brand-600" aria-hidden="true" />
        MachineMaster
      </NuxtLink>

      <nav class="hidden items-center gap-6 text-sm font-medium text-ink-800 lg:flex">
        <NuxtLink :to="localePath('/')" class="hover:text-brand-600">{{ t('nav.home') }}</NuxtLink>

        <div class="group relative">
          <button type="button" class="flex items-center gap-1 hover:text-brand-600">
            {{ t('nav.modules') }}
            <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
          </button>
          <div class="invisible absolute left-0 top-full w-56 rounded-xl border border-ink-900/10 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
            <NuxtLink
              v-for="mod in moduleLinks"
              :key="mod.slug"
              :to="localePath(`/module/${mod.slug}`)"
              class="block rounded-lg px-3 py-2 hover:bg-brand-50 hover:text-brand-700"
            >
              {{ t(`nav.${mod.key}`) }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to="localePath('/articles')" class="hover:text-brand-600">{{ t('nav.articles') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#faq`" class="hover:text-brand-600">{{ t('nav.faq') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#pricing`" class="hover:text-brand-600">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="hover:text-brand-600">{{ t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <NuxtLink
          v-if="otherLocale"
          :to="switchLocalePath(typeof otherLocale === 'string' ? otherLocale : otherLocale.code)"
          class="text-sm font-semibold text-ink-800 hover:text-brand-600"
        >
          {{ typeof otherLocale === 'string' ? otherLocale.toUpperCase() : otherLocale.code.toUpperCase() }}
        </NuxtLink>
        <a href="https://app.machinemaster.de/retailer/login" target="_blank" rel="noopener" class="btn-primary">{{ t('nav.login') }}</a>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-900/10 lg:hidden"
        :aria-label="t('nav.modules')"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" class="border-t border-ink-900/10 bg-white px-6 py-4 lg:hidden">
      <nav class="flex flex-col gap-3 text-sm font-medium text-ink-800">
        <NuxtLink :to="localePath('/')" @click="mobileOpen = false">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink
          v-for="mod in moduleLinks"
          :key="mod.slug"
          :to="localePath(`/module/${mod.slug}`)"
          @click="mobileOpen = false"
        >
          {{ t(`nav.${mod.key}`) }}
        </NuxtLink>
        <NuxtLink :to="localePath('/articles')" @click="mobileOpen = false">{{ t('nav.articles') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#faq`" @click="mobileOpen = false">{{ t('nav.faq') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#pricing`" @click="mobileOpen = false">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" @click="mobileOpen = false">{{ t('nav.contact') }}</NuxtLink>
        <a href="https://app.machinemaster.de/retailer/login" target="_blank" rel="noopener">{{ t('nav.login') }}</a>
        <NuxtLink
          v-if="otherLocale"
          :to="switchLocalePath(typeof otherLocale === 'string' ? otherLocale : otherLocale.code)"
          @click="mobileOpen = false"
        >
          {{ typeof otherLocale === 'string' ? otherLocale.toUpperCase() : otherLocale.code.toUpperCase() }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
