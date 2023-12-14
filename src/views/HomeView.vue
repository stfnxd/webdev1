
<template>
    <main>
        <section class="frontpage">
            <ContractForm @input-updated="updateValue" />
            <Calculation :receivedValue="receivedValue" />
        </section>

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
            receivedValue: {
                contractValues: {
                salePrice: '',
                cost: '',
                estimatedMarketValue: '',
                residualValue: '',
                cashPrice: '',
                runningTime: '',
                activeRunningTime: '',
                interestRate: '',
                contractCreation: '',
                oneTimeBenefit: '',
                deposit: '',
                depreciation: '',
                commission: '',
                privateShare: '',
                registrationFee: ''
            },
            customer: {
                name: '',
                email: '',
                under25: '',
                customerType: '',
                contractType: '',
                startDate: '',
                season: '',
                import: '',
            },
            vehicle: {
                vehicle: '',
                newVehicle: '',
                firstRegistrationDate: '',
                initialPrice: '',
                vatDeath: '',
                vehicleType: '',
                levyPaid: '',
                mileage: '',
            },
            frameNumber: '',
            } // Initialize receivedValue
        };
    },
    methods: {
        updateValue(value) {
            this.receivedValue = value; // Update receivedValue with input value from ContractForm
        }
    }
};


    /*const submitForm = async () => {
  try {
    // Make API call to addKontraktværdier endpoint
    const responseFirstAPI = await axios.post('http://localhost:5174/api/contractValues/add', state.formDataFirstAPI);

    // Make API call to vehicle/add endpoint
    const responseSecondAPI = await axios.post('http://localhost:5174/api/vehicle/add', stateVehicle.formDataSecondAPI);

    // Make API call to customer/add endpoint
    const responseThirdAPI = await axios.post('http://localhost:5174/api/customer/add', stateCustomer.formDataThirdAPI);

    // Make API call to calculations/add endpoint
    const responseFourthAPI = await axios.post('http://localhost:5174/api/calculations/add', stateCalculations.formDataFourthAPI);


    // Handle the responses as needed
    console.log('API Response for the first API:', responseFirstAPI.data);
    console.log('API Response for the second API:', responseSecondAPI.data);
    console.log('API Response for the third API:', responseThirdAPI.data);
    console.log('API Response for the fourth API:', responseFourthAPI.data);

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
      stateCalculations,
      updateValue,
      submitForm,
    };
  },
};*/
</script>

<style>
main {
    max-width: 75vw;
    margin: auto;
}

main section.frontpage {
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
