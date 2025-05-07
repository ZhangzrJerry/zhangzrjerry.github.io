<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { VPImage, VPLink } from 'vitepress/theme'

defineOptions({
    name: 'CustomCard'
})

defineProps<{
    icon?: DefaultTheme.FeatureIcon
    img?: string
    title: string
    details?: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}>()
</script>

<template>
    <VPLink class="CustomCard" :href="link" :rel :target :no-icon="true" :tag="link ? 'a' : 'div'">
        <article class="box">
            <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
                <VPImage :image="icon" :alt="icon.alt" :height="icon.height || 48" :width="icon.width || 48" />
            </div>
            <VPImage v-else-if="typeof icon === 'object'" :image="icon" :alt="icon.alt" :height="icon.height || 48"
                :width="icon.width || 48" />
            <div v-else-if="icon" class="icon" v-html="icon"></div>
            <h2 class="title" v-html="title"></h2>
            <p v-if="details" class="details" v-html="details"></p>

            <div v-if="linkText" class="link-text">
                <p class="link-text-value">
                    {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
                </p>
            </div>
            <!-- <div class="image-container"> -->
            <img v-if="img" :src="img" :alt="title" class="image" />
            <!-- </div> -->
        </article>
    </VPLink>
</template>

<style scoped>
.CustomCard {
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
    overflow: hidden;
}

.CustomCard.link:hover {
    border-color: var(--vp-c-brand-1);
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
    position: relative;
}

.box> :deep(.VPImage) {
    margin-bottom: 20px;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: var(--vp-c-default-soft);
    width: 48px;
    height: 48px;
    font-size: 24px;
    transition: background-color 0.25s;
}

.title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    z-index: 1;
}

.details {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1;
    color: var(--vp-c-text-2);
}

.link-text {
    padding-top: 8px;
}

.link-text-value {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}

.link-text-icon {
    margin-left: 6px;
}

.light {
    --mask-color: #000;
}

.dark {
    --mask-color: #fff;
}

.image {
    position: absolute;
    top: 1px;
    right: 1px;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    mask-image: linear-gradient(90deg,
            transparent 0%,
            var(--mask-color, white) 400px,
            var(--mask-color, white) calc(100%),
            transparent 100%);
    -webkit-mask-image:
        linear-gradient(90deg,
            transparent 0%,
            var(--mask-color, white) 400px,
            var(--mask-color, white) calc(100%),
            transparent 100%);

}

.CustomCard:hover .image {
    opacity: 0.85;
    mask-image: linear-gradient(90deg,
            transparent 0%,
            var(--mask-color, white) 200px,
            var(--mask-color, white) calc(100%),
            transparent 100%);
    -webkit-mask-image:
        linear-gradient(90deg,
            transparent 0%,
            var(--mask-color, white) 200px,
            var(--mask-color, white) calc(100%),
            transparent 100%);
}
</style>