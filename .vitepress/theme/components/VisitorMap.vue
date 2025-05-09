<template>
    <div class="visitor-map">
        <div id="clustrmaps-container"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'clustrmaps'
    script.src = '//clustrmaps.com/map_v2.js?d=N1xcGfMiyGqEOR9TZz2PRIL6pBhRmMh98RoCJonFmW4&cl=ffffff&w=a'
    document.getElementById('clustrmaps-container').appendChild(script)
})

onUnmounted(() => {
    const script = document.getElementById('clustrmaps')
    if (script) {
        script.remove()
    }
})
</script>

<style scoped>
.visitor-map {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}

#clustrmaps-container {
    min-height: 200px;
}
</style>