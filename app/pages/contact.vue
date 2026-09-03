<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('contact.title') })
</script>

<template>
  <div>
    <section class="bg-ink-950 py-20 text-white">
      <div class="container-page max-w-2xl">
        <p class="section-eyebrow text-brand-300">{{ t('contact.eyebrow') }}</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{{ t('contact.title') }}</h1>
        <p class="mt-5 text-lg text-ink-100/80">{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container-page grid max-w-4xl gap-12 lg:grid-cols-2">
        <ContactForm />

        <div class="space-y-6 text-sm text-ink-800/80">
          <div>
            <p class="font-semibold text-ink-900">{{ t('contact.emailLabel') }}</p>
            <a href="mailto:contact@machinemaster.de" class="text-brand-600 hover:underline">contact@machinemaster.de</a>
          </div>
          <div>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="text-brand-600 hover:underline">
              {{ t('contact.instagramLabel') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
