<template>
    <header
        class="drag w-full h-16 z-5 flex items-center justify-between px-4">
        <p
            class="text-2xl font-semibold text-gray-800">
            {{title}}
        </p>

        <button
            @click="closeApp"
            class="rounded-full p-1 cursor-pointer *:text-gray-400 hover:*:text-gray-800 hover:bg-gray-300 duration-200 z-99 no-drag">
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
    defineProps({
        title: {
            type: String,
            required: true,
        }
    });

    const closeApp = () =>
    {
        emits("closeApp");
    }
</script>