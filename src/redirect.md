### Redirecting ...

<!-- If there is no response, please click. -->

<script>
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link');
    if (link) {
        window.location.replace(link);
    } else {
        window.location.replace('/');
    }
</script>
