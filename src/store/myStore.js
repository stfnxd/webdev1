import { defineStore } from 'pinia';
// Definerer Pinia store
export const useMyStore = defineStore('myStore', {
    state: () => ({
        data: null,
        dataFromCalculation: null,
    }),
    actions: {
        setData(data) {
            this.data = data;
        },
        setCalculationData(data) {
            this.dataFromCalculation = data;
        },
    },
});
