<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('seo.home.title'), description: t('seo.home.description'), fullTitle: true })
</script>

<template>
  <div>
    <HeroSection />
    <StatsBar />
    <BrandCarousel />
    <BenefitsGrid i18n-key="home.retailerBenefits" icon-prefix="retailer" image="retailer-benefits.jpg" />
    <SolutionsGrid />
    <BenefitsGrid i18n-key="home.customerBenefits" variant="peach" icon-prefix="customer" image="customer-benefits.jpg" />
    <TrialCta />
    <FaqAccordion />
    <PricingTable />
  </div>
</template>
