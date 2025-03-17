<template>
    <div align="center" class="centered-img">
        <img :src="src" :alt="alt" :width="width" style="border-radius: 10px;" />
        <p>{{ text }}</p>
    </div>
</template>

<style>
.centered-img>p {
    line-height: 1;
    color: hsl(0, 0%, 30%);
    font-size: 0.9em;

}

.centered-img>img {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}
</style>

<script setup>
import { withBase } from 'vitepress';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '40%',
    },
    text: {
        type: String,
        default: '',
    }
});

const src = withBase(props.src);
const width = props.width;
const alt = props.alt;
const text = props.text;
</script>