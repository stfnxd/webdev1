<template>
    <section class="contractForm col-5">
        <h1>Kontrakt</h1>

        <section>
            <label for="customerType">Kundetype</label>
            <select name="customerType" v-model="formData.customer.customerType" @input="emitValue">
                <option value="" disabled selected hidden>Vælg kundetype</option>
                <option value="Privat">Privat</option>
                <option value="Erhverv">Erhverv</option>
                <option value="Split">Split</option>
            </select>
            <label for="contractType">Kontrakttype</label>
            <select name="contractType" v-model="formData.customer.contractType" @input="emitValue">
                <option value="" disabled selected hidden>Vælg kontrakttype</option>
                <option value="Nytegning">Nytegning</option>
                <option value="Genleasing">Genleasing</option>
                <option value="Pristjek">Pristjek</option>
                <option value="Stilstand">Stilstand</option>
            </select>

            <div v-show="formData.customer.customerType == 'Privat' || formData.customer.customerType == 'Erhverv' || formData.customer.contractType == 'Nytegning' || formData.customer.contractType == 'Genleasing' || formData.customer.contractType == 'Pristjek'">
                <div v-show="formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'"
                    class="contract-checkbox">
                    <label for="checkboxSeason">Sæson</label>
                    <input v-model="formData.customer.season" @input="emitValue" type="checkbox" id="checkboxSeason" name="checkbox">
                </div>
            </div>

            <div v-show="formData.customer.contractType == 'Nytegning'" class="contract-checkbox">
                <label for="checkboxImport">Import</label>
                <input v-model="formData.customer.import" @input="emitValue" type="checkbox" id="checkboxImport" name="checkbox">
            </div>
        </section>

        <section>
            <h3>Leasingtager</h3>
            
            <div v-show="formData.customer.contractType == 'Genleasing'">
            <label for="customerId">Kunde Id</label>
            <input v-model="formData.customerId" @input="emitValue" type="text" id="customerId" class="form-control" name="customerId" placeholder="Indtast kundens id">
            <button @click="fetchCustomerData">Search</button>
            </div>

            <label for="name">Navn</label>
            <input v-model="formData.customer.name" @input="emitValue" type="text" id="name" class="form-control" name="name"
                placeholder="Indtast kundens navn">
                <span v-if="!isFormValid().customerName" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kunde navn skal udfyldes</span>

            <label for="email">Email</label>
            <input v-model="formData.customer.email" @input="emitValue" type="email" id="email" class="form-control" name="email"
                placeholder="Indtast kundens email adresse">


            <div class="contract-checkbox">
                <label for="checkboxAge">Kunden er under 25 år</label>
                <input v-model="formData.customer.under25" type="checkbox" id="checkboxAge" name="checkbox" value="1">
            </div>

            <label for="expectedStartDate">Forventet startdato</label>
            <input v-model="formData.customer.startDate" @input="emitValue" type="date" id="expectedStartDate"
                name="expectedStartDate" />

        </section>

        <section>

            <h3>Køretøjsdata</h3>

            <div class="contract-checkbox">
                <label for="checkboxNewVehicle">Nyt køretøj</label>
                <input v-model="formData.vehicle.newVehicle" @input="emitValue" type="checkbox" id="checkboxNewVehicle"
                    name="checkbox" value="1">
            </div>

            <div v-show="formData.customer.contractType != 'Stilstand' && formData.customer.contractType != ''" class="contract-checkbox">
                <label for="checkboxLevyPaid">Fuld afgift betalt</label>
                <input v-model="formData.vehicle.levyPaid" @input="emitValue" type="checkbox" id="checkboxLevyPaid" name="checkbox"
                    value="1">
            </div>

            <div class="contract-checkbox">
                <label for="checkboxVATDeath">Momsdød</label>
                <input v-model="formData.vehicle.vatDeath" @input="emitValue" type="checkbox" id="checkboxVATDeath" name="checkbox" value="1">
            </div>

            <label for="vehicleType">Type af køretøj</label>
            <select name="vehicleType" v-model="formData.vehicle.vehicleType">
                <option value="" disabled selected hidden>Vælg type af køretøj</option>
                <option value="Bil">Bil</option>
                <option value="Motorcykel">Motorcykel</option>
            </select>

            <label for="vehicle">Køretøj</label>
            <input v-model="formData.vehicle.vehicle" @input="emitValue" type="text" id="vehicle" class="form-control" name="vehicle"
                placeholder="Indtast køretøj">
                <span v-if="!isFormValid().vehicle" class="warning"><font-awesome-icon icon="circle-exclamation" /> Køretøj skal udfyldes</span>

            <label for="framenumber">Stelnummer</label>
            <input v-model="formData.vehicle.frameNumber" @input="emitValue" type="number" id="framenumber" class="form-control"
                name="framenumber" placeholder="Indtast stelnummer">

            <div v-show="formData.vehicle.newVehicle == false">
                <label for="firstRegistrationDate">1. Indregistreringsdato</label>
                <input v-model="formData.vehicle.firstRegistrationDate" @input="checkDate" type="date" id="firstRegistrationDate"
                    name="firstRegistrationDate"/>
            </div>

            <label for="mileage">Kilometerstand</label>
            <input v-model="formData.vehicle.mileage" @input="emitValue" type="number" id="mileage" class="form-control"
                name="mileage" placeholder="Indtast kilometerstand">

            <div v-show="formData.customer.contractType != 'Stilstand'">
                <div v-if="formData.customer.contractType == 'Nytegning' && formData.customer.import == true">
                    <label for="salePrice">Udsalgspris i €</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris i €">
                </div>
                <div v-else>
                    <label for="salePrice">Udsalgspris</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris">
                </div>
            </div>
            <div v-show="formData.customer.customerType == 'Split' || formData.customer.contractType == 'Nytegning'">
                <div v-if="formData.customer.import == true">
                    <label for="cost">Kostpris i €</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris i €">
                </div>
                <div v-else>
                    <label for="cost">Kostpris</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris">
                </div>
            </div>

            <div v-show="formData.customer.contractType == 'Genleasing'">
                <label for="estimatedMarketValue">Skønnet handelsværdi i DK</label>
                <input v-model="formData.contractValues.estimatedMarketValue" @input="emitValue" type="number" id="estimatedMarketValue"
                    class="form-control" name="estimatedMarketValue"
                    placeholder="Indtast handelsværdi inkl. moms og afgift">
            </div>

            <div v-show="formData.customer.contractType == 'Genleasing' || formData.customer.contractType == 'Stilstand'">
                <label for="residualValue">Restværdihæftelse ved kontraktstart</label>
                <input v-model="formData.contractValues.residualValue" @input="emitValue" type="number" id="residualValue"
                    class="form-control" name="residualValue" placeholder="Indtast restværdihæftelse">
            </div>

            <div v-show="formData.customer.contractType == 'Pristjek'">
                <label for="cashPrice">Kontantpris (i stedet for udsalgspris)</label>
                <input v-model="formData.contractValues.cashPrice" @input="emitValue" type="number" id="cashPrice" class="form-control"
                    name="cashPrice" placeholder="Indtast kontantpris">
            </div>

            <div v-show="formData.customer.contractType != 'Stilstand' && formData.customer.contractType != '' && formData.vehicle.levyPaid == false">
                <label for="registrationFee">Anslået registreringsafgift</label>
                <input v-model="formData.contractValues.registrationFee" @input="emitValue" type="number" id="registrationFee"
                    class="form-control" name="registrationFee" placeholder="Indtast anslået registreringsafgift">
            </div>

            <div v-show="showInitialPrice && formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'">
                <label for="initialPrice">Nypris inkl. moms og afgift</label>
                <input v-model="formData.vehicle.initialPrice" @input="emitValue" type="number" id="initialPrice"
                    class="form-control" name="initialPrice" placeholder="Indtast nypris">
            </div>

        </section>

        <section>

            <h3>Kontraktoplysninger</h3>

            <label for="running-time">Løbetid (i måneder)</label>
            <input v-model="formData.contractValues.runningTime" @input="emitValue" type="number" id="running-time" class="form-control"
                name="run-time" placeholder="Indtast løbetid i måneder">

            <div v-show="formData.customer.season != false && formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'">
                <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label>
                <input v-model="formData.contractValues.activeRunningTime" @input="emitValue" type="number" id="active-running-time"
                    class="form-control" name="active-running-time"
                    placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">
            </div>

            <label for="interest-rate">Rente</label>
            <input v-model="formData.contractValues.interestRate" @input="emitValue" type="number" id="interest-rate" class="form-control"
                name="interest-rate" placeholder="8.5%" min="0" max="100">

            <label for="contract-creation">Kontraktoprettelse</label>
            <input v-model="formData.contractValues.contractCreation" @input="emitValue" type="number" id="contract-creation"
                class="form-control" name="contract-creation" placeholder="0">

            <div v-if="formData.customer.contractType != 'Stilstand'">
                <label for="one-time-benefit">Engangsydelse i procent, ex. moms (min. 20% - max. 30%)</label>
                <input v-model="formData.contractValues.oneTimeBenefit" @input="emitValue" type="number" id="one-time-benefit"
                    class="form-control" name="one-time-benefit" placeholder="20%" min="20" max="30">
            </div>
            <div v-else>
                <label for="one-time-benefit">Engangsydelse i procent, ex. moms</label>
                <input v-model="formData.contractValues.oneTimeBenefit" @input="emitValue" type="number" id="one-time-benefit"
                    class="form-control" name="one-time-benefit" placeholder="0%">
            </div>

            <label for="deposit">Depositum ex. moms (i procent)</label>
            <input v-model="formData.contractValues.deposit" @input="emitValue" type="number" id="deposit" class="form-control"
                name="deposit" placeholder="0">

            <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label>
            <input v-model="formData.contractValues.depreciation" @input="emitValue" type="number" id="depreciation" class="form-control"
                name="depreciation" placeholder="Indtast afskrivning i procent">

            <label for="commission">Provision</label>
            <input v-model="formData.contractValues.commission" @input="emitValue" type="number" id="commission" class="form-control"
                name="commission" placeholder="Indtast provision i kroner">

            <div v-show="formData.customer.customerType == 'Split'">
                <label for="private-share">Privat andel</label>
                <input v-model="formData.contractValues.privateShare" @input="emitValue" type="number" id="private-share"
                    class="form-control" name="private-share" placeholder="Indtast privat andel i procent">
            </div>

        </section>
        <button @click.prevent="sendData" class="makeContract" :disabled="!isFormValid()">Lav tilbudskontrakt</button>
    </section>
