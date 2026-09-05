<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const article = useArticle(route.params.slug as string)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

usePageSeo({ title: article.title, description: article.description ?? t('seo.articles.description'), type: 'article', image: article.image })
</script>

<template>
  <article>
    <section class="bg-ink-950 py-16 text-white">
      <div class="container-page max-w-3xl">
        <NuxtLink :to="localePath('/articles')" class="text-sm font-semibold text-brand-500 hover:underline">
          {{ t('common.backToArticles') }}
        </NuxtLink>
        <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{{ article?.title }}</h1>
        <p v-if="article?.description" class="mt-4 text-lg text-white/70">{{ article.description }}</p>
        <img v-if="article?.image" :src="article.image" :alt="article.title" class="mt-8 aspect-[3/1] w-full rounded-lg object-cover" />
      </div>
    </section>

    <section class="bg-[#f2f4f7] py-16">
      <div class="container-page max-w-3xl">
        <div class="rounded-xl bg-white p-8 sm:p-10">
          <div class="prose max-w-none" v-html="article?.html" />
        </div>
      </div>
    </section>
  </article>
</template>
