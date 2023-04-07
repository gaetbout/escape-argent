<template>
    <router-view />
    <ArgentLogo id="bg" width="200vw" height="180vh" fill="hsl(16, 98%, 92%)" />
</template>

<script setup lang="ts">
    import ArgentLogo from '@/components/ArgentLogo.vue';
</script>


<style>
:root {
    --primary-color: hsl(16, 98%, 67%);
    --primary-color-hover: hsl(16, 98%, 57%);
}

#bg {
  position: absolute;
  top:-20vh;
  left:30vw;
  z-index: -1;
}
/* Some resets */
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  overflow: hidden; 
  /* overflow: hidden; TODO RE-ENABLE*/ 
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
