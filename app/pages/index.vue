<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('home.hero.title') })
</script>

<template>
  <div>
    <HeroSection />
    <StatsBar />
    <BrandCarousel />
    <BenefitsGrid i18n-key="home.retailerBenefits" />
    <SolutionsGrid />
    <BenefitsGrid i18n-key="home.customerBenefits" dark />
    <TrialCta />
    <FaqAccordion />
    <PricingTable />
  </div>
</template>
