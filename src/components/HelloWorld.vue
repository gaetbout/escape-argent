
<template>
    <div class="flex justify-center">
        <button  @click=" connect()">Connect wallet</button>
    </div>
</template>

<script setup lang="ts">
import { connect, disconnect } from "get-starknet"
</script>

<style>
</style>
