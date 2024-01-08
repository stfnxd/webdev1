import { defineStore } from 'pinia'
// Definerer Pinia store
export const useMyStore = defineStore('myStore', {
    state: () => ({
        data: null,
      }),
      actions: {
        setData(data) {
          this.data = data;
        },
      },
})