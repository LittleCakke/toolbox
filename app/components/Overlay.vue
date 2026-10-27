<template>
    <div
        :class="[
            'size-[calc(100%-64px)]',
            'bg-black/35',
            'absolute',
            'top-1/2',
            'left-1/2',
            '-translate-1/2',
            'z-888',
            'rounded-md',
        ].join(' ')">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>