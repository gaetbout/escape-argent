<template>
    <component
        :is="modelViewer" 
        class="w-full h-2/5 absolute top-0"
        shadow-intensity="0.1" 
        shadow-softness="1" 
        model-is-visible="false"
        camera-controls 
        auto-rotate="true"
    />
</template>

<script setup lang="ts">
    import { h, } from 'vue';
    import('@google/model-viewer');

    const modelViewer = h('model-viewer', {
        alt: 'Argent-logo',
        src: 'Scene.glb',
    });

</script>

<style>
model-viewer::part(default-progress-bar) {
    display: none;
}
</style>