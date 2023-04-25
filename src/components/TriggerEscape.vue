<template>
    <div class="flex justify-center">
        <div class="flex justify-center items-center h-screen">
            <div class="flex flex-col items-center">
                <h1 class="text-6xl font-bold p-2">Looks like you want to escape </h1>
                <h2 class="text-5xl font-bold p-5">Current guardian: {{ guardian }}</h2>
                <button 
                    class="transition duration-300 ease-in-out hover:scale-110 text-white m-1 py-4 px-10 rounded-full" 
                    @click=" handle_trigger_escape()"
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

    const emits = defineEmits(['escaped']);

    const props = defineProps({
        result: {
            type: Object,
            required:true,
        },
        guardian: {
            type: String,
            required:true,
        },
    });

    
    async function handle_trigger_escape() {
        // TODO Do loading animation
        await props.result.enable();
        props.result.account.execute({
            contractAddress: props.result.selectedAddress,
            entrypoint: 'triggerEscapeGuardian'
        })
            .then(() => emits('escaped'))
            .catch(async (e:string) => {
                const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX");
                sn.enable(argent).then( acc => props.result = acc);
            });
        // TODO Should trigger animation
    }

</script>

<script lang="ts">
    export default {
        name: 'TriggerEscape'
    }
</script>