<template>
    <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="text-7xl font-bold p-10 ">Escape Argent</h1>
            <button 
                class="transition duration-300 ease-in-out hover:scale-110 text-white mb-4 py-4 px-10 rounded-full" 
                @click=" handle_connect()"
            >
                <div class="text-3xl font-bold">
                    Connect wallet 
                    <ArgentLogo width="36" height="40" fill="#FFFFFF" />
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
    // TODO Should I also put the Disconnect logic here?
    import sn from 'get-starknet-core'
    import ArgentLogo from '@/components/ArgentLogo.vue';

    const emits = defineEmits(['connected'])

    async function handle_connect() {
        const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
        if (argent) {
            sn.enable(argent).then( acc => {
                emits('connected', acc)
            }).catch(() => {
                console.log("You refused");
            });
        } else {
            // TODO Handle this either no wallet or no argent.
        }
    }
</script>