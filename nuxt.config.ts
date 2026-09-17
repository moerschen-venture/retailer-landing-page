import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],

  css: ['~/assets/css/main.css'],

  // Public site identity: used by @nuxtjs/sitemap (absolute URLs), by usePageSeo (canonical/OG
  // URLs) and by @nuxtjs/i18n (hreflang alternates via i18n.baseUrl below).
  site: {
    url: 'https://retailer.machinemaster.de',
    name: 'MachineMaster'
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://retailer.machinemaster.de'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: false,
    baseUrl: 'https://retailer.machinemaster.de'
  },

  app: {
    head: {
      // lang, canonical and hreflang alternates come per locale from useLocaleHead() in app.vue
      titleTemplate: '%s · MachineMaster',
      link: [
        // the MachineMaster mark from the previous site; the .ico is the fallback for
        // browsers and tools that ignore SVG icons, the PNG is what iOS uses for home-screen icons
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32 48x48' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
        // Brand font used to be the Adobe Fonts (Typekit) kit uml1pam (roc-grotesk + vista-sans,
        // same kit as the previous site) - removed 2026-09-17, Adobe licence ends 2026-09-30.
        // Roc Grotesk is now self-hosted Archivo (Martin, case B) via @font-face in
        // app/assets/css/main.css; vista-sans was never referenced by any font-family here.
      ],
      // Plausible Analytics (hosted, EU, cookieless): the per-site snippet copied verbatim from
      // Plausible Site settings > General > Site installation (October-2025 format) - the async
      // loader plus the inline init, which defines the window.plausible queue itself, so no extra
      // stub is written anywhere. Like the Typekit tags above, this loads on previews and localhost
      // too; that traffic is excluded by hostname in Plausible's Site settings, not in this repo.
      script: [
        { src: 'https://plausible.io/js/pa-rXKknWdUap-pvUrcAxImO.js', async: true },
        {
          innerHTML: [
            'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};',
            'plausible.init()'
          ].join('\n')
        }
      ]
    }
  }
})
