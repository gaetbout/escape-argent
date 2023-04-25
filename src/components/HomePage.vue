<template>
    <ConnectButton />
    <div v-if="current_guardian"> 
        <EscapeOngoing v-if="escape" :escape="escape" :connected-starknet="connectedStarknet" @freed="current_guardian = null" />
        <TriggerEscape v-else :connected-starknet="connectedStarknet" :guardian="current_guardian" @escaped="get_escape" />
    </div>
    <div v-else>
        <h1 v-if="connectedStarknet" class="text-center text-6xl font-bold p-10">You are free from Argent</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { ConnectedStarknetWindowObject } from 'get-starknet-core';
    // TODO Clean components path?
    import ConnectButton from '@/components/ConnectButton.vue';
    import EscapeOngoing from '@/components/EscapeOngoing.vue';
    import TriggerEscape from '@/components/TriggerEscape.vue';

    const store = useStore();
    const current_guardian = ref(null);
    const escape = ref(null);

    // TODO update ici it iss now using store
    function setConnectedStarknet(data: ConnectedStarknetWindowObject) {
        connectedStarknet.value = data;
        get_guardian();
        get_escape();
    }

    function getConnectedAccount() {
        return store.getters.getConnectedAccount;
    }
    // TODO Pq tu passse pas ça en dessous plutot que tout refaire?
    async function get_escape(){
        let account = getConnectedAccount();
        let res = await account.provider.callContract({contractAddress: account.selectedAddress, entrypoint:"getEscape"});
        escape.value = res.result;
    }

    async function get_guardian(){
        let account = getConnectedAccount();
        const res = await account.provider.callContract({contractAddress: account.selectedAddress, entrypoint:"getGuardian"});
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
