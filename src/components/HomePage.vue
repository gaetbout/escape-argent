<template>
    <div v-if="!result" class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="text-7xl font-bold p-10 ">Escape Argent</h1>
            <button class="transition duration-300 ease-in-out hover:scale-110 text-white  py-4 px-10 rounded-full" @click=" handle_connect()">
                <div class="text-3xl font-bold">
                    Connect wallet <ArgentLogo width="36" height="40" fill="#FFFFFF" />
                </div>
            </button>
        </div>
    </div>
    <div v-else class="flex justify-center">
        <button 
            class="transition duration-300 ease-in-out hover:scale-110 text-white py-4 px-10 rounded-full fixed right-4 top-4" 
            @click=" handle_disconnect()"
        >
            <div class="text-xl font-bold">
                Connected with {{ get_short_address(result.selectedAddress) }}
            </div>
        </button>
        <!-- TODO Review if else logic and split into components -->
        <div v-if="current_guardian">
            <EscapeOngoing v-if="escapeType" :escapeType="escapeType" :result="result" />
            <TriggerEscape v-else :result="result" :guardian="current_guardian" />
            <!-- <div v-else>
                <input v-model="new_guardian" placeholder="New guardian (0x...)">
                <br>
                <button @click="handle_escape_guardian()">Change guardian to {{ new_guardian }}</button>
                <button @click="handle_remove_guardian()">I don't need guardian</button>
            </div> -->
        </div>
        <div v-else class="flex justify-center items-center h-screen">
            <div class="text-center">
                <h1 class="text-6xl font-bold p-10 ">You are already freed from Argent</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { number } from 'starknet'
    import sn from 'get-starknet-core'
    // TODO Clean components path?
    import ArgentLogo from '@/components/ArgentLogo.vue';
    import EscapeOngoing from '@/components/EscapeOngoing.vue';
    import TriggerEscape from '@/components/TriggerEscape.vue';

    let result = ref(null);
    let current_guardian = ref(null);
    let escapeType = ref(null);
    let timeleft = ref(null);
    let new_guardian = ref(null);

    async function handle_connect() {
        const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
        if (argent) {
            sn.enable(argent).then((acc) => {
                result.value = acc;
                get_guardian();
                get_escape();
            }).catch(() => {
                console.log("You refused");
            });
        } else {
            // TODO Handle this either no wallet or no argent.
        }
    }

    async function handle_disconnect() {
        sn.disconnect();
        result.value = null;
    }

    async function get_escape(){
        const testAddress = result.value.selectedAddress;
        let res = await result.value.provider.callContract({contractAddress: testAddress, entrypoint:"getEscape"});
        let [activeAt, type] = res.result;
        if (activeAt == 0) {
            // No Escape can go on and perform escape
            return;
        }
        escapeType.value = type
        // TODO Do a timer animated
        let date = new Date(activeAt * 1000);
        console.log(date);
        timeleft.value = date;
    }

    async function get_guardian(){
        const res = await result.value.provider.callContract({contractAddress: result.value.selectedAddress, entrypoint:"getGuardian"});
        current_guardian.value = res.result[0];
    }

    async function handle_escape_guardian() {
        if (new_guardian.value == null) {
            // TODO Disable send button
            return;
        }

        let new_guardian_as_felt = number.toFelt(new_guardian.value);
        if (new_guardian_as_felt == "0" ) {
            // TODO Tell the user to use the other path
            return;
        }

        // TODO ensure guardian is valid format!
        await this.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'escapeGuardian',
            calldata:[new_guardian_as_felt],
        });   
    }
    
    async function handle_remove_guardian() {
        // TODO ask for confirmation and say it is very risky
        await this.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'escapeGuardian',
            calldata:[0],
        });   
    }

    function get_short_address(address: string) {
        return address.slice(0, 5) + "..." + address.slice(-4)
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
