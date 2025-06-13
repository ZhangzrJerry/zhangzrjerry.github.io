<template>
    <div class="revealjs-container" ref="container">
        <iframe :src="src" frameborder="0" class="revealjs-iframe" :style="{ height: iframeHeight + 'px' }"
            allowfullscreen></iframe>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true
    }
});

const container = ref(null);
const iframeHeight = ref(0);

function updateHeight() {
    if (container.value) {
        const width = container.value.offsetWidth;
        iframeHeight.value = width / 16 * 9;
    }
}

onMounted(() => {
    nextTick(updateHeight);
    window.addEventListener('resize', updateHeight);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateHeight);
});
</script>

<style scoped>
.revealjs-container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.revealjs-iframe {
    width: 100%;
    border: none;
    display: block;
}
</style>