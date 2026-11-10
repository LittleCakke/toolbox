<template>
    <div
        class="size-full flex">
        <ul
            class="w-50 h-full">
            <li
                class="w-full flex px-4 py-2 justify-end text-gray-600 hover:text-gray-800 hover:font-semibold duration-200 text-sm cursor-pointer">
                关闭应用时操作
            </li>
            <li
                class="w-full flex px-4 py-2 justify-end text-gray-600 hover:text-gray-800 hover:font-semibold duration-200 text-sm cursor-pointer">
                主题
            </li>
        </ul>
        <div
            class="grow"></div>
    </div>
</template>

<script setup lang="ts">
    import Store from "electron-store";

    const store = new Store();

    onMounted(() =>
    {
    });
</script>