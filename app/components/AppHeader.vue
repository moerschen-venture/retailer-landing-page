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
  <header class="relative z-20 bg-ink-950">
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <NuxtLink :to="localePath('/')">
        <LogoMark light />
      </NuxtLink>

      <nav class="hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex">
        <NuxtLink :to="localePath('/')" class="hover:text-white">{{ t('nav.home') }}</NuxtLink>

        <div class="group relative">
          <button type="button" class="flex items-center gap-1 hover:text-white">
            {{ t('nav.modules') }}
            <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
          </button>
          <div class="invisible absolute left-0 top-full w-56 rounded-xl border border-ink-900/10 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
            <NuxtLink
              v-for="mod in moduleLinks"
              :key="mod.slug"
              :to="localePath(`/module/${mod.slug}`)"
              class="block rounded-lg px-3 py-2 text-ink-900 hover:bg-brand-50 hover:text-brand-700"
            >
              {{ t(`nav.${mod.key}`) }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to="localePath('/articles')" class="hover:text-white">{{ t('nav.articles') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#faq`" class="hover:text-white">{{ t('nav.faq') }}</NuxtLink>
        <NuxtLink :to="`${localePath('/')}#pricing`" class="hover:text-white">{{ t('nav.pricing') }}</NuxtLink>
      </nav>

      <div class="hidden items-center gap-4 lg:flex">
        <a href="https://machinemaster.de" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-white/60 hover:text-white/90">
          {{ t('nav.mainSite') }}
          <span class="scale-[0.6] origin-left"><LogoMark light /></span>
        </a>
        <NuxtLink
          v-if="otherLocale"
          :to="switchLocalePath(typeof otherLocale === 'string' ? otherLocale : otherLocale.code)"
          class="text-sm font-semibold text-white/70 hover:text-white"
        >
          {{ typeof otherLocale === 'string' ? otherLocale.toUpperCase() : otherLocale.code.toUpperCase() }}
        </NuxtLink>
        <a
          href="https://app.machinemaster.de/retailer/login"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
        >
          {{ t('nav.login') }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586L8.293 10.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
        </a>
        <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('nav.contact') }}</NuxtLink>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
        :aria-label="t('nav.modules')"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" class="border-t border-white/10 bg-ink-950 px-6 py-4 lg:hidden">
      <nav class="flex flex-col gap-3 text-sm font-medium text-white/80">
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
        <a href="https://machinemaster.de" target="_blank" rel="noopener">{{ t('nav.mainSite') }}</a>
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
