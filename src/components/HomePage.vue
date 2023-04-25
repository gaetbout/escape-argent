<template>
    <ConnectButton @connected="setConnectedStarknet" @disconnected="resetConnectedStarknet" />
    <div v-if="current_guardian"> 
        <EscapeOngoing v-if="escape" :escape="escape" :connected-starknet="connectedStarknet" @freed="current_guardian = null" />
        <TriggerEscape v-else :connected-starknet="connectedStarknet" :guardian="current_guardian" @escaped="get_escape" />
    </div>
    <div v-else>
        <h1 v-if="connectedStarknet" class="text-center text-6xl font-bold p-10">You are free from Argent</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { ConnectedStarknetWindowObject } from 'get-starknet-core';
    // TODO Clean components path?
    import ConnectButton from '@/components/ConnectButton.vue';
    import EscapeOngoing from '@/components/EscapeOngoing.vue';
    import TriggerEscape from '@/components/TriggerEscape.vue';

    let connectedStarknet = ref(null);
    let current_guardian = ref(null);
    let escape = ref(null);


    function setConnectedStarknet(data: ConnectedStarknetWindowObject) {
        connectedStarknet.value = data;
        get_guardian();
        get_escape();
    }

    async function resetConnectedStarknet() {
        connectedStarknet.value = null;
    }

    // TODO Pq tu passse pas ça en dessous plutot que tout refaire?
    async function get_escape(){
        let res = await connectedStarknet.value.provider.callContract({contractAddress: connectedStarknet.value.selectedAddress, entrypoint:"getEscape"});
        escape.value = res.result;
    }

    async function get_guardian(){
        const res = await connectedStarknet.value.provider.callContract({contractAddress: connectedStarknet.value.selectedAddress, entrypoint:"getGuardian"});
        current_guardian.value = res.result[0];
    }

</script>

<style>
button {
    background-color: var(--primary-color);
}

button:hover {
    background-color: var(--primary-color-hover);
}
</style>
