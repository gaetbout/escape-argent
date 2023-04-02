
<template>
    <div class="flex justify-center">
        <button @click=" handle_connect()">Connect wallet</button>
    </div>
    <div v-if="result">Result: {{ result.selectedAddress }}</div>
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
                console.log(this.result.starknet);
            }
        }
    }


</script>

<style>
</style>
