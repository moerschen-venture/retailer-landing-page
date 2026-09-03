<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const visible = ref(false)

onMounted(() => {
  try {
    if (!localStorage.getItem('cookie-consent')) {
      visible.value = true
    }
  } catch {
    // localStorage unavailable — skip persisting consent
  }
})

function setConsent(value: 'accepted' | 'declined') {
  visible.value = false
  try {
    localStorage.setItem('cookie-consent', value)
  } catch {
    // ignore
  }
}
</script>

<template>
  <div v-if="visible" class="fixed inset-x-0 bottom-0 z-50 bg-ink-950 text-white">
    <div class="container-page flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
      <p class="text-sm text-white/80">
        {{ t('cookieBanner.text') }}
        <NuxtLink :to="localePath('/data-privacy')" class="font-semibold text-brand-400 underline hover:text-brand-300">
          {{ t('cookieBanner.linkText') }}
        </NuxtLink>
      </p>
      <div class="flex flex-shrink-0 gap-3">
        <button
          type="button"
          class="rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:border-white/60"
          @click="setConsent('declined')"
        >
          {{ t('cookieBanner.decline') }}
        </button>
        <button
          type="button"
          class="rounded-full bg-brand-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-brand-600"
          @click="setConsent('accepted')"
        >
          {{ t('cookieBanner.accept') }}
        </button>
      </div>
    </div>
  </div>
</template>
