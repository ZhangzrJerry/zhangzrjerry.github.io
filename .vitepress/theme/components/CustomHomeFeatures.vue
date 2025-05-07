<script setup lang="ts">
import { useData } from 'vitepress'
import CustomFeatures from './CustomFeatures.vue'

const { frontmatter: fm } = useData()
</script>

<template>
    <CustomFeatures v-if="fm.features" class="CustomFeatures" :features="fm.features" />
</template>