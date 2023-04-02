
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

<script lang="ts">
    import { connect } from "get-starknet"


    export default {
        data() {
            return {
                result: null
            }
        },
        methods: {
            async handle_connect() {
                this.result = await connect();
            },
            async try_lama() {
                await this.result.account.execute(
                    {
                        contractAddress: this.result.selectedAddress,
                        entrypoint: 'triggerEscapeGuardian'
                    });
                    
            },
        }
    }


</script>

<style>
</style>
