
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
        formDataFirstAPI: {
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
        estimatedTaxTrade: null,
      },
    });

    const stateVehicle = reactive({
      receivedVehicleValue: '',
        formDataSecondAPI: {
        car: null,
        NyBilCheckbox: null,
        firstRegistrationDate: null,
        estimatedRegistrationFee: null,
        momsdødCheckbox: null,
        afgiftCheckbox: null,
        mileage: null
      },
    });
    const stateCustomer = reactive({
      receivedCustomerValue: '',
      formDataThirdAPI: {
      Kundename: null,
      FemOgTyveCheckbox: null,
      selectCustomerType: null,
      selectContractType: null,  
      expectedStartDate: null,
      checkboxSeason: null,
      checkboxImport: null,
      },
    });

    const updateValue = (value, vehicleValue, customerValue) => {
      console.log('Updating value in ContractCalculation:', value, vehicleValue, customerValue);
      state.receivedValue = value;
      state.formDataFirstAPI = value;
      stateVehicle.receivedVehicleValue = vehicleValue;
      stateVehicle.formDataSecondAPI = vehicleValue;
      stateCustomer.receivedCustomerValue = customerValue;
      stateCustomer.formDataThirdAPI = customerValue; 
    };

    const submitForm = async () => {
  try {
    // Make API call to addKontraktværdier endpoint
    const responseFirstAPI = await axios.post('http://localhost:5174/api/kontraktVaerdier/add', state.formDataFirstAPI);

    // Make API call to vehicle/add endpoint
    const responseSecondAPI = await axios.post('http://localhost:5174/api/vehicle/add', stateVehicle.formDataSecondAPI);

    // Make API call to customer/add endpoint
    const responseThirdAPI = await axios.post('http://localhost:5174/api/customer/add', stateCustomer.formDataThirdAPI);

    // Handle the responses as needed
    console.log('API Response for the first API:', responseFirstAPI.data);
    console.log('API Response for the second API:', responseSecondAPI.data);
    console.log('API Response for the third API:', responseThirdAPI.data);

    // Additional logic if needed based on the responses
  } catch (error) {
    console.error('Error making API call:', error);
    // Handle the error, e.g., show an error message to the user
  }
};

    return {
      state,
      stateVehicle,
      stateCustomer,
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
