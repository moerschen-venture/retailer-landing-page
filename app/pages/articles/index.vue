<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: t('articles.title') })

const articles = useArticles()
</script>

<template>
  <div>
    <section class="bg-ink-950 py-20 text-white">
      <div class="container-page max-w-2xl">
        <p class="section-eyebrow text-brand-300">{{ t('articles.eyebrow') }}</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{{ t('articles.title') }}</h1>
        <p class="mt-5 text-lg text-ink-100/80">{{ t('articles.subtitle') }}</p>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container-page">
        <div v-if="articles.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            v-for="article in articles"
            :key="article.slug"
            :title="article.title"
            :description="article.description"
            :image="article.image"
            :path="localePath(`/articles/${article.slug}`)"
          />
        </div>
        <p v-else class="text-ink-800/60">{{ t('articles.subtitle') }}</p>
      </div>
    </section>
  </div>
</template>
