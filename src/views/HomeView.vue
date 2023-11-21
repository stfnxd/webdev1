<script setup>
import ContractForm from '@/components/ContractForm.vue'
import Calculation from '@/components/Calculation.vue'
</script>

<template>
  <main>
    <ContractForm />
    <Calculation />
  </main>
</template>


<style>
main {
  max-width: 75vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>