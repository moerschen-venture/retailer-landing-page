<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const moduleLinks = [
  { key: 'catalogue', slug: 'catalogue' },
  { key: 'configurator', slug: 'configurator' },
  { key: 'usedMachines', slug: 'used-machines' },
  { key: 'retailerExchange', slug: 'retailer-exchange' }
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-ink-900/10 bg-white">
    <div class="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <NuxtLink :to="localePath('/')">
          <LogoMark />
        </NuxtLink>
      </div>

      <div>
        <h3 class="text-sm text-ink-800/50">{{ t('footer.navTitle') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><NuxtLink :to="localePath('/')" class="font-medium text-ink-900 underline hover:text-brand-600">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/articles')" class="font-medium text-ink-900 underline hover:text-brand-600">{{ t('nav.articles') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/data-privacy')" class="font-medium text-ink-900 underline hover:text-brand-600">{{ t('footer.privacy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/terms-of-use')" class="font-medium text-ink-900 underline hover:text-brand-600">{{ t('footer.terms') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/impressum')" class="font-medium text-ink-900 underline hover:text-brand-600">{{ t('footer.impressum') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm text-ink-800/50">{{ t('footer.modulesTitle') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="mod in moduleLinks" :key="mod.slug">
            <NuxtLink :to="localePath(`/module/${mod.slug}`)" class="font-medium text-ink-900 underline hover:text-brand-600">
              {{ t(`nav.${mod.key}`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ink-900/10 py-6">
      <div class="container-page flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <a
            href="https://www.instagram.com/machinemaster.de"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-900/30"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <p class="text-sm font-medium text-ink-900">{{ t('footer.tagline') }}</p>
        </div>
        <p class="text-sm text-ink-800/50">MachineMaster © {{ year }}. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
