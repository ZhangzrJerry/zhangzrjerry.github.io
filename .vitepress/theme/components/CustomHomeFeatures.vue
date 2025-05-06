<script setup lang="ts">
import { useData } from 'vitepress'
import CustomCards from './CustomCards.vue'

const { frontmatter: fm } = useData()
</script>

<template>
    <CustomCards v-if="fm.features" class="VPHomeFeatures" :features="fm.features" />
</template>