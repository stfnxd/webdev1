<template>
    <div>
        <ContractForm @input-updated="updateValue" />
        <Calculation :inputValue="receivedValue" />
    </div>
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
            this.receivedValue = value; // Update receivedValue with input value from ContractForm
        }
    }
};
</script>
  