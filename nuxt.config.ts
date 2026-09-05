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
        // the MachineMaster mark from the previous (Webflow) site; the .ico is the fallback for
        // browsers and tools that ignore SVG icons, the PNG is what iOS uses for home-screen icons
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32 48x48' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Brand fonts: the Adobe Fonts (Typekit) kit the MachineMaster apps use - roc-grotesk + vista-sans
        // (kit uml1pam, same as the previous Webflow site). Adobe Fonts sets no cookies; the kit has no
        // domain restriction (checked 2026-09-05), so previews and localhost render it too.
        { rel: 'preconnect', href: 'https://use.typekit.net', crossorigin: '' },
        { rel: 'preconnect', href: 'https://p.typekit.net', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/uml1pam.css' }
      ]
    }
  }
})
