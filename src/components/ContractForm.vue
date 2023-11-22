<template>
    <section class="contractForm">
        <h1>Kontrakt</h1>
        <input v-model="inputValue" @input="emitValue" placeholder="bip bip" type="text">
    </section>
</template>
  
<script>
export default {
    name: 'ContractForm',
    data() {
        return {
            inputValue: ''
        };
    },
    methods: {
        emitValue() {
            console.log('Emitting value:', this.inputValue);
            this.$emit('input-updated', this.inputValue); // Emit the input value
        }
    }
}
</script>
  