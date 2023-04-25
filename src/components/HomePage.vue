<template>
    <ConnectButton />
    <div v-if="current_guardian"> 
        <EscapeOngoing v-if="escape" :escape="escape" @freed="current_guardian = null" />
        <TriggerEscape v-else :guardian="current_guardian" @escaped="get_escape" />
    </div>
    <div v-else>
        <h1 v-if="connectedWallet.connectedWallet" class="text-center text-6xl font-bold p-10">You are free from Argent</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref,  } from 'vue'
    // TODO Clean components path?
    import { connectedWalletStore } from '@/stores/account'
    import ConnectButton from '@/components/ConnectButton.vue';
    import EscapeOngoing from '@/components/EscapeOngoing.vue';
    import TriggerEscape from '@/components/TriggerEscape.vue';

    const connectedWallet = connectedWalletStore();
    const current_guardian = ref(null);
    const escape = ref(null);

    
    connectedWallet.$subscribe(() => {
        get_guardian();
        get_escape();
    });

    function getConnectedAccount() {
        return connectedWallet.connectedWallet;
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
