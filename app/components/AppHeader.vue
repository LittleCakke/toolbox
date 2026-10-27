<template>
    <header
        class="absolute top-0 left-1/2 -translate-x-1/2 z-10 drag w-[calc(100%-64px)] h-[114px]">
        <button
            @click="closeApp"
            class="absolute right-4 top-[55%] -translate-y-1/2 p-2 rounded-full cursor-pointer *:text-gray-400 hover:*:text-gray-800 hover:bg-gray-300 duration-200 z-20 no-drag">
            <app-icon
                class="size-5"
                name="cross"
            />
        </button>
    </header>
</template>

<script setup lang="ts">
    import AppIcon from "~/components/AppIcon.vue";

    const emits = defineEmits(["closeApp"]);

    const closeApp = () =>
    {
        emits("closeApp");
    }
</script>