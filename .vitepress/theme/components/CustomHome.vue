<script setup lang="ts">
import { VPHomeHero, VPHomeFeatures, VPHomeContent } from 'vitepress/theme'
import { useData } from 'vitepress'
import CustomHomeFeatures from './CustomHomeFeatures.vue'

const { frontmatter, theme } = useData()
</script>

<template>
  <div class="CustomHome" :class="{
    'external-link-icon-enabled': theme.externalLinkIcon
  }">
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info>
        <slot name="home-hero-info" />
      </template>
      <template #home-hero-info-after>
        <slot name="home-hero-info-after" />
      </template>
      <template #home-hero-actions-after>
        <slot name="home-hero-actions-after" />
      </template>
      <template #home-hero-image>
        <slot name="home-hero-image" />
      </template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <CustomHomeFeatures>
      <slot name="features" />
    </CustomHomeFeatures>
    <slot name="home-features-after" />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </div>
</template>

<style scoped>
.CustomHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .CustomHome {
    margin-bottom: 128px;
  }
}
</style>