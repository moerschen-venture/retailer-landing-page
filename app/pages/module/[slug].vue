<script setup lang="ts">
interface ModuleSection {
  heading: string
  body: string
  features: string[]
}

const route = useRoute()
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

const slugToKey: Record<string, string> = {
  catalogue: 'catalogue',
  configurator: 'configurator',
  'used-machines': 'usedMachines',
  'retailer-exchange': 'retailerExchange'
}

const moduleKey = slugToKey[route.params.slug as string]

if (!moduleKey) {
  throw createError({ statusCode: 404, statusMessage: 'Module not found' })
}

const base = `modules.${moduleKey}`
const sections = computed(() => tm(`${base}.sections`) as ModuleSection[])

usePageSeo({ title: t(`seo.${moduleKey}.title`), description: t(`seo.${moduleKey}.description`) })
</script>

<template>
  <div>
    <ModuleTabs :active="route.params.slug as string" />
    <section class="bg-ink-950 py-20 text-white">
      <div class="container-page max-w-3xl">
        <p class="section-eyebrow text-brand-300">{{ t('nav.modules') }}</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{{ t(`${base}.title`) }}</h1>
        <p class="mt-5 text-lg text-ink-100/80">{{ t(`${base}.subtitle`) }}</p>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container-page max-w-3xl space-y-14">
        <div v-for="(section, si) in sections" :key="si">
          <h2 class="text-2xl font-semibold text-ink-900">{{ rt(section.heading) }}</h2>
          <p class="mt-4 text-lg leading-relaxed text-ink-800/80">{{ rt(section.body) }}</p>

          <ul class="mt-6 space-y-3">
            <li v-for="(feature, fi) in section.features" :key="fi" class="flex items-start gap-3">
              <svg class="mt-1 h-5 w-5 flex-shrink-0 text-brand-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              <span class="text-ink-900">{{ rt(feature) }}</span>
            </li>
          </ul>
        </div>

        <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('common.getStarted') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>
