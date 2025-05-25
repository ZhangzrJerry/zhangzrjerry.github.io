<script setup lang="ts">
import { useData } from 'vitepress'
import CustomHomeFeatures from './CustomHomeFeatures.vue'
import CustomHomeCards from './CustomHomeCards.vue'
import CustomHomeHero from './CustomHomeHero.vue'
import { VPHomeHero } from 'vitepress/theme'

const { frontmatter, theme } = useData()
</script>

<template>
  <div class="CustomHome" :class="{
    'external-link-icon-enabled': theme.externalLinkIcon
  }">
    <CustomHomeHero>
      <slot name="home-hero-before" />
      <template #home-hero-info-before>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info>
        <slot name="home-hero-info" />
      </template>
      <template #home-hero-info-after>
        <slot name="home-hero-info-after" />
      </template>

      <template #home-hero-image>
        <slot name="home-hero-image" />
      </template>
    </CustomHomeHero>
    <slot name="home-hero-after" />

    <CustomHomeCards />

    <slot name="home-features-before" />
    <CustomHomeFeatures>
      <slot name="features" />
    </CustomHomeFeatures>
    <slot name="home-features-after" />

    <!-- <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content class="CustomContent" />
    </VPHomeContent>
    <Content v-else /> -->
  </div>
</template>

<style scoped></style>