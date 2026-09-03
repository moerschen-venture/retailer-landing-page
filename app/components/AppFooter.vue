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
  <footer class="border-t border-ink-900/10 bg-ink-950 text-ink-100">
    <div class="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <NuxtLink :to="localePath('/')">
          <LogoMark light />
        </NuxtLink>
        <p class="mt-4 text-sm text-ink-100/70">{{ t('footer.tagline') }}</p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          class="mt-4 inline-flex items-center gap-2 text-sm text-ink-100/70 hover:text-white"
        >
          Instagram
        </a>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wide text-ink-100/50">{{ t('footer.navTitle') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><NuxtLink :to="localePath('/')" class="text-ink-100/80 hover:text-white">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/articles')" class="text-ink-100/80 hover:text-white">{{ t('nav.articles') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="text-ink-100/80 hover:text-white">{{ t('nav.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wide text-ink-100/50">{{ t('footer.modulesTitle') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="mod in moduleLinks" :key="mod.slug">
            <NuxtLink :to="localePath(`/module/${mod.slug}`)" class="text-ink-100/80 hover:text-white">
              {{ t(`nav.${mod.key}`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wide text-ink-100/50">{{ t('footer.legalTitle') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><NuxtLink :to="localePath('/data-privacy')" class="text-ink-100/80 hover:text-white">{{ t('footer.privacy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/terms-of-use')" class="text-ink-100/80 hover:text-white">{{ t('footer.terms') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/impressum')" class="text-ink-100/80 hover:text-white">{{ t('footer.impressum') }}</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ink-100/10 py-6">
      <p class="container-page text-xs text-ink-100/50">MachineMaster © {{ year }}. {{ t('footer.rights') }}</p>
    </div>
  </footer>
</template>
