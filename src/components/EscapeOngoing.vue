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
                    <input v-model="new_guardian" placeholder="New guardian (0x...)">
                    <br>
                    <!-- <button @click="handle_escape_guardian()">Change guardian to {{ new_guardian }}</button>
                    <button @click="handle_remove_guardian()">I don't need guardian</button> -->
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

    let timeleft = ref<Date | null>(null);
    let new_guardian = ref(null);
    
    let activeAt = props.escape[0];
    if (activeAt != 0) {
        let date = new Date(activeAt * 1000);
        console.log(date);
        timeleft.value = date;
    }
    

    // async function handle_escape_guardian() {
    //     if (new_guardian.value == null) {
    //         // TODO Disable send button
    //         return;
    //     }

    //     let new_guardian_as_felt = number.toFelt(new_guardian.value);
    //     if (new_guardian_as_felt == "0" ) {
    //         // TODO Tell the user to use the other path
    //         return;
    //     }

    //     // TODO ensure guardian is valid format!
    //     await this.result.account.execute({
    //         contractAddress: this.result.selectedAddress,
    //         entrypoint: 'escapeGuardian',
    //         calldata:[new_guardian_as_felt],
    //     });   
    // }
    
    // async function handle_remove_guardian() {
    //     // TODO ask for confirmation and say it is very risky
    //     await this.result.account.execute({
    //         contractAddress: this.result.selectedAddress,
    //         entrypoint: 'escapeGuardian',
    //         calldata:[0],
    //     });   
    // }
</script>

<script lang="ts">
    export default {
        name: 'EscapeOngoing'
    }
</script>