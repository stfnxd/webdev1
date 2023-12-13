import { defineStore } from 'pinia'

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