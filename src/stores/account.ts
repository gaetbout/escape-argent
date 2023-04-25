
import { ConnectedStarknetWindowObject } from 'get-starknet-core';
import { defineStore } from 'pinia'

export const connectedWalletStore = defineStore('connectedWallet', {
  state: () => {
    return { 
      connectedWallet: null as ConnectedStarknetWindowObject | null}
  },
})