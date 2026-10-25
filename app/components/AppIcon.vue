<template>
    <component
        :is="icons[name]"
    />
</template>

<script setup lang="ts">
import { icons } from "~/utils/constants";
import type { IconName } from "~/type";

defineProps({
    name: {
        type: String as () => IconName,
        required: true,
    }
});
</script>