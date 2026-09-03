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
  <div
    v-if="visible"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-ink-900/10 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur"
  >
    <div class="container-page flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p class="text-sm text-ink-800/80">
        {{ t('cookieBanner.text') }}
        <NuxtLink :to="localePath('/data-privacy')" class="font-semibold text-brand-600 hover:underline">
          {{ t('cookieBanner.linkText') }}
        </NuxtLink>
      </p>
      <div class="flex flex-shrink-0 gap-3">
        <button type="button" class="btn-secondary" @click="setConsent('declined')">{{ t('cookieBanner.decline') }}</button>
        <button type="button" class="btn-primary" @click="setConsent('accepted')">{{ t('cookieBanner.accept') }}</button>
      </div>
    </div>
  </div>
</template>
