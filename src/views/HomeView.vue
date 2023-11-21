<script setup>
import ContractForm from '@/components/ContractForm.vue'
import Calculation from '@/components/Calculation.vue'
</script>

<template>
  <main>
    <ContractForm @input-updated="updateOutput"  />
    <Calculation />
  </main>
</template>


<script>
export default {
  components: {
    ContractForm,
    Calculation
  },
  methods: {
    updateOutput(value) {
      // Handle the value here if needed in the parent component
      console.log('Received in parent:', value);
    }
  }
}

</script>

<style>
main {
  max-width: 75vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>