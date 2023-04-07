<template>
    <div>
        <div>
            <h1 class="text-6xl font-bold p-10 ">
                <span> {{ timer.days }} </span>:<span> {{ timer.hours }} </span>:<span> {{ timer.minutes }} </span>:<span> {{ timer.seconds }} </span>
            </h1>
        </div>
    </div>
</template>


<script setup lang="ts">
    import {  watchEffect, onMounted } from "vue";
    import { useTimer } from 'vue-timer-hook';
  

    const props = defineProps({
        timeleft:  {
            type: Number,
            required: true,
        },
    });
    console.log(props.timeleft);
    const time = new Date();
    time.setSeconds(time.getSeconds() + props.timeleft); // 10 minutes timer
    // console.log(time);
    const timer = useTimer(time);

    onMounted(() => {
        watchEffect(async () => {
            if(timer.isExpired.value) {
                console.warn('IsExpired')
            }
        })
    })
</script>