
<template>
    <div class="flex justify-center">
        <button @click=" handle_connect()">Connect wallet</button>
    </div>
    <div class="flex justify-center">
        <div v-if="result">Result: {{ result.selectedAddress }}</div>
    </div>
    <div class="flex justify-center">
        <button @click=" do_trigger_escape()">Escape wallet</button>
    </div>
</template>

<script setup lang="ts">
    import { connect } from "get-starknet"
    import { ref } from 'vue'
    import { Contract, number } from "starknet";


    let result = ref(null);

    async function handle_connect() {
        result.value = await connect();
        console.log(result.value);
        get_guardian();
    }
    
    // Check if there is no guardian ==> Nothing to do

    async function get_guardian(){
        const testAddress = result.value.selectedAddress;

        let a = await result.value.provider.callContract({contractAddress: testAddress, entrypoint:"getGuardian"});
        console.log(a.result[0] != 0);
    }
    
    async function do_trigger_escape() {
        await this.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'triggerEscapeGuardian'
        });   
    }

</script>

<style>
</style>
