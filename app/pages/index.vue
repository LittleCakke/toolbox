<template>
    <div
        class="size-full bg-gray-100 shadow-xl rounded-md overflow-hidden flex">
        <app-header @close-app="overlayShow = true" />

        <div
            class="w-75 h-full bg-white flex flex-col">
            <div class="w-full h-25"></div>
            <ul
                class="grow pt-4 flex flex-col gap-2 pr-12">
                <li
                    v-for="item in menuList"
                    @click="goTo(item.path)"
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

        <div
            class="grow">
            <header
                class="w-full h-[82px] flex items-center px-8">
                <p
                    class="text-2xl font-semibold text-gray-800">
                    {{title}}
                </p>
            </header>
            <nuxt-page />
        </div>
    </div>

    <transition>
        <overlay
            v-if="overlayShow">
            <div
                class="w-sm aspect-video bg-white relative top-1/2 left-1/2 -translate-1/2 rounded-sm overflow-hidden p-6 flex flex-col gap-y-4">
                <p
                    class="text-xl text-gray-800 font-semibold">
                    退出
                </p>

                <p
                    class="text-sm text-gray-600">
                    是否确认关闭应用？
                </p>
                <div
                    class="absolute bottom-0 left-0 w-full h-14 flex items-center justify-end gap-4 px-4">
                    <button
                        @click="overlayShow = false"
                        class="text-gray-500 hover:text-gray-800 duration-100 text-sm cursor-pointer">
                        取消
                    </button>
                    <button
                        @click="closeApp"
                        class="rounded-sm px-3 py-1.5 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white duration-100 text-sm cursor-pointer">
                        确定
                    </button>
                </div>
            </div>
        </overlay>
    </transition>
</template>

<script setup lang="ts">
    import { ipcRenderer } from "electron";
    import AppHeader from "~/components/AppHeader.vue";
    import AppIcon from "~/components/AppIcon.vue";
    import Overlay from "~/components/Overlay.vue";
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
        },

        {
            label: "笔记",
            icon: "notepad-text",
            path: "/notes"
        },

        {
            label: "工具箱",
            icon: "tools",
            path: "/toolbox"
        },

        {
            label: "项目模板",
            icon: "code",
            path: "/project-templates"
        },

        {
            label: "文件传输",
            icon: "file-sync",
            path: "/file-transfer"
        }
    ];

    let title = ref("");
    let overlayShow = ref(false);

    const goTo = (path: string) =>
    {
        if (route.fullPath !== path)
            navigateTo(path);
    }

    const closeApp = () =>
    {
        ipcRenderer.invoke("closeApp");
    }

    watch(() => route.fullPath, v =>
    {
        let t = menuList.filter(i => i.path === v)[0]?.label;
        title.value = `${t}`;
    }, {
        immediate: true,
    });
</script>