<template>
    <div class="flex justify-center">
        <div class="flex justify-center items-center h-screen">
            <div class="flex flex-col items-center">
                <h1 class="text-6xl font-bold p-2">Looks like you want to escape </h1>
                <h2 class="text-5xl font-bold p-5">Current guardian: {{ guardian }}</h2>
                <button 
                    class="transition duration-300 ease-in-out hover:scale-110 text-white m-1 py-4 px-10 rounded-full" 
                    @click=" handleTriggerEscape()"
                >
                    <div class="text-xl font-bold">
                        Escape wallet
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import sn from 'get-starknet-core';
    import { connectedWalletStore } from '@/stores/account';
    
    const connectedWallet = connectedWalletStore();
    const emits = defineEmits(['escaped']);

    async function handleTriggerEscape() {
        const account = connectedWallet.connectedWallet;
        // TODO Do loading animation
        if (account) {
            await account.enable();
            account.account.execute({
                contractAddress: account.selectedAddress,
                entrypoint: 'triggerEscapeGuardian'
            })
                .then(() => emits('escaped'))
                .catch(async (e:string) => {
                    const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX");
                    sn.enable(argent).then( acc => connectedWallet.connectedWallet = acc );
                });
        }
    }

</script>

<script lang="ts">
    export default {
        name: 'TriggerEscape'
    }
</script>