<template>
    <section class="contractForm col-5">
        <h1>Kontrakt</h1>
        <section>
            <label for="customerType">Kundetype</label>
            <select name="customerType" v-model="formData.customerType" @input="emitValue">
                <option value="" disabled selected hidden>Vælg kundetype</option>
                <option value="Privat">Privat</option>
                <option value="Erhverv">Erhverv</option>
                <option value="Split">Split</option>
            </select>
            <label for="contractType">Kontrakttype</label>
            <select name="contractType" v-model="formData.contractType" @input="emitValue">
                <option value="" disabled selected hidden>Vælg kontrakttype</option>
                <option value="Nytegning">Nytegning</option>
                <option value="Genleasing">Genleasing</option>
                <option value="Pristjek">Pristjek</option>
                <option value="Stilstand">Stilstand</option>
            </select>
            
            <div v-show="formData.customerType == 'Privat' || formData.customerType == 'Erhverv' || formData.contractType == 'Nytegning' || formData.contractType == 'Genleasing' || formData.contractType == 'Pristjek'">
                <div v-show="formData.customerType != 'Split' && formData.contractType != 'Stilstand'" class="contract-checkbox">
                    <label for="checkboxSeason">Sæson</label>
                    <input v-model="formData.season" @input="emitValue" type="checkbox" id="checkboxSeason" name="checkbox">
                </div>
            </div>

            <div v-show="formData.contractType == 'Nytegning'" class="contract-checkbox">
                <label for="checkboxImport">Import</label>
                <input v-model="formData.import" @input="emitValue" type="checkbox" id="checkboxImport" name="checkbox">
            </div>
        </section>

        <section>
            <h3>Leasingtager</h3>

            <label for="name">Navn</label>
            <input v-model="formData.name" @input="emitValue" type="text" id="name" class="form-control" name="name"
                placeholder="Indtast kundens navn">

            <label for="email">Email</label>
            <input v-model="formData.email" @input="emitValue" type="email" id="email" class="form-control" name="email"
                placeholder="Indtast kundens email adresse">


            <div class="contract-checkbox">
                <label for="checkboxAge">Kunden er under 25 år</label>
                <input v-model="formData.under25" type="checkbox" id="checkboxAge" name="checkbox" value="1">
            </div>

            <label for="expectedStartDate">Forventet startdato</label>
            <input v-model="formData.startDate" @input="emitValue" type="date" id="expectedStartDate" name="expectedStartDate" :min="minDate" />
        </section>

        <section>
            <h3>Køretøjsdata</h3>

            <div class="contract-checkbox">
                <label for="checkboxNewVehicle">Nyt køretøj</label>
                <input v-model="formData.newVehicle" @input="emitValue" type="checkbox" id="checkboxNewVehicle" name="checkbox" value="1">
            </div>

            <div v-show="formData.contractType != 'Stilstand' && formData.contractType != ''" class="contract-checkbox">
                <label for="checkboxLevyPaid">Fuld afgift betalt</label>
                <input v-model="formData.levyPaid" @input="emitValue" type="checkbox" id="checkboxLevyPaid" name="checkbox" value="1">
            </div>

            <div class="contract-checkbox">
                <label for="checkboxVATDeath">Momsdød</label>
                <input v-model="formData.vatDeath" @input="emitValue" type="checkbox" id="checkboxVATDeath" name="checkbox" value="1">
            </div>
            
            <label for="vehicleType">Type af køretøj</label>
            <select name="vehicleType" v-model="formData.vehicleType">
                <option value="" disabled selected hidden>Vælg type af køretøj</option>
                <option value="Bil">Bil</option>
                <option value="Motorcykel">Motorcykel</option>
            </select>

            <label for="car">Køretøj</label>
            <input v-model="formData.car" @input="emitValue" type="text" id="car" class="form-control" name="car" placeholder="Indtast køretøj">

            <label for="framenumber">Stelnummer</label>
            <input v-model="formData.frameNumber" @input="emitValue" type="number" id="framenumber" class="form-control" name="framenumber" placeholder="Indtast stelnummer">

            <div v-show="formData.newVehicle != true">
                <label for="firstRegistrationDate">1. Indregistreringsdato</label>
                <input v-model="formData.firstRegistrationDate" @input="emitValue" type="date" id="firstRegistrationDate" name="firstRegistrationDate" min="2018-01-01"/>
            </div>

            <label for="mileage">Kilometerstand</label>
            <input v-model="formData.mileage" @input="emitValue" type="number" id="mileage" class="form-control" name="mileage" placeholder="Indtast kilometerstand">

            <div v-show="formData.contractType != 'Stilstand'">
                <div v-if="formData.contractType == 'Nytegning' && formData.import">
                    <label for="salePrice">Udsalgspris i €</label>
                    <input v-model="formData.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control" name="salePrice" placeholder="Indtast udsalgspris i €">
                </div>
                <div v-else>
                    <label for="salePrice">Udsalgspris</label>
                    <input v-model="formData.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control" name="salePrice" placeholder="Indtast udsalgspris">
                </div>
            </div>
            <div v-show="formData.customerType == 'Split' || formData.contractType == 'Nytegning'">
                <div v-if="formData.import">
                    <label for="cost">Kostpris i €</label>
                    <input v-model="formData.cost" @input="emitValue" type="number" id="cost" class="form-control" name="cost" placeholder="Indtast kostpris i €">
                </div>
                <div v-else>
                    <label for="cost">Kostpris</label>
                    <input v-model="formData.cost" @input="emitValue" type="number" id="cost" class="form-control" name="cost" placeholder="Indtast kostpris">
                </div>
            </div>
            
            <div v-show="formData.contractType == 'Genleasing'">
                <label for="estimatedMarketValue">Skønnet handelsværdi i DK</label>
                <input v-model="formData.estimatedMarketValue" @input="emitValue" type="number" id="estimatedMarketValue" class="form-control" name="estimatedMarketValue" placeholder="Indtast handelsværdi inkl. moms og afgift">
            </div>

            <div v-show="formData.contractType == 'Genleasing' || formData.contractType == 'Stilstand'">
                <label for="residualValue">Restværdihæftelse ved kontraktstart</label>
                <input v-model="formData.residualValue" @input="emitValue" type="number" id="residualValue" class="form-control" name="residualValue" placeholder="Indtast restværdihæftelse">
            </div>

            <div v-show="formData.contractType == 'Pristjek'">
                <label for="cashPrice">Kontantpris (i stedet for udsalgspris)</label>
                <input v-model="formData.cashPrice" @input="emitValue" type="number" id="cashPrice" class="form-control" name="cashPrice" placeholder="Indtast kontantpris">
            </div>

            <div v-show="formData.contractType != 'Stilstand' && formData.contractType != '' && !formData.levyPaid">
                <label for="registrationFee">Anslået registreringsafgift</label>
                <input v-model="formData.registrationFee" @input="emitValue" type="number" id="registrationFee" class="form-control" name="registrationFee" placeholder="Indtast anslået registreringsafgift">
            </div>

            <label for="initialPrice">Nypris inkl. moms og afgift</label>
            <input v-model="formData.initialPrice" @input="emitValue" type="number" id="initialPrice" class="form-control" name="initialPrice" placeholder="Indtast nypris">
        </section>

        <section>
            <h3>Kontraktoplysninger</h3>

            <label for="running-time">Løbetid (i måneder)</label>
            <input v-model="formData.runningTime" @input="emitValue" type="number" id="running-time" class="form-control" name="run-time" placeholder="Indtast løbetid i måneder">

            <div v-show="formData.season && formData.customerType != 'Split' && formData.contractType != 'Stilstand'">
                <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label>
                <input v-model="formData.activeRunningTime" @input="emitValue" type="number" id="active-running-time" class="form-control" name="active-running-time" placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">
            </div>

            <label for="interest-rate">Rente</label>
            <input v-model="formData.interestRate" @input="emitValue" type="number" id="interest-rate" class="form-control" name="interest-rate" placeholder="8.5%">

            <label for="contract-creation">Kontraktoprettelse</label>
            <input v-model="formData.contractCreation" @input="emitValue" type="number" id="contract-creation" class="form-control" name="contract-creation" placeholder="0">

            <div v-if="formData.contractType != 'Stilstand'">
                <label for="one-time-benefit">Engangsydelse i procent, ex. moms (min. 20% - max. 30%)</label>
                <input v-model="formData.oneTimeBenefit" @input="emitValue" type="number" id="one-time-benefit" class="form-control" name="one-time-benefit" placeholder="20%">
            </div>
            <div v-else>
                <label for="one-time-benefit">Engangsydelse i procent, ex. moms (min. 20% - max. 30%)</label>
                <input v-model="formData.oneTimeBenefit" @input="emitValue" type="number" id="one-time-benefit" class="form-control" name="one-time-benefit" placeholder="0%">
            </div>

            <label for="deposit">Depositum ex. moms (i procent)</label>
            <input v-model="formData.deposit" @input="emitValue" type="number" id="deposit" class="form-control" name="deposit" placeholder="0">

            <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label>
            <input v-model="formData.depreciation" @input="emitValue" type="number" id="depreciation" class="form-control" name="depreciation"
                placeholder="Indtast afskrivning i procent">

            <label for="commission">Provision</label>
            <input v-model="formData.commision" @input="emitValue" type="number" id="commission" class="form-control" name="commission"
                placeholder="Indtast provision i kroner">

            <div v-show="formData.customerType == 'Split'">
                <label for="private-share">Privat andel</label>
                <input v-model="formData.privateShare" @input="emitValue" type="number" id="private-share" class="form-control" name="private-share"
                placeholder="Indtast privat andel i procent">
            </div>
        </section>
        <router-link :to="{ path: '/contract-preview' }"><button @click="sendData" class="makeContract">Lav
                tilbudskontrakt</button></router-link>
    </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useMyStore } from '@/store/myStore';
