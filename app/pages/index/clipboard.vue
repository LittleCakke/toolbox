<template>
    剪贴板
</template>

<script setup lang="ts">
    const { clipboard } = navigator;
    const { ipcRenderer, api } = window;
    let timer: NodeJS.Timeout;
    let lastClipboardContent = ref("");

    const watchClipboard = async () =>
    {
        await clipboard.readText()
        timer = setInterval(() =>
        {}, 1000);
    }

    onMounted(async () =>
    {
        //await watchClipboard();
        await api.fetchInitContentFromClipboard(v =>
        {
        console.log("执行")
            console.log(v);
        })
    });

    onBeforeUnmount(() =>
    {
        if (timer)
            clearInterval(timer);
    });
</script>