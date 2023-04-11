<template>
    <div class="flex justify-center">
        <div class="flex justify-center items-center h-screen">
            <div class="text-center">
                <div v-if="escape_type == 1">
                    <h1 class="text-6xl font-bold p-10 ">Escape of the guardian ongoing</h1>
                </div>
                <div v-else-if="escape_type == 2">
                    <h1 class="text-6xl font-bold p-10 ">Escape of the signer ongoing</h1>
                </div>
                <div v-else>
                    <h1 class="text-6xl font-bold p-10 ">That's a new escape type {{ escape_type }}</h1>
                </div>
                <div v-if="timeleft"> 
                    <Timer 
                        :deadline-date="timeleft" 
                        countdown-size="4rem"
                        label-size="2rem"
                        main-color="hsl(16, 98%, 62%)"
                        second-flip-color="hsl(16, 98%, 67%)"
                        label-color="hsl(16, 98%, 57%)"
                    />
                    <!-- main-flip-background-color="blue"
                    second-flip-background-color="purple" -->
                </div>
            </div>
        </div>      
    </div>
</template>

<script setup lang="ts">
    import { number } from 'starknet';
    import { ref } from 'vue'
    import Timer from '@/components/Timer.vue';
    
    const props = defineProps({
        escape_type: number,
        result: Object,
    });

    let timeleft = ref(null);
    
    get_escape()
    async function get_escape(){
        console.log(props.result);
        const testAddress = props.result.selectedAddress;
        let res = await props.result.provider.callContract({contractAddress: testAddress, entrypoint:"getEscape"});
        let [activeAt, type] = res.result;
        if (activeAt == 0) {
            // No Escape can go on and perform escape
            return;
        }
        // TODO Do a timer animated
        let date = new Date(activeAt * 1000);
        console.log(date);
        timeleft.value = date;
    }

</script>