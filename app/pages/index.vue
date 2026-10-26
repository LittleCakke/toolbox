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
                    v-for="item in menuList"
                    :class="route.fullPath === item.path ? [
                        'bg-blue-500',
                        '*:text-white'
                    ].join(' ') : [
                        '*:text-gray-600',
                        'hover:*:text-blue-500',
                        'hover:bg-blue-500/10',
                        'duration-200',
                        'cursor-pointer'
                    ].join(' ')"
                    class="pl-8 w-full py-3 rounded-r-full flex items-center gap-3">
                    <app-icon
                        :name="item.icon"
                        class="size-6"
                    />

                    <span>
                        {{item.label}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AppHeader from "~/components/AppHeader.vue";
    import AppIcon from "~/components/AppIcon.vue";
    import type { MenuItem } from "~/type";

    const route = useRoute();

    const menuList: MenuItem[] = [
        {
            label: "首页",
            icon: "category",
            path: "/home"
        },

        {
            label: "剪贴板",
            icon: "order",
            path: "/clipboard"
        }
    ];
</script>