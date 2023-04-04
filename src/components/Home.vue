
<template>
    <div class="flex justify-center">
        <button @click=" handle_connect()">Connect wallet</button>
    </div>

    <div v-if="result">
        <div v-if="has_guardian">USER HAS GUARDIAN TO GET RID OF
            <div class="flex justify-center">
                <div v-if="result">Result: {{ result.selectedAddress }}</div>
            </div>
            <div class="flex justify-center">
                <button @click=" do_trigger_escape()">Escape wallet</button>
            </div>
        </div>
        <div v-else>USER HAS NO GUARDIAN TO GET RID OF ALL NICE
        </div>
    </div>
</template>

<script setup lang="ts">
    import { connect } from "get-starknet"
    import { ref } from 'vue'
    import { Contract, number } from "starknet";


    let result = ref(null);
    let has_guardian = ref(null);

    async function handle_connect() {
        result.value = await connect();
        console.log(result.value);
        get_guardian();
    }

    async function get_guardian(){
        const testAddress = result.value.selectedAddress;

        let a = await result.value.provider.callContract({contractAddress: testAddress, entrypoint:"getGuardian"});
        has_guardian.value = a != 0;
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
