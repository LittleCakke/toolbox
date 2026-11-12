<template>
    <button @click="test">测试</button>
</template>

<script setup lang="ts">
    const test = async () =>
    {
        let ipList = await window.ipcRenderer.invoke("getLocalIPList");
        console.log(ipList);
    }

    onMounted(async () =>
    {
    });
</script>