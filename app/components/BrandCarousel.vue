<script setup lang="ts">
const { t } = useI18n()

const brands = [
  { name: 'JCB', file: 'jcb.png' },
  { name: 'Kubota', file: 'kubota.png' },
  { name: 'Officine Carraro', file: 'crest.png' },
  { name: 'Kärcher', file: 'kaercher.png' },
  { name: 'Moerschen', file: 'moerschen.png' },
  { name: 'Alkè', file: 'alke.png' }
]
</script>

<template>
  <section class="bg-[#f2f4f7] py-14">
    <div class="container-page">
      <p class="text-center text-sm text-ink-800/60">
        {{ t('home.brands.title') }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        <!-- all six logos sit above the fold and are tiny: no lazy loading, so they paint together -->
        <img
          v-for="brand in brands"
          :key="brand.file"
          :src="`/images/brands/${brand.file}`"
          :alt="brand.name"
          class="h-10 w-auto object-contain"
        />
      </div>
    </div>
  </section>
</template>
