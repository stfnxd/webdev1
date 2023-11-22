<script setup>
import ContractForm from '@/components/ContractForm.vue'
import Calculation from '@/components/Calculation.vue'
</script>

<template>
  <main>
    <ContractForm @input-updated="updateValue" />
        <Calculation :receivedValue="receivedValue" />
  </main>
</template>
<script>
import ContractForm from '@/components/ContractForm.vue';
import Calculation from '@/components/Calculation.vue';

export default {
    components: {
        ContractForm,
        Calculation
    },
    data() {
        return {
            receivedValue: '' // Initialize receivedValue
        };
    },
    methods: {
        updateValue(value) {
            console.log('Updating value in ContractCalculation:', value);
            this.receivedValue = value; // Update receivedValue with input value from ContractForm
        }
    }
};
</script>

<style>
main {
  max-width: 75vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>