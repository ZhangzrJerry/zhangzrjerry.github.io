<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'
import CustomFeature from './CustomFeature.vue'

export interface Feature {
    icon?: DefaultTheme.FeatureIcon
    img?: string
    title: string
    details: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}

const props = defineProps<{
    features: Feature[]
}>()

const grid = computed(() => {
    const length = props.features.length

    if (!length) {
        return
    } else {
        return 'grid-3'
    }

    if (!length) {
        return
    } else if (length === 2) {
        return 'grid-2'
    } else if (length === 3) {
        return 'grid-3'
    } else if (length % 3 === 0) {
        return 'grid-6'
    } else if (length > 3) {
        return 'grid-4'
    }
})
</script>

<template>
    <div v-if="features" class="CustomFeatures">
        <div class="container">
            <div class="items">
                <div v-for="feature in features" :key="feature.title" class="item" :class="[grid]">
                    <CustomFeature :icon="feature.icon" :img="feature.img" :title="feature.title"
                        :details="feature.details" :link="feature.link" :link-text="feature.linkText" :rel="feature.rel"
                        :target="feature.target" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.CustomFeatures {
    position: relative;
    padding: 0 24px;
}

@media (min-width: 640px) {
    .CustomFeatures {
        padding: 0 48px;
    }
}

@media (min-width: 960px) {
    .CustomFeatures {
        padding: 0 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
    margin-bottom: 24px;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
}

.item {
    padding: 8px;
    width: 100%;
}

@media (min-width: 640px) {

    .item.grid-2,
    .item.grid-4,
    .item.grid-6 {
        width: calc(100% / 2);
    }
}

@media (min-width: 768px) {

    .item.grid-2,
    .item.grid-4 {
        width: calc(100% / 2);
    }

    .item.grid-3,
    .item.grid-6 {
        width: calc(100% / 3);
    }
}

@media (min-width: 960px) {
    .item.grid-4 {
        width: calc(100% / 4);
    }
}
</style>