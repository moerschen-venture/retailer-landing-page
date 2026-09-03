<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('home.hero.title') })
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
