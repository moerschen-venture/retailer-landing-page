// One call per page: title, description, Open Graph and Twitter tags, canonical URL.
// The old Webflow site shipped all of these on every page; the first Nuxt version only set a bare
// <title>. Titles get the " · MachineMaster" suffix from nuxt.config's titleTemplate unless
// `fullTitle` is set (the home page carries the brand name itself).
export interface PageSeo {
  title: string
  description: string
  /** use the title as-is, without the titleTemplate suffix */
  fullTitle?: boolean
  /** absolute or root-relative image; defaults to the shared OG image */
  image?: string
  type?: 'website' | 'article'
}

export function usePageSeo(seo: PageSeo) {
  const route = useRoute()
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string) || 'https://retailer.machinemaster.de'
  const path = route.path.endsWith('/') && route.path !== '/' ? route.path.slice(0, -1) : route.path
  const url = `${siteUrl}${path}`
  const image = seo.image ? (seo.image.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`) : `${siteUrl}/images/og-image.png`

  useSeoMeta({
    title: seo.title,
    titleTemplate: seo.fullTitle ? '%s' : undefined,
    description: seo.description,
    ogTitle: seo.fullTitle ? seo.title : `${seo.title} · MachineMaster`,
    ogDescription: seo.description,
    ogType: seo.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: 'MachineMaster',
    ogLocale: locale.value === 'en' ? 'en_US' : 'de_DE',
    twitterCard: 'summary_large_image',
    twitterTitle: seo.fullTitle ? seo.title : `${seo.title} · MachineMaster`,
    twitterDescription: seo.description,
    twitterImage: image
  })
}
