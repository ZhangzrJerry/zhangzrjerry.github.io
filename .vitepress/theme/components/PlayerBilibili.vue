<template>
    <div class="player-bilibili"
        :style="{ width: width, paddingBottom: aspectRatioPadding, 'float': float, margin: margin }">
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
        float: {
            type: String,
            default: "none",
        },
        width: {
            type: String,
            default: "100%",
        },
        margin: {
            type: String,
            default: "0px",
        }
    },
    computed: {
        playerUrl() {
            return `https://player.bilibili.com/player.html?bvid=${this.videoId}`;
        },
        aspectRatioPadding() {
            // 16:9 aspect ratio -> 9 / 16 = 56.25%
            return 0.5625 * parseFloat(this.width) + "%";
        },
    },
};
</script>

<style scoped>
.player-bilibili {
    position: relative;
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