<template>
    <div class="text-center">
        <div v-if="timeleft && timeleft > new Date()">
            <div v-if="escape[1] == '0x1'">
                <h1 class="text-6xl font-bold p-10 ">Escape of the guardian ongoing</h1>
            </div>
            <div v-else-if="escape[1] == '0x2' ">
                <h1 class="text-6xl font-bold p-10 ">Escape of the owner ongoing</h1>
            </div>
            <div v-else>
                <h1 class="text-6xl font-bold p-10 ">That's a new escape type {{ escape[1] }}</h1>
            </div>
            <div> 
                <TimeLeft :deadline-date="timeleft" />
            </div>
        </div>
        <div v-else class="text-center">
            <h1 class="text-6xl font-bold ">You can complete the escape</h1>
            <h2 class="text-xl font-bold p-10 ">Be aware that you won't be able to recover this wallet if you get hacked or lose the Private Key</h2>
            <br>
            <button 
                class="transition duration-300 ease-in-out hover:scale-110 text-white mb-4 py-4 px-10 rounded-full" 
                @click="handleRemoveGuardian()"
            >
                <div class="text-3xl font-bold">
                    I know what I'm doing
                </div>
            </button> 
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import TimeLeft from '@/components/simple/TimeLeft.vue';
    import sn from 'get-starknet-core'
    import { connectedWalletStore } from '@/stores/account';
    
    const emits = defineEmits(['freed']);
    const connectedWallet = connectedWalletStore();

    const props = defineProps({
        escape: {
            type: Object,
            required:true,
        },
    });
    
    setTimeleft();

    function setTimeleft() {
        let timeleft = ref<Date | null>(null);

        let activeAt = props.escape[0];
        if (activeAt != 0) {
            let date = new Date(activeAt * 1000);
            timeleft.value = date;
        }
    }
    
    async function handleRemoveGuardian() {
        // TODO ask for confirmation and say it is very risky
        const account = connectedWallet.connectedWallet;
        if (account) {
            await account.enable();
            await account.account.execute({
                contractAddress: account.selectedAddress,
                entrypoint: 'escapeGuardian',
                calldata:[0],
            })
                .then(() => emits('freed'))
                .catch(async (e:string) => {
                    const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX");
                    sn.enable(argent).then( acc => connectedWallet.connectedWallet = acc);
                });   
        }
    }
</script>

<script lang="ts">
    export default {
        name: 'EscapeOngoing'
    }
</script>