
<template>
    <div class="flex justify-center">
        <button @click=" handle_connect()">Connect wallet</button>
    </div>
    <div class="flex justify-center">
        <div v-if="result">Result: {{ result.selectedAddress }}</div>
    </div>
    <div class="flex justify-center">
        <button @click=" try_lama()">Escape wallet</button>
    </div>
</template>

<script setup lang="ts">
    import { connect } from "get-starknet"
    import { ref } from 'vue'

    let result = ref(null);

    async function handle_connect() {
        this.result = await connect();
        console.log(this.result)
    }

    // Check if there is no guardian ==> Free

    async function try_lama() {
        await this.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'triggerEscapeGuardian'
        });   
    }

</script>

<style>
</style>
