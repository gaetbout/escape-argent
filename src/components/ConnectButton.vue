<template>
    <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <div v-if="error">
                <h1 class="text-7xl font-bold p-10 ">No ArgentX wallet installed</h1>
            </div>
            <div v-else>
                <h1 class="text-7xl p-5 font-bold">Escape Argent</h1>
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
    import { ref } from 'vue'
    import sn from 'get-starknet-core'
    import ArgentLogo from '@/components/ArgentLogo.vue';

    const emits = defineEmits(['connected']);
    let error = ref(null);

    async function handle_connect() {
        const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
        if (argent) {
            sn.enable(argent).then( acc => {
                emits('connected', acc)
            }).catch(() => {
                // Ignore
            });
        } else {
            error.value = true;
        }
    }
</script>