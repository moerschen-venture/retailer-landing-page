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
    class="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-ink-900/10 bg-white p-5 shadow-xl"
  >
    <p class="text-sm text-ink-800/80">
      {{ t('cookieBanner.text') }}
      <NuxtLink :to="localePath('/data-privacy')" class="font-semibold text-brand-600 hover:underline">
        {{ t('cookieBanner.linkText') }}
      </NuxtLink>
    </p>
    <div class="mt-4 flex gap-3">
      <button type="button" class="btn-secondary flex-1 px-4 py-2 text-xs" @click="setConsent('declined')">{{ t('cookieBanner.decline') }}</button>
      <button type="button" class="btn-primary flex-1 px-4 py-2 text-xs" @click="setConsent('accepted')">{{ t('cookieBanner.accept') }}</button>
    </div>
  </div>
</template>