import moment from 'moment'; // Import Moment.js

export default defineComponent({
    setup() {
        const myStore = useMyStore();
        const formData = ref({
            customerType: '',
            contractType: '',
            season: '',
            import: '',
            name: '',
            email: '',
            under25: '',
            startDate: '',
            newVehicle: '',
            levyPaid: '',
            vatDeath: '',
            vehicleType: '',
            car: '',
            frameNumber: '',
            firstRegistrationDate: '',
            mileage: '',
            salePrice: '',
            cost: '',
            estimatedMarketValue: '',
            residualValue: '',
            cashPrice: '',
            registrationFee: '',
            initialPrice: '',
            runningTime: '',
            activeRunningTime: '',
            contractCreation: '',
            oneTimeBenefit: '',
            deposit: '',
            depreciation: '',
            commision: '',
            privateShare: ''
        });

        const sendData = () => {
            myStore.setData(formData);
        };

        const today = moment(); // Get today's date using Moment.js
        const minDate = today.format('YYYY-MM-DD'); // Format as YYYY-MM-DD for input's min attribute


        return {
            formData,
            sendData,
            minDate,
        };
    },
    name: 'ContractForm',
    methods: {
        emitValue() {
            console.log('Emitting value:', this.formData);
            this.$emit('input-updated', this.formData); // Emit the input value
        }
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