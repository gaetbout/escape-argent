<template>
    <ArgentBg />
    <router-view />
</template>

<script setup lang="ts">
import ArgentBg from '@/components/simple/ArgentBg.vue';
</script>


<style>
:root {
    --primary-color: hsl(16, 98%, 67%);
    --primary-color-hover: hsl(16, 98%, 57%);
}

/* Some resets */
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  overflow: hidden; 
  margin: 0;
}
html, body, #app {
  height: 100%;
  font-family: "Barlow", sans-serif;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
</style>
