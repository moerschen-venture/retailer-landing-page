<script setup lang="ts">
const { t } = useI18n()

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

async function handleSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  status.value = 'submitting'

  try {
    await $fetch('/', {
      method: 'POST',
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    status.value = 'success'
    form.reset()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <form
      v-if="status !== 'success'"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="space-y-5"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="firstName" class="block text-sm font-medium text-ink-900">{{ t('contact.form.firstName') }}</label>
          <input id="firstName" name="firstName" type="text" required class="mt-1.5 w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-ink-900">{{ t('contact.form.lastName') }}</label>
          <input id="lastName" name="lastName" type="text" required class="mt-1.5 w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="email" class="block text-sm font-medium text-ink-900">{{ t('contact.form.email') }}</label>
          <input id="email" name="email" type="email" required class="mt-1.5 w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-ink-900">{{ t('contact.form.phone') }}</label>
          <input id="phone" name="phone" type="tel" class="mt-1.5 w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        </div>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-ink-900">{{ t('contact.form.message') }}</label>
        <textarea id="message" name="message" rows="5" class="mt-1.5 w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
      </div>

      <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="status === 'submitting'">
        {{ t('contact.form.submit') }}
      </button>

      <p v-if="status === 'error'" class="text-sm text-red-600">{{ t('contact.form.error') }}</p>
    </form>

    <div v-else class="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
      {{ t('contact.form.success') }}
    </div>
  </div>
</template>
