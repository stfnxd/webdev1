
<template>
    <main>
        <form @submit.prevent="submitForm" id="myForm">
        
            <section class="josefine">
                <ContractForm @input-updated = "updateValue" />
                <Calculation :receivedValue = "receivedValue" />
            </section>
        
            <button type="submit" class="makeContract">Lav tilbudskontrakt</button>
        
        </form>
    </main>
</template>

<script>
import { reactive } from 'vue';
import ContractForm from '@/components/ContractForm.vue';
import Calculation from '@/components/Calculation.vue';
import axios from 'axios';

export default {
  components: {
    ContractForm,
    Calculation,
  },
  setup() {
    const state = reactive({
      receivedValue: '',
      formData: {
        retailPrice: null, 
        costPrice: null, 
        estimatedTradeValue: null,
        residualValueStart: null, 
        cashPrice: null, 
        runningTime: null, 
        activeRunningTime: null,
        interestRate: null,
        contractCreation: null,
        oneTimeBenefit: null,
        deposit: null,
        depreciation: null,
        privateShare: null,
        estimatedRegistrationFee: null,
      },
    });

    const updateValue = (value) => {
      console.log('Updating value in ContractCalculation:', value);
      state.receivedValue = value;
      state.formData = value;
    };

    const submitForm = async () => {
      try {
        // Make API call to addKontraktværdier endpoint
        const response = await axios.post('http://localhost:5174/api/kontraktVaerdier/add', state.formData);
        
        // Handle the response as needed
        console.log('API Response:', response.data);

        // Additional logic if needed based on the response
        } catch (error) {
        console.error('Error making API call:', error);
        // Handle the error, e.g., show an error message to the user
        }
    };

    return {
      state,
      updateValue,
      submitForm,
    };
  },
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
}

main button.makeContract {
    display: block;
    margin: 50px auto;
    padding: 15px 25px;
    font-size: 24px;
    background-color: var(--black-color);
    color: var(--white-color);
    border: none;
    width: 40%;
}

</style>
