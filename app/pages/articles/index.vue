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
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ t('articles.title') }}</h1>
      </div>
    </section>

    <section class="bg-[#f2f4f7] py-16">
      <div class="container-page">
        <div class="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
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
      </div>
    </section>
  </div>
</template>
