<template> 
    <div class="text-center">
        <div v-if="!argent">
            <h1 class="text-6xl font-bold p-5">No ArgentX wallet detected</h1>
            <h2 class="text-2xl font-bold">(You can play with the logo)</h2>
        </div>
        <div v-else-if="!connectedWallet.connectedWallet">
            <h1 class="text-7xl p-5 pt-0 font-bold">Escape Argent</h1>
            <button 
                class="transition duration-300 ease-in-out hover:scale-110 text-white m-4 py-4 p-10 rounded-full" 
                @click=" handleConnect()"
            >
                <div class="text-3xl font-bold">
                    Connect wallet 
                    <ArgentLogo width="36" height="40" fill="#FFFFFF" />
                </div>
            </button>
        </div>
        <div v-else>
            <button 
                class="transition duration-300 ease-in-out hover:scale-110 text-white py-4 px-10 rounded-full fixed right-5 top-5" 
                @click=" handleDisconnect()"
            >
                <div class="text-xl font-bold">
                    Connected with {{ shortAddress }}
                </div>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'ConnectButton',
    }
</script>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { connectedWalletStore } from '@/stores/account'
    import sn from 'get-starknet-core'
    import ArgentLogo from '@/components/simple/ArgentLogo.vue';

    const argent = ref(null);
    const connectedWallet = connectedWalletStore();
    checkHasArgentWallet();

    async function handleDisconnect() {
        sn.disconnect();
        connectedWallet.connectedWallet = null;
    }

    async function checkHasArgentWallet() {
        argent.value = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
    }

    async function handleConnect() {
        sn.enable(argent.value).then( acc => {
            connectedWallet.connectedWallet = acc;
        }).catch(() => {
            // Ignore
        });
    }

    const shortAddress = computed(() => {
        if (connectedWallet.connectedWallet) {
            const address = connectedWallet.connectedWallet.selectedAddress;
            return address.slice(0, 5) + "..." + address.slice(-4);
        }
        return "";
    });
    
</script>