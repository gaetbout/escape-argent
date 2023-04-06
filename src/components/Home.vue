<template>
    <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="text-8xl font-bold p-10 ">Escape Argent</h1>
            <button class="transition duration-300 ease-in-out hover:scale-110 text-white text-5xl font-bold py-6 px-12 rounded-full" @click=" handle_connect()">
                Connect wallet <ArgentLogo width="48" height="44" fill="#FFFFFF" />
            </button>
        </div>
    </div>
    <div v-if="result" class="flex justify-center">
        <div v-if="has_guardian">
            USER HAS GUARDIAN TO GET RID OF
            <div class="flex justify-center">
                Account: {{ result.selectedAddress }}
            </div>
            <br>
            <div class="flex justify-center">
                <button @click=" handle_trigger_escape()">Escape wallet</button>
            </div>
            <br>
            <div v-if="escape_type" class="flex justify-center">
                <div v-if="escape_type == 1">
                    Escape of the guardian ongoing <br>
                    Timeleft: {{ timeleft }}
                </div>
                <div v-else-if="escape_type == 2">
                    Escape of the signer ongoing <br>
                    Timeleft: {{ timeleft }}
                </div>
                <div v-else>
                    That's a new escape type
                </div>
            </div>
            <div>
                <input v-model="new_guardian" placeholder="New guardian (0x...)">
                <br>
                <button @click="handle_escape_guardian()">Change guardian to {{ new_guardian }}</button>
            </div>
            <div>
                <button @click="handle_remove_guardian()">I don't need guardian</button>
            </div>
        </div>
        <div v-else> 
            USER HAS NO GUARDIAN TO GET RID OF ALL NICE
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { number } from 'starknet'
    import sn from 'get-starknet-core'
    import ArgentLogo from './ArgentLogo.vue';


    let result = ref(null);
    let has_guardian = ref(null);
    let escape_type = ref(null);
    let timeleft = ref(null);
    let new_guardian = ref(null);

    async function handle_connect() {
        const argent = (await sn.getAvailableWallets()).find(wallet => wallet.id === "argentX"  );
        if (argent) {
            sn.enable(argent).then((ag) => {
                result.value = ag;
                get_guardian();
                get_escape();
            }).catch(() => {
                console.log("You refused");
            });
        }else {
            // TODO Handle this either no wallet or no argent.
        }
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
