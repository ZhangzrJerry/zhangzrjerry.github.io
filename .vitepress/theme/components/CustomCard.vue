<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { VPImage, VPLink } from 'vitepress/theme'
import { computed, ref, onMounted, onUnmounted } from 'vue'

defineOptions({
    name: 'CustomCard'
})

const props = defineProps<{
    img?: string
    title: string
    details?: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}>()

const imgRef = ref<HTMLImageElement | null>(null)
const imgWidth = ref(0)

const rightPadding = computed(() => {
    if (!props.img) return '32px'
    return `${imgWidth.value + 16}px`
})

const onImageLoad = () => {
    if (imgRef.value) {
        imgWidth.value = imgRef.value.width
    }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    if (props.img && imgRef.value) {
        resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === imgRef.value) {
                    imgWidth.value = entry.contentRect.width
                }
            }
        })
        resizeObserver.observe(imgRef.value)
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

</script>

<template>
    <VPLink class="CustomCard" :href="link" :rel :target :no-icon="true" :tag="link ? 'a' : 'div'">
        <article class="box" :style="{ paddingRight: rightPadding }">
            <h2 class="title" v-html="title"></h2>
            <p v-if="details" class="details" v-html="details"></p>

            <div v-if="linkText" class="link-text">
                <p class="link-text-value">
                    {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
                </p>
            </div>
        </article>
        <img v-if="img" ref="imgRef" :src="img" :alt="title" class="image" @load="onImageLoad" />
    </VPLink>
</template>

<style scoped>
.CustomCard {
    display: flex;
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
    padding: 24px 32px 32px 32px;
    height: 100%;
    position: relative;
}

.box> :deep(.VPImage) {
    margin-bottom: 20px;
}

.title {
    line-height: 32px;
    font-size: 24px;
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

@media (max-width: 640px) {
    .box {
        padding: 18px 24px 24px 24px;
    }

    .title {
        font-size: 16px;
        line-height: 20px;
    }

    .details {
        display: none;
    }
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

.image {
    position: absolute;
    top: 1px;
    right: 1px;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    mask-image: linear-gradient(90deg,
            transparent 0%,
            var(--vp-c-bg-soft) calc(2%),
            var(--vp-c-bg-soft) calc(100%),
            transparent 100%);
    -webkit-mask-image:
        linear-gradient(90deg,
            transparent 0%,
            var(--vp-c-bg-soft) calc(2%),
            var(--vp-c-bg-soft) calc(100%),
            transparent 100%);
}

@media (max-width: 1080px) {
    .image {
        display: none;
    }

    .box {
        padding-right: 32px !important;
    }
}
</style>