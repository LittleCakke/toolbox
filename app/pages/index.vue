<template>
    <div
        class="size-full bg-gray-100 shadow-xl rounded-md overflow-hidden">
        <app-header />

        <div
            class="w-75 h-full bg-white flex flex-col">
            <div class="w-full h-25 "></div>
            <ul
                class="grow pt-4 flex flex-col gap-2 pr-12">
                <li
                    class="pl-8 w-full bg-blue-500 py-3 rounded-r-full flex items-center gap-3">
                    <app-icon
                        name="category"
                        class="text-white size-6"
                    />

                    <span
                        class="text-white">
                        控制中心
                    </span>
                </li>
                <li
                    class="pl-8 w-full bg-blue-500 py-3 rounded-r-full flex items-center gap-3">
                    <app-icon
                        name="category"
                        class="text-white size-6"
                    />

                    <span
                        class="text-white">
                        控制中心
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AppHeader from "~/components/AppHeader.vue";
    import AppIcon from "~/components/AppIcon.vue";
</script>