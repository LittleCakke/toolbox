<template>
    <div
        class="size-full flex gap-4">
        <ul
            class="w-50 h-full border-r border-gray-200">
            <li
                v-for="tab in tabList"
                :key="tab.label"
                :class="tab.anchor === selectedTab ? 'text-blue-500 border-r-4 border-blue-500 cursor-default' : 'text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer'"
                class="w-full flex text-sm py-2 px-4 justify-end duration-200"
                @click="selectedTab = tab.anchor">
                {{tab.label}}
            </li>
        </ul>
        <div
            class="grow">
            <div
                class="w-full bg-white rounded-xl flex flex-col p-8 gap-4 items-center">
                <!-- 关闭应用时操作 -->
                <p
                    class="text-gray-800 text-xl font-semibold w-full">
                    关闭应用时操作
                </p>
                <ul
                    class="w-full flex flex-col gap-y-0.5">
                    <li
                        v-for="option in closeOptions"
                        :key="option.value"
                        @click="closeOptionChange(option.value)"
                        :class="selectedCloseOption === option.value ? '*:text-blue-500' : '*:text-gray-600 hover:bg-blue-500/10 cursor-pointer'"
                        class="flex items-center w-full rounded-lg">
                        <div
                            class="size-8 flex items-center justify-center">
                            <app-icon
                                v-if="selectedCloseOption === option.value"
                                name="check"
                                class="size-5"
                            />
                        </div>
                        <p class="text-sm">
                            {{option.label}}
                        </p>
                    </li>
                </ul>

                <!-- 分割线 -->
                <div
                    class="w-full my-2 h-px bg-gray-100 rounded-full"
                />

                <!-- 主题 -->
                <p
                    class="text-gray-800 text-xl font-semibold w-full">
                    主题
                </p>

                <ul
                    class="w-full grid grid-cols-3 bg-gray-200 rounded-md gap-2 *:text-gray-600 *:text-sm p-2">
                    <li
                        v-for="t in themeOptions"
                        :key="t.value"
                        @click="themeChange(t.value)"
                        :class="t.value === selectedTheme ? 'bg-white text-blue-500! cursor-default' : 'cursor-pointer'"
                        class="py-2 flex justify-center items-center rounded-md gap-2 duration-200">
                        <app-icon
                            :name="t.icon"
                            class="size-4"
                        />
                        <span>
                            {{t.label}}
                        </span>
                    </li>
                </ul>

                <!-- 分割线 -->
                <div
                    class="w-full my-2 h-px bg-gray-100 rounded-full"
                />

                <!-- 开机自启动 -->
                <p
                    class="text-gray-800 text-xl font-semibold w-full">
                    开机自启动
                </p>

                <div
                    class="w-full flex justify-between items-center">
                    <p
                        class="text-gray-600 text-sm">
                        是否将应用设置为随系统启动？
                    </p>

                    <div
                        @click="isStartupWithSysEnabled = !isStartupWithSysEnabled"
                        class="size-5 border border-gray-300 hover:border-gray-600 duration-200 rounded-md cursor-pointer flex items-center justify-center">
                        <app-icon
                            v-if="isStartupWithSysEnabled"
                            name="check"
                            class="size-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { toast } from "vue-sonner";
    import AppIcon from "~/components/AppIcon.vue";
    import type { IconName } from "~/type";

    interface ThemeOption
    {
        label: string;
        value: string;
        icon: IconName;
    }

    const store = window.electronStore;

    const tabList = [
        {
            label: "关闭应用时操作",
            anchor: "closeOp"
        },

        {
            label: "主题",
            anchor: "theme"
        },

        {
            label: "开机自启动",
            anchor: "startWithSys"
        },

        {
            label: "语言",
            anchor: "languages"
        }
    ];

    const closeOptions = [
        {
            label: "直接关闭",
            value: "close",
        },

        {
            label: "关闭前询问",
            value: "ask",
        },

        {
            label: "隐藏到托盘",
            value: "hidden"
        }
    ];

    const themeOptions: ThemeOption[] = [
        {
            label: "浅色",
            icon: "sun",
            value: "light",
        },

        {
            label: "深色",
            icon: "moon",
            value: "dark",
        },

        {
            label: "跟随系统",
            icon: "computer",
            value: "system"
        }
    ]

    let selectedTab = ref("closeOp");
    let selectedCloseOption = ref("");
    let selectedTheme = ref("");
    let isStartupWithSysEnabled = ref(false);

    const closeOptionChange = async (option: string) =>
    {
        if (selectedCloseOption.value !== option)
        {
            selectedCloseOption.value = option;
            toast.success("配置已更新");
            await store.set("closeOp", option);
        }
    }

    const themeChange = async (th: string) =>
    {
        if (selectedTheme.value !== th)
        {
            selectedTheme.value = th;
            toast.success("配置已更新");
            await store.set("theme", th);
        }
    }

    watch(() => isStartupWithSysEnabled.value, async v =>
    {
        await store.set("isStartupWithSys", v);
        toast.success("配置已更新");
    });

    onMounted(async () =>
    {
        selectedCloseOption.value = await store.get("closeOp");
        selectedTheme.value = await store.get("theme");
        isStartupWithSysEnabled.value = await store.get("isStartupWithSys");
    });
</script>