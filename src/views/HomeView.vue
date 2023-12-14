
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
