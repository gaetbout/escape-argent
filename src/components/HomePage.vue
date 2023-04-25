<template>
    <ConnectButton />
    <div v-if="currentGuardian"> 
        <EscapeOngoing v-if="escape" :escape="escape" @freed="currentGuardian = null" />
        <TriggerEscape v-else :guardian="currentGuardian" @escaped="getEscape" />
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
    const currentGuardian = ref(null);
    const escape = ref(null);

    
    connectedWallet.$subscribe(() => {
        getGuardian();
        getEscape();
    });

    function getConnectedAccount() {
        return connectedWallet.connectedWallet;
    }
    // TODO Pq tu passse pas ça en dessous plutot que tout refaire?
    async function getEscape(){
        let account = getConnectedAccount();
        if (account) {
            let res = await account.provider.callContract({contractAddress: account.selectedAddress, entrypoint:"getEscape"});
            escape.value = res.result;
        }
    }

    async function getGuardian(){
        let account = getConnectedAccount();
        if (account) {
            const res = await account.provider.callContract({contractAddress: account.selectedAddress, entrypoint:"getGuardian"});
            currentGuardian.value = res.result[0];
        }
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
