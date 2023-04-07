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
        <button class="transition duration-300 ease-in-out hover:scale-110 text-white py-4 px-10 rounded-full fixed right-4 top-4" @click=" handle_disconnect()">
            <div class="text-xl font-bold">
                Connected with {{ address }}
            </div>
        </button>
        <!-- TODO Review if else logic and split into components -->
        <div v-if="has_guardian">
            <div v-if="!escape_type" class="flex justify-center">
                USER HAS GUARDIAN TO GET RID OF
                <button @click=" handle_trigger_escape()">Escape wallet</button>
            </div>
            <div v-if="escape_type" class="flex justify-center">
                <div class="flex justify-center items-center h-screen">
                    <div class="text-center">
                        <div v-if="escape_type == 1">
                            <h1 class="text-6xl font-bold p-10 ">Escape of the guardian ongoing</h1>
                            Timeleft: {{ timeleft }}
                        </div>
                        <div v-else-if="escape_type == 2">
                            <h1 class="text-6xl font-bold p-10 ">Escape of the signer ongoing</h1>
                            Timeleft: {{ timeleft }}
                        </div>
                        <div v-else>
                            <h1 class="text-6xl font-bold p-10 ">That's a new escape type</h1>
                        </div>
                    </div>
                </div>      
            </div>
            <div v-else>
                <input v-model="new_guardian" placeholder="New guardian (0x...)">
                <br>
                <button @click="handle_escape_guardian()">Change guardian to {{ new_guardian }}</button>
                <button @click="handle_remove_guardian()">I don't need guardian</button>
            </div>
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
    import ArgentLogo from '@/components/ArgentLogo.vue';

    let address = ref(null);
    let result = ref(null);
    let has_guardian = ref(null);
    let escape_type = ref(null);
    let timeleft = ref(null);
    let new_guardian = ref(null);

    async function handle_connect() {
        const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
        if (argent) {
            sn.enable(argent).then((acc) => {
                result.value = acc;
                address.value = acc.selectedAddress.slice(0, 6) + "..." + acc.selectedAddress.slice(-3); 
                get_guardian();
                get_escape();
            }).catch(() => {
                console.log("You refused");
            });
        }else {
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
        escape_type.value = type
        let block = await result.value.provider.getBlock();
        let timestamp = block.timestamp;
        // TODO Do a timer animated
        timeleft.value = secondsToDhms(activeAt - timestamp);
    }

    async function get_guardian(){
        const testAddress = result.value.selectedAddress;
        has_guardian.value = await result.value.provider.callContract({contractAddress: testAddress, entrypoint:"getGuardian"});
    }
    
    async function handle_trigger_escape() {
        await this.result.account.execute({
            contractAddress: this.result.selectedAddress,
            entrypoint: 'triggerEscapeGuardian'
        });   
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
    handle_remove_guardian

    function secondsToDhms(seconds: number) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
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
