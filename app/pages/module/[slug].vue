<script setup lang="ts">
interface ModuleSection {
  heading: string
  body: string
  image?: string
  features: string[]
}

const route = useRoute()
const { t, tm, rt } = useI18n()

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
const collage = computed(() => {
  const value = tm(`${base}.collage`) as string[] | undefined
  return Array.isArray(value) ? value.map((img) => rt(img)) : []
})

usePageSeo({ title: t(`seo.${moduleKey}.title`), description: t(`seo.${moduleKey}.description`) })
</script>

<template>
  <div>
    <ModuleTabs :active="route.params.slug as string" />

    <section class="bg-ink-950 py-14 text-white">
      <div class="container-page max-w-3xl">
        <p class="text-xl text-white/60">{{ t(`${base}.eyebrow`) }}</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{{ t(`${base}.heading`) }}</h1>
      </div>
    </section>

    <div v-if="collage.length" class="bg-[#f2f4f7] py-10">
      <div class="container-page grid grid-cols-3 items-start gap-4">
        <img
          v-for="(img, i) in collage"
          :key="img"
          :src="img"
          alt=""
          class="w-full rounded-lg shadow-md"
          :class="[i % 2 === 0 ? '-rotate-2' : 'rotate-2', i >= 3 ? 'mt-6 hidden lg:block' : '']"
        />
      </div>
    </div>

    <section class="bg-[#f2f4f7] py-10">
      <div class="container-page space-y-6">
        <div v-for="(section, si) in sections" :key="si" class="rounded-xl bg-white p-6 sm:p-10">
          <div class="grid grid-cols-1 items-center gap-8" :class="section.image ? 'md:grid-cols-2' : ''">
            <div :class="section.image && si % 2 === 1 ? 'md:order-2' : ''">
              <h2 class="text-2xl font-semibold text-ink-900">{{ rt(section.heading) }}</h2>
              <p class="mt-4 leading-relaxed text-ink-800/80">{{ rt(section.body) }}</p>

              <ul class="mt-6 space-y-3">
                <li v-for="(feature, fi) in section.features" :key="fi" class="flex items-start gap-3">
                  <svg class="mt-1 h-5 w-5 flex-shrink-0 text-brand-500" viewBox="0 0 20 20" fill="currentColor">
                    <circle cx="10" cy="10" r="4" />
                  </svg>
                  <span class="text-ink-900">{{ rt(feature) }}</span>
                </li>
              </ul>
            </div>

            <div v-if="section.image" :class="si % 2 === 1 ? 'md:order-1' : ''">
              <img :src="rt(section.image)" :alt="rt(section.heading)" class="w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
