<script setup lang="ts">
interface SolutionItem {
  tab: string
  title: string
  description: string
  link: string
}

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const items = computed(() => tm('home.solutions.items') as SolutionItem[])
const activeIndex = ref(0)
const active = computed(() => items.value[activeIndex.value])

const videoIds = ['964765940', '964765714', '964766646', '964766509']
const activeVideoId = computed(() => videoIds[activeIndex.value])
</script>

<template>
  <section id="modules" class="bg-[#f2f4f7] py-20">
    <div class="container-page">
      <div class="max-w-2xl">
        <p class="section-eyebrow">{{ t('home.solutions.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{{ t('home.solutions.title') }}</h2>
        <p class="mt-4 text-ink-800/70">{{ t('home.solutions.subtitle') }}</p>
      </div>

      <div class="mt-10 inline-flex flex-wrap gap-1 rounded-xl bg-ink-900/5 p-1">
        <button
          v-for="(item, i) in items"
          :key="i"
          type="button"
          class="rounded-lg px-5 py-2.5 text-sm font-semibold transition"
          :class="i === activeIndex ? 'bg-white text-brand-500 shadow-sm' : 'text-ink-900/60 hover:text-ink-900'"
          @click="activeIndex = i"
        >
          {{ rt(item.tab) }}
        </button>
      </div>

      <div v-if="active" class="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 class="text-xl font-semibold text-ink-900">{{ rt(active.title) }}</h3>
            <p class="mt-3 max-w-2xl text-ink-800/70">{{ rt(active.description) }}</p>
          </div>
          <NuxtLink :to="localePath(rt(active.link))" class="btn-primary flex-shrink-0">
            {{ t('common.learnMore') }}
          </NuxtLink>
        </div>

        <div class="mt-8 aspect-video overflow-hidden rounded-2xl bg-ink-900/5">
          <iframe
            :key="activeVideoId"
            :src="`https://player.vimeo.com/video/${activeVideoId}?quality=720p&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1`"
            class="h-full w-full"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            :title="rt(active.title)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
