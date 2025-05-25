<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import CustomCard from './CustomCard.vue'

export interface Card {
    img?: string
    title: string
    details: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}

const props = defineProps<{
    features: Card[]
}>()

const currentIndex = ref(0)
let timer: number | null = null
const slideDirection = ref<'left' | 'right'>('right')
const isAnimating = ref(false)

const currentCard = computed(() => {
    return props.features[currentIndex.value]
})

const nextCard = () => {
    if (isAnimating.value) return
    isAnimating.value = true
    slideDirection.value = 'left'
    currentIndex.value = (currentIndex.value + 1) % props.features.length
    setTimeout(() => {
        isAnimating.value = false
    }, 500)
}

const prevCard = () => {
    if (isAnimating.value) return
    isAnimating.value = true
    slideDirection.value = 'right'
    currentIndex.value = (currentIndex.value - 1 + props.features.length) % props.features.length
    setTimeout(() => {
        isAnimating.value = false
    }, 500)
}

const startAutoRotation = () => {
    if (timer) return
    timer = window.setInterval(() => {
        if (!isAnimating.value) {
            nextCard()
        }
    }, 7500)
}

const stopAutoRotation = () => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

const goToCard = (index: number) => {
    if (isAnimating.value || index === currentIndex.value) return
    isAnimating.value = true
    slideDirection.value = index > currentIndex.value ? 'right' : 'left'
    currentIndex.value = index
    setTimeout(() => {
        isAnimating.value = false
    }, 500)
}

onMounted(() => {
    startAutoRotation()
})

onUnmounted(() => {
    stopAutoRotation()
})
</script>

<template>
    <div v-if="features" class="CustomCards" @mouseenter="stopAutoRotation" @mouseleave="startAutoRotation">
        <div class="container">
            <div class="carousel-container">
                <button class="nav-button prev" @click="prevCard" :disabled="isAnimating">⟨</button>

                <div class="carousel-wrapper">
                    <div class="carousel-item" :class="[slideDirection, { animating: isAnimating }]">
                        <CustomCard :img="currentCard.img" :title="currentCard.title" :details="currentCard.details"
                            :link="currentCard.link" :link-text="currentCard.linkText" :rel="currentCard.rel"
                            :target="currentCard.target" />
                    </div>
                </div>

                <button class="nav-button next" @click="nextCard" :disabled="isAnimating">⟩</button>

                <div class="dots-container">
                    <button v-for="(_, index) in features" :key="index" class="dot"
                        :class="{ active: currentIndex === index }" @click="goToCard(index)"
                        :disabled="isAnimating"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.CustomCards {
    position: relative;
    padding: 0 24px;
}

@media (min-width: 640px) {
    .CustomCards {
        padding: 0 48px;
    }
}

@media (min-width: 960px) {
    .CustomCards {
        padding: 0 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}

.carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    /* min-height: 300px; */
}

.carousel-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.carousel-item {
    width: 100%;
    transition: transform 0.5s ease;
    position: relative;
}

.carousel-item.left {
    animation: slideLeft 0.5s ease;
}

.carousel-item.right {
    animation: slideRight 0.5s ease;
}

@keyframes slideLeft {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideRight {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--vp-c-text-2);
    opacity: 0;
    width: 40px;
    height: 100%;
    font-size: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
    z-index: 10;
}

.nav-button:hover {
    opacity: 1;
    transition: opacity 0.2s ease;
}

.nav-button:disabled {
    opacity: 0.3;
}

@media (max-width: 640px) {
    .nav-button {
        width: 30px;
        font-size: 24px;
    }

}

.prev {
    left: -3px;
}

.next {
    right: -3px;
}

.arrow {
    font-size: 20px;
    line-height: 1;
}

.dots-container {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vp-c-text-1);
    opacity: 0.4;
    border: none;
    cursor: pointer;
    transition: all 0.1s ease;
    padding: 0;
}

@media (max-width: 640px) {
    .dot {
        width: 5px;
        height: 5px;
    }

}

.dot:hover {
    opacity: 0.8;
}

.dot.active {
    opacity: 1;
    transform: scale(1.2);
}

.dot:disabled {
    opacity: 0.2;
}
</style>