<template>
    <img :src="src" :width="width" class="RightImg" />
</template>

<style>
.RightImg {
    box-shadow: 5px 5px 7.5px 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    float: right;
    margin: 12px;
}
</style>

<script setup>
import { withBase } from 'vitepress';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '30%',
    }
});

const src = withBase(props.src);
const width = props.width;
</script>