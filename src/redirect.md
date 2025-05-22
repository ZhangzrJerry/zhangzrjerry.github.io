### Redirecting ...

<!-- If there is no response, please click. -->

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link');
    if (link) {
        window.location.href = link;
    } else {
        window.location.replace('/');
    }
});
</script>
