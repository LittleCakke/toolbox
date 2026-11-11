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

                <div
                    class="w-full my-2 h-px bg-gray-100 rounded-full"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { toast } from "vue-sonner";
    import AppIcon from "~/components/AppIcon.vue";

    const store = window.electronStore;

    const tabList = [
        {
            label: "关闭应用时操作",
            anchor: "closeOp"
        },

        {
            label: "主题",
            anchor: "theme"
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

    let selectedTab = ref("closeOp");
    let selectedCloseOption = ref("ask");

    const closeOptionChange = (option: string) =>
    {
        if (selectedCloseOption.value !== option)
        {
            selectedCloseOption.value = option;
            toast.success("配置已更新");
        }
    }

    onMounted(async () =>
    {
        await store.set("closeOp", "ask");
        console.log(await store.get("closeOp"));
    });
</script>