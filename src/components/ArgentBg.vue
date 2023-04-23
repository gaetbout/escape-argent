<template>
    <component
        :is="modelViewer" 
        class="w-1/2 h-2/3 absolute -bottom-10 -right-10"
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