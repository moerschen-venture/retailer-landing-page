<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const article = useArticle(route.params.slug as string)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead({ title: article.title })
</script>

<template>
  <article>
    <section class="bg-ink-950 py-16 text-white">
      <div class="container-page max-w-3xl">
        <NuxtLink :to="localePath('/articles')" class="text-sm font-semibold text-brand-300 hover:underline">
          ← {{ t('common.backToArticles') }}
        </NuxtLink>
        <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{{ article?.title }}</h1>
      </div>
    </section>

    <div v-if="article?.image" class="container-page -mt-8 max-w-3xl">
      <img :src="article.image" :alt="article.title" class="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
    </div>

    <section class="bg-white py-16">
      <div class="container-page max-w-3xl">
        <div class="prose max-w-none" v-html="article?.html" />
      </div>
    </section>
  </article>
</template>
