<template>
    <Countdown 
        countdown-size="4rem"
        label-size="2rem"
        main-color="hsl(16, 98%, 62%)"
        second-flip-color="hsl(16, 98%, 67%)"
        label-color="black" 
        :labels="labels"
    />
</template>
  
<script lang="ts">
    import {Countdown} from 'vue3-flip-countdown'
    export default {
        name: 'TimeLeft',
        components: {
            Countdown
        }
    }
    
    
</script>

<script setup lang="ts">
    const labels = {days: 'dd',hours: 'hh',minutes: 'mm',seconds: 'ss',};
    
</script>