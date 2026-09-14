// Plausible custom events. The one place that knows the four event names and that we never send
// event properties: trackEvent() passes exactly one argument, the name.
// The per-site snippet in nuxt.config's app.head defines window.plausible (and its queue) in the
// head before any component code runs, so a click that happens before the async loader has finished
// is queued and replayed. During SSR and the prerender there is no window, so this is a no-op.
export const PLAUSIBLE_EVENTS = {
  contactFormSubmitted: 'Contact Form Submitted',
  pricingCtaClick: 'Pricing CTA Click',
  trialCtaClick: 'Trial CTA Click',
  retailerLoginClick: 'Retailer Login Click'
} as const

export type PlausibleEvent = (typeof PLAUSIBLE_EVENTS)[keyof typeof PLAUSIBLE_EVENTS]

declare global {
  interface Window {
    plausible?: (event: PlausibleEvent) => void
  }
}

export function trackEvent(name: PlausibleEvent) {
  if (typeof window === 'undefined') return
  window.plausible?.(name)
}
