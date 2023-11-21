<template>
    <div>
        <ContractForm @input-updated="updateValue" />
        <Calculation :receivedValue="receivedValue" />
    </div>
</template>
  
<script>
import ContractForm from './ContractForm.vue';
import Calculation from './Calculation.vue';

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
  