<script setup>
import ContractForm from '@/components/ContractForm.vue'
import Calculation from '@/components/Calculation.vue'
</script>

<template>
    <main>
        
        <section class="josefine">
            <ContractForm @input-updated="updateValue" />
            <Calculation :receivedValue="receivedValue" />
        </section>
        
        <button class="makeContract">Lav tilbudskontrakt</button>
        
    </main>
</template>

<script>

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
}

main section.josefine {
    display: flex;
    justify-content: space-between;
    gap: 50px;
}

main button.makeContract {
    display: block;
    margin: 50px auto;
    padding: 15px 25px;
    font-size: 24px;
    background-color: var(--black-color);
    color: var(--white-color);
    border: none;
}

</style>