</template>

<script>

import { defineComponent, ref, computed } from 'vue';
import { useMyStore } from '@/store/myStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
    setup() {
        const formValidationResults = computed(() => isFormValid());
        const router = useRouter();
        const myStore = useMyStore();
        const formData = ref({
            contractValues: {
                Id_Køretøjdata: null,
                salePrice: null,
                cost: null,
                estimatedMarketValue: null,
                residualValue: null,
                cashPrice: null,
                runningTime: null,
                activeRunningTime: null,
                interestRate: null,
                contractCreation: null,
                oneTimeBenefit: null,
                deposit: null,
                depreciation: null,
                commission: null,
                privateShare: null,
                registrationFee: null
            },
            customer: {
                Id_Kontraktværdier: null,
                name: null,
                email: null,
                under25: '0',
                customerType: '',
                contractType: '',
                startDate: null,
                season: '0',
                import: '0',
            },
            vehicle: {
                frameNumber: null,
                vehicle: null,
                newVehicle: '0',
                firstRegistrationDate: null,
                initialPrice: null,
                vatDeath: '0',
                vehicleType: '',
                levyPaid: '0',
                mileage: null,
            },
            customerId: '', 
        });

        const buttonClicked = ref(false);
        const showInitialPrice = ref(false); // Use ref for reactive properties

        const isFormValid = () => {
            const customerNameValid = formData.value.customer.name && formData.value.customer.name.length >= 3;
            const vehicleValid = formData.value.vehicle.vehicle && formData.value.vehicle.vehicle.length >= 3;

            const validationResults = {
                customerName: customerNameValid,
                vehicle: vehicleValid,
            };

        return buttonClicked.value ? validationResults : { customerName: true, vehicle: true };
        };

        // checks if first registration date is more than 36 months ago 
        const checkDate = () => {
            const date = new Date(formData.value.vehicle.firstRegistrationDate);
            const today = new Date();

            const thirtySixMonthsAgo = new Date(today);
            thirtySixMonthsAgo.setMonth(thirtySixMonthsAgo.getMonth() - 36);

            if (date < thirtySixMonthsAgo) {
                showInitialPrice.value = false;
            } else {
                showInitialPrice.value = true;
            }
        };



        const sendData = async () => {
            myStore.setData(formData.value);
            buttonClicked.value = true;
            const validationResults = isFormValid();
            if (!validationResults.customerName) {
                console.error('Feltet "Navn" skal udfyldes korrekt');
            

                if (!validationResults.vehicle) {
                    console.error('Feltet "Køretøj" skal udfyldes korrekt');
                }

                return;
            }
            try {
                    // Perform update operations
                    if (formData.value.contractValues.Id_Køretøjdata) {
                        const responseVehicle = await axios.put(`http://localhost:5174/api/vehicle/update/${formData.value.contractValues.Id_Køretøjdata}`, formData.value.vehicle);
                        console.log('Updated vehicle data:', responseVehicle.data);
                    
                
                        if (formData.value.customer.Id_Kontraktværdier) {
                            const responseContractValues = await axios.put(`http://localhost:5174/api/contractValues/update/${formData.value.customer.Id_Kontraktværdier}`, formData.value.contractValues);
                            console.log('Updated data:', responseContractValues.data);
                        }

                        if (formData.value.customerId) {
                            const responseCustomer = await axios.put(`http://localhost:5174/api/customer/update/${formData.value.customerId}`, formData.value.customer);
                            console.log('Updated customer data:', responseCustomer.data);
                    }

                    } else {

                        // Send customer to the first API endpoint and store the auto-incremented ID from the response
                        const responseFirstAPI = await axios.post('http://localhost:5174/api/vehicle/add', formData.value.vehicle);
                        const vehicleId = responseFirstAPI.data.insertId;

                        // Update formData contractValues with the obtained vehicle ID, send contractValues to second API and store the auto-incremented ID from the response
                        formData.value.contractValues.Id_Køretøjdata = vehicleId;
                        const responseSecondAPI = await axios.post('http://localhost:5174/api/contractValues/add', formData.value.contractValues);
                        const contractValuesId = responseSecondAPI.data.insertId;
                        
                        // Update formData customer with the obtained contractValues ID, send vehicle to the third API endpoint
                        formData.value.customer.Id_Kontraktværdier = contractValuesId;
                        const responseThirdAPI = await axios.post('http://localhost:5174/api/customer/add', formData.value.customer);
                       
                        // Log the responses (you might want to handle these responses according to your needs)
                        console.log('Response from API 1:', responseFirstAPI.data);
                        console.log('Response from API 2:', responseSecondAPI.data);
                        console.log('Response from API 3:', responseThirdAPI.data);
                    }

                    if (isFormValid()) {
                        router.push('/contract-preview');
                    }

                } catch (error) {
                    console.error('Error sending data:', error);
                }
            };

        // New method to fetch customer data based on ID
        const fetchCustomerData = async () => {
        try {
                // Validate if searchCustomerId is not empty
                if (!formData.value.customerId) {
                    console.error('Please enter a Customer ID');
                    return;
                }

                // Send a request to the server to fetch data based on the entered customer ID
                const response = await axios.get(`http://localhost:5174/api/customer/${customerId.value}`);
            
                // Check if there's data in the response
                if (response.data.length > 0) {
                    const fetchedData = response.data[0];

                    formData.value.customerId = formData.value.customerId;
                    // Update the formData with the fetched data from 'leasingtager' table
                    formData.value.customer.Id_Kontraktværdier = fetchedData.Id_Kontraktværdier;
                    formData.value.customer.name = fetchedData.Navn;
                    formData.value.customer.email = fetchedData.Email;
                    formData.value.customer.under25 = Boolean(fetchedData.Under_25);
                    formData.value.customer.customerType = fetchedData.Kundetype;
                    formData.value.customer.contractType = 'Genleasing';
                    formData.value.customer.startDate = null,
                    formData.value.customer.season = Boolean(fetchedData.Sæson);
                    formData.value.customer.import = '0',

                    formData.value.contractValues = {
                        Id_Køretøjdata: fetchedData.Id_Køretøjdata,
                        salePrice: fetchedData.Udsalgspris,
                        cost: fetchedData.Kostpris,
                        estimatedMarketValue: fetchedData.Handelsværdi_DK,       
                        residualValue: fetchedData.Restværdihæftelse,
                        cashPrice: fetchedData.Kontantpris,
                        runningTime: fetchedData.Løbetid,
                        activeRunningTime: fetchedData.Kontraktens_Løbetid,
                        interestRate: fetchedData.Rente,
                        contractCreation: fetchedData.Kontraktoprettelse,
                        oneTimeBenefit: fetchedData.Engangsydelse,
                        deposit: fetchedData.Depositum,
                        depreciation: fetchedData.Afskrivning,
                        commission: fetchedData.Provision,
                        privateShare: fetchedData.Privat_Andel,
                        registrationFee: fetchedData.Registeringsafgift
                    };

                    formData.value.vehicle = {
                        frameNumber: fetchedData.Id_Stelnummer,
                        vehicle: fetchedData.Køretøj,
                        newVehicle: '0',
                        firstRegistrationDate: null,
                        initialPrice: fetchedData.Nypris,
                        vatDeath: Boolean(fetchedData.Momsdød),
                        vehicleType: fetchedData.Type,
                        levyPaid: Boolean(fetchedData.Fuld_Afgift),
                        mileage: fetchedData.Kilometerafstand,
                    };
                    
                    console.log('Fetched customer data:', formData.value);
                } else {
                    console.error('No data found for customer');
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        return {
            formData,
            sendData,
            checkDate,
            showInitialPrice,
            fetchCustomerData,
            isFormValid,
            formValidationResults,
            buttonClicked,
            router,
        };
    },

    name: 'ContractForm',
    methods: {
        emitValue() {
                this.$emit('input-updated', this.formData); // Emit the input value
        },
    },
    mounted() {
        this.emitValue(); // Call emitValue method when the component is mounted
    }
});

</script>

<style>
.contractForm #dropdownMenuButton {
    background-color: var(--light-grey);
    color: var(--dark-grey);
    width: 100%;
    text-align: left;
    border: 1px var(--medium-grey) solid;
}

