<template>
    <div class="player-bilibili">
        <iframe :src="playerUrl" frameborder="0" allowfullscreen scrolling="no" class="bilibili-iframe"
            :style="{ 'border-radius': borderRadius }"></iframe>
    </div>
</template>

<script>
export default {
    name: "PlayerBilibili",
    props: {
        videoId: {
            type: String,
            required: true,
        },
        borderRadius: {
            type: String,
            default: "15px",
        },
    },
    computed: {
        playerUrl() {
            return `https://player.bilibili.com/player.html?bvid=${this.videoId}`;
        },
    },
};
</script>

<style scoped>
.player-bilibili {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 Aspect Ratio */
    height: 0;
}

.bilibili-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>