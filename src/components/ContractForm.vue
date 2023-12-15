<template>
    <section class="contractForm col-5">
        <h1>Kontrakt</h1>

        <section>
            <label for="customerType">Kundetype</label>
            <select name="customerType" v-model="formData.customer.customerType" @input="emitValue" required>
                <option value="" disabled selected hidden>Vælg kundetype</option>
                <option value="Privat">Privat</option>
                <option value="Erhverv">Erhverv</option>
                <option value="Split">Split</option>
            </select>
            <label for="contractType">Kontrakttype</label>
            <select name="contractType" v-model="formData.customer.contractType" @input="emitValue" required>
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

            <label for="name">Navn</label>
            <input v-model="formData.customer.name" @input="emitValue" type="text" id="name" class="form-control" name="name"
                placeholder="Indtast kundens navn" required>

            <label for="email">Email</label>
            <input v-model="formData.customer.email" @input="emitValue" type="email" id="email" class="form-control" name="email"
                placeholder="Indtast kundens email adresse" required>


            <div class="contract-checkbox">
                <label for="checkboxAge">Kunden er under 25 år</label>
                <input v-model="formData.customer.under25" type="checkbox" id="checkboxAge" name="checkbox" value="1">
            </div>

            <label for="expectedStartDate">Forventet startdato</label>
            <input v-model="formData.customer.startDate" @input="emitValue" type="date" id="expectedStartDate"
                name="expectedStartDate" required />

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
                <input v-model="formData.vehicle.vatDeath" @input="emitValue" type="checkbox" id="checkboxVATDeath" name="checkbox"
                    value="1">
            </div>

            <label for="vehicleType">Type af køretøj</label>
            <select name="vehicleType" v-model="formData.vehicle.vehicleType" required>
                <option value="" disabled selected hidden>Vælg type af køretøj</option>
                <option value="Bil">Bil</option>
                <option value="Motorcykel">Motorcykel</option>
            </select>

            <label for="vehicle">Køretøj</label>
            <input v-model="formData.vehicle.vehicle" @input="emitValue" type="text" id="vehicle" class="form-control" name="vehicle"
                placeholder="Indtast køretøj" required>

            <label for="framenumber">Stelnummer</label>
            <input v-model="formData.vehicle.frameNumber" @input="emitValue" type="number" id="framenumber" class="form-control"
                name="framenumber" placeholder="Indtast stelnummer" required>

            <div v-show="formData.vehicle.newVehicle == false">
                <label for="firstRegistrationDate">1. Indregistreringsdato</label>
                <input v-model="formData.vehicle.firstRegistrationDate" @input="checkDate" type="date" id="firstRegistrationDate"
                    name="firstRegistrationDate" required/>
            </div>

            <label for="mileage">Kilometerstand</label>
            <input v-model="formData.vehicle.mileage" @input="emitValue" type="number" id="mileage" class="form-control"
                name="mileage" placeholder="Indtast kilometerstand" required>

            <div v-show="formData.customer.contractType != 'Stilstand'">
                <div v-if="formData.customer.contractType == 'Nytegning' && formData.customer.import == true">
                    <label for="salePrice">Udsalgspris i €</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris i €" required>
                </div>
                <div v-else>
                    <label for="salePrice">Udsalgspris</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris" required>
                </div>
            </div>
            <div v-show="formData.customer.customerType == 'Split' || formData.customer.contractType == 'Nytegning'">
                <div v-if="formData.customer.import == true">
                    <label for="cost">Kostpris i €</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris i €" required>
                </div>
                <div v-else>
                    <label for="cost">Kostpris</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris" required>
                </div>
            </div>

            <div v-show="formData.customer.contractType == 'Genleasing'">
                <label for="estimatedMarketValue">Skønnet handelsværdi i DK</label>
                <input v-model="formData.contractValues.estimatedMarketValue" @input="emitValue" type="number" id="estimatedMarketValue"
                    class="form-control" name="estimatedMarketValue"
                    placeholder="Indtast handelsværdi inkl. moms og afgift" required>
            </div>

            <div v-show="formData.customer.contractType == 'Genleasing' || formData.customer.contractType == 'Stilstand'">
                <label for="residualValue">Restværdihæftelse ved kontraktstart</label>
                <input v-model="formData.contractValues.residualValue" @input="emitValue" type="number" id="residualValue"
                    class="form-control" name="residualValue" placeholder="Indtast restværdihæftelse" required>
            </div>

            <div v-show="formData.customer.contractType == 'Pristjek'">
                <label for="cashPrice">Kontantpris (i stedet for udsalgspris)</label>
                <input v-model="formData.contractValues.cashPrice" @input="emitValue" type="number" id="cashPrice" class="form-control"
                    name="cashPrice" placeholder="Indtast kontantpris" required>
            </div>

            <div v-show="formData.customer.contractType != 'Stilstand' && formData.customer.contractType != '' && formData.vehicle.levyPaid == false">
                <label for="registrationFee">Anslået registreringsafgift</label>
                <input v-model="formData.contractValues.registrationFee" @input="emitValue" type="number" id="registrationFee"
                    class="form-control" name="registrationFee" placeholder="Indtast anslået registreringsafgift" required>
            </div>

            <div v-show="showInitialPrice && formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'">
                <label for="initialPrice">Nypris inkl. moms og afgift</label>
                <input v-model="formData.vehicle.initialPrice" @input="emitValue" type="number" id="initialPrice"
                    class="form-control" name="initialPrice" placeholder="Indtast nypris" required>
            </div>

        </section>

        <section>

            <h3>Kontraktoplysninger</h3>

            <label for="running-time">Løbetid (i måneder)</label>
            <input v-model="formData.contractValues.runningTime" @input="emitValue" type="number" id="running-time" class="form-control"
                name="run-time" placeholder="Indtast løbetid i måneder" required>

            <div v-show="formData.customer.season != false && formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'">
                <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label>
                <input v-model="formData.contractValues.activeRunningTime" @input="emitValue" type="number" id="active-running-time"
                    class="form-control" name="active-running-time"
                    placeholder="Indtast aktiv periode i kontraktens løbetid i måneder" required>
            </div>

            <label for="interest-rate">Rente</label>
            <input v-model="formData.contractValues.interestRate" @input="emitValue" type="number" id="interest-rate" class="form-control"
                name="interest-rate" placeholder="8.5%" min="0" max="100" required>

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
                name="deposit" placeholder="0" required>

            <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label>
            <input v-model="formData.contractValues.depreciation" @input="emitValue" type="number" id="depreciation" class="form-control"
                name="depreciation" placeholder="Indtast afskrivning i procent">

            <label for="commission">Provision</label>
            <input v-model="formData.contractValues.commission" @input="emitValue" type="number" id="commission" class="form-control"
                name="commission" placeholder="Indtast provision i kroner" required>

            <div v-show="formData.customer.customerType == 'Split'">
                <label for="private-share">Privat andel</label>
                <input v-model="formData.contractValues.privateShare" @input="emitValue" type="number" id="private-share"
                    class="form-control" name="private-share" placeholder="Indtast privat andel i procent" required>
            </div>

        </section>
        <router-link :to="{ path: '/contract-preview' }"><button @click="sendData" class="makeContract">Lav
                tilbudskontrakt</button></router-link>
    </section>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { useMyStore } from '@/store/myStore';
import axios from 'axios';

export default defineComponent({
    setup() {
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
            
        });


        const showInitialPrice = ref(false); // Use ref for reactive properties

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

        /*const sendData = () => {
            myStore.setData(formData);
        };*/

        const sendData = async () => {
             // update  store
            myStore.setData(formData.value);
            try {
                
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
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

        return {
            formData,
            sendData,
            checkDate,
            showInitialPrice,
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

/*export default {
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
} */

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