.contractForm h1,
.contractForm h2,
.contractForm h3 {
    margin-top: 30px;
}

.contractForm label,
.contractForm p {
    padding-top: 25px;
    margin-bottom: 5px;
    display: block;
}

.contractForm input[type="text"],
.contractForm input[type="number"],
.contractForm input[type="date"],
.contractForm input[type="email"],
.contractForm select {
    background-color: var(--light-grey);
    color: var(--dark-grey);
    padding: .375rem .75rem;
    border: 1px var(--medium-grey) solid !important;
    border-radius: 0.25rem;
}

.contract-checkbox {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding-top: 20px;
}

.contract-checkbox label {
    margin: 0;
    padding: 0;
}

.contractForm select {
    width: 100%;
}

.warning {
  display: block;
  background-color: #ffdddd; /* Rød baggrundsfarve */
  color: #8b0000; /* Mørkerød tekstfarve */
  padding: 10px; /* Øget polstring for bedre synlighed */
  border-radius: 5px; /* Afrundede hjørner */
  margin-top: 5px; /* Afstand fra det tilknyttede inputfelt */
}

/* select {
  border: 0;
  vertical-align: middle;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  padding-left: 5px;
}

select option:after {
  content: '\2304';
  font-size: 30px;
  line-height: 23px;
  padding-right: 2px;
} */

</style>