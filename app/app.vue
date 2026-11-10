<template>
    <div
        class="h-screen w-screen bg-transparent p-8">
        <nuxt-page />

        <toaster
            rich-colors
            position="top-center"
            :toast-options="{
                style: {
                    top: '40px'
                }
            }"
        />
    </div>
</template>

<script setup lang="ts">
    import { Toaster } from "vue-sonner";
</script>