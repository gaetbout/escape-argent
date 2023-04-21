<template>
    <div class="flex justify-center">
        <div class="flex justify-center items-center h-screen">
            <div class="text-center">
                <div v-if="timeleft && timeleft > new Date()">
                    <div v-if="escape[1] == '0x1'">
                        <h1 class="text-6xl font-bold p-10 ">Escape of the guardian ongoing</h1>
                    </div>
                    <div v-else-if="escape[1] == '0x2' ">
                        <h1 class="text-6xl font-bold p-10 ">Escape of the owner ongoing</h1>
                    </div>
                    <div v-else>
                        <h1 class="text-6xl font-bold p-10 ">That's a new escape type {{ escape[1] }}</h1>
                    </div>
                    <div> 
                        <TimeLeft :deadline-date="timeleft" />
                    </div>
                </div>
                <div v-else>
                    <h1 class="text-6xl font-bold ">You can complete the escape</h1>
                    <h2 class="text-22xl font-bold p-10 ">Be aware that you won't be able to recover this wallet if you get hacked or lose the the Private Key</h2>
                    <br>
                    <button 
                        class="transition duration-300 ease-in-out hover:scale-110 text-white mb-4 py-4 px-10 rounded-full" 
                        @click="handle_remove_guardian()"
                    >
                        <div class="text-3xl font-bold">
                            I know what I'm doing
                        </div>
                    </button> 
                </div>
            </div>
        </div>      
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import TimeLeft from '@/components/TimeLeft.vue';
    
    const props = defineProps({
        escape: {
            type: Object,
            required:true,
        },
        result: {
            type: Object,
            required:true,
        },
    });
    
    setTimeleft();

    function setTimeleft() {
        let timeleft = ref<Date | null>(null);

        let activeAt = props.escape[0];
        if (activeAt != 0) {
            let date = new Date(activeAt * 1000);
            console.log(date);
            timeleft.value = date;
        }

    }
    
    async function handle_remove_guardian() {
        console.log(props.result);
        // TODO ask for confirmation and say it is very risky
        await props.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'escapeGuardian',
            calldata:[0],
        });   
    }
</script>

<script lang="ts">
    export default {
        name: 'EscapeOngoing'
    }
</script>