<template>
    <div
        class="size-full bg-gray-100 shadow-xl rounded-md overflow-hidden flex">
        <div
            :class="collapsed ? 'w-20' : 'w-75'"
            class="h-full bg-white flex flex-col shadow-lg rounded-r-xl duration-200">
            <div
                @click="collapsed = !collapsed"
                :class="collapsed ? 'justify-center' : 'pl-4'"
                class="w-full h-25 z-75 flex items-center gap-4">
                <app-icon
                    name="3d"
                    class="size-16"
                />

                <div
                    v-if="!collapsed"
                    class="flex flex-col gap-1">
                    <p
                        class="text-gray-800 font-semibold text-xl">
                        多功能工具箱
                    </p>

                    <p class="text-gray-600 text-sm">
                        Multifunctional Toolbox
                    </p>
                </div>
            </div>
            <ul
                class="grow pt-4 flex flex-col gap-2 pb-8"
                :class="collapsed ? 'items-center' : 'pr-12'">
                <li
                    v-for="item in menuList"
                    @click="goTo(item.path)"
                    :class="[(route.fullPath === item.path ? [
                        'bg-blue-500',
                        '*:text-white'
                    ] : [
                        '*:text-gray-600',
                        'hover:*:text-blue-500',
                        'hover:bg-blue-500/10',
                        'duration-200',
                        'cursor-pointer'
                    ]).join(' '), (collapsed ? [
                        'rounded-full',
                        'p-3',
                        'group',
                        'relative',
                        'z-20'
                    ] : [
                        'rounded-r-full',
                        'pl-8',
                        'py-3',
                        'w-full'
                    ]).join(' ')].join(' ')"
                    class="flex items-center gap-3 last:mt-auto duration-200">
                    <app-icon
                        :name="item.icon"
                        class="size-6"
                    />

                    <span
                        v-if="!collapsed">
                        {{item.label}}
                    </span>

                    <div
                        class="hidden group-hover:inline-block absolute top-0 left-[calc(100%+32px)] whitespace-nowrap z-999 p-4 rounded-md bg-gray-800 text-white! text-sm">
                        {{item.label}}
                    </div>
                </li>
            </ul>
        </div>

        <div
            class="grow flex flex-col">
            <app-header
                :title="title"
                @close-app="overlayShow = true"
            />
            <div
                class="grow px-4 pb-4">
                <nuxt-page />
            </div>
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
        },

        {
            label: "密码管理",
            icon: "fingerprint",
            path: "/password-management"
        },

        {
            label: "设置",
            icon: "setting",
            path: "/settings"
        }
    ];

    let title = ref("");
    let overlayShow = ref(false);
    let collapsed = ref(true);

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

    onMounted(() =>
    {
        //collapsed.value = false;
    });
</script>