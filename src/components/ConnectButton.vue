<template>
    <div class="text-center">
        <div v-if="!argent">
            <h1 class="text-6xl font-bold p-5">No ArgentX wallet detected</h1>
            <h2 class="text-2xl font-bold">(But you can play with the logo)</h2>
        </div>
        <div v-else-if="!connectedStarknet">
            <h1 class="text-7xl p-5 pt-0 font-bold">Escape Argent</h1>
            <button 
                class="transition duration-300 ease-in-out hover:scale-110 text-white m-4 py-4 p-10 rounded-full" 
                @click=" handle_connect()"
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
                @click=" handle_disconnect()"
            >
                <div class="text-xl font-bold">
                    Connected with {{ get_short_address(connectedStarknet.selectedAddress) }}
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
    import { ref } from 'vue'
    import sn from 'get-starknet-core'
    import ArgentLogo from '@/components/simple/ArgentLogo.vue';

    const emits = defineEmits(['connected', 'disconnected']);
    let argent = ref(null);
    let connectedStarknet = ref(null);

    
    checkHasArgentWallet();


    async function handle_disconnect() {
        sn.disconnect();
        connectedStarknet.value = null;
        emits('disconnected');
    }

    async function checkHasArgentWallet() {
        argent.value = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
    }
    
    async function handle_connect() {
        sn.enable(argent.value).then( acc => {
            connectedStarknet.value = acc;
            emits('connected', acc)
        }).catch(() => {
            // Ignore
        });
    }

    function get_short_address(address: string) {
        return address.slice(0, 5) + "..." + address.slice(-4)
    }
</script>