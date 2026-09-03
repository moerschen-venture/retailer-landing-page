<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('home.hero.title') })
</script>

<template>
  <div>
    <HeroSection />
    <StatsBar />
    <BrandCarousel />
    <BenefitsGrid i18n-key="home.retailerBenefits" icon-prefix="retailer" />
    <SolutionsGrid />
    <BenefitsGrid i18n-key="home.customerBenefits" variant="peach" icon-prefix="customer" />
    <TrialCta />
    <FaqAccordion />
    <PricingTable />
  </div>
</template>
