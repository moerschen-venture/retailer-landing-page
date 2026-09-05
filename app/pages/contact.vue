<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('seo.contact.title'), description: t('seo.contact.description') })
</script>

<template>
  <div>
    <section class="bg-ink-950 py-20 text-white">
      <div class="container-page max-w-2xl">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ t('contact.title') }}</h1>
      </div>
    </section>

    <section class="bg-[#f2f4f7] py-16">
      <div class="container-page grid max-w-4xl gap-12 lg:grid-cols-2">
        <div>
          <p class="text-ink-800/80">{{ t('contact.subtitle') }}</p>

          <a
            href="mailto:contact@machinemaster.de"
            class="mt-6 inline-block font-medium text-brand-600 underline hover:text-brand-700"
          >
            contact@machinemaster.de
          </a>

          <a
            href="https://www.instagram.com/machinemaster.de"
            target="_blank"
            rel="noopener"
            class="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-900/30"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  </div>
</template>
