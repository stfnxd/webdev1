<template>
    <section class="contractForm col-5">
        <h1>Kontrakt</h1>

        <input v-model="formData.bipbip" @input="emitValue" placeholder="bip bip" type="text">

        <section>
            <label for="customerType">Kundetype</label>
            <select name="customerType" v-model="formData.customerType">
                <option value="" disabled selected hidden>Vælg kundetype</option>
                <option value="Privat">Privat</option>
                <option value="Erhverv">Erhverv</option>
                <option value="Split">Split</option>
            </select>
            <label for="contractType">Kontrakttype</label>
            <select name="contractType" v-model="formData.contractType">
                <option value="" disabled selected hidden>Vælg kontrakttype</option>
                <option value="Nytegning">Nytegning</option>
                <option value="Genleasing">Genleasing</option>
            </select>

            <div class="contract-checkbox">
                <label for="checkboxSeason">Sæson</label>
                <input type="checkbox" id="checkboxSeason" name="checkbox" value="1">
            </div>

            <div class="contract-checkbox">
                <label for="checkboxImport">Import</label>
                <input type="checkbox" id="checkboxImport" name="checkbox" value="1">
            </div>
        </section>

        <section>
            <h3>Leasingtager</h3>

            <label for="name">Navn</label>
            <input @input="emitValue" v-model="formData.name" type="text" id="name" class="form-control" name="name"
                placeholder="Indtast kundens navn">

            <label for="email">Email</label>
            <input v-model="formData.email" type="email" id="email" class="form-control" name="email"
                placeholder="Indtast kundens email adresse">

            <div class="contract-checkbox">
                <label for="checkboxAge">Kunden er under 25 år</label>
                <input type="checkbox" id="checkboxAge" name="checkbox" value="1">
            </div>

            <label for="expectedStartDate">Forventet startdato</label>
            <input type="date" id="expectedStartDate" name="expectedStartDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" />
        </section>

        <section>
            <h3>Køretøjsdata</h3>

            <div class="contract-checkbox">
                <label for="checkboxNewVehicle">Nyt køretøj</label>
                <input type="checkbox" id="checkboxNewVehicle" name="checkbox" value="1">
            </div>

            <div class="contract-checkbox">
                <label for="checkboxLevyPaid">Fuld afgift betalt</label>
                <input type="checkbox" id="checkboxLevyPaid" name="checkbox" value="1">
            </div>

            <div class="contract-checkbox">
                <label for="checkboxVATDeath">Momsdød</label>
                <input type="checkbox" id="checkboxVATDeath" name="checkbox" value="1">
            </div>
            <label for="vehicleType">Type af køretøj</label>
            <select name="vehicleType" v-model="formData.vehicleType">
                <option value="" disabled selected hidden>Vælg type af køretøj</option>
                <option value="Bil">Bil</option>
                <option value="Motorcykel">Motorcykel</option>
            </select>

            <label for="car">Køretøj</label>
            <input type="text" id="car" class="form-control" name="car" placeholder="Indtast køretøj">

            <label for="framenumber">Stelnummer</label>
            <input type="number" id="framenumber" class="form-control" name="framenumber" placeholder="Indtast stelnummer">

            <label for="firstRegistrationDate">1. Indregistreringsdato</label>
            <input type="date" id="firstRegistrationDate" name="firstRegistrationDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" />

            <label for="mileage">Kilometerstand</label>
            <input type="number" id="mileage" class="form-control" name="mileage" placeholder="Indtast kilometerstand">

            <label for="salePrice">Udsalgspris</label>
            <input type="number" id="salePrice" class="form-control" name="salePrice" placeholder="Indtast udsalgspris">

            <label for="cost">Kostpris</label>
            <input type="number" id="cost" class="form-control" name="cost" placeholder="Indtast kostpris">

            <label for="estimatedMarketValue">Skønnet handelsværdi i DK</label>
            <input type="number" id="estimatedMarketValue" class="form-control" name="estimatedMarketValue"
                placeholder="Indtast handelsværdi inkl. moms og afgift">

            <label for="residualValue">Restværdihæftelse ved kontraktstart</label>
            <input type="number" id="residualValue" class="form-control" name="residualValue"
                placeholder="Indtast restværdihæftelse">

            <label for="cashPrice">Kontantpris (i stedet for udsalgspris)</label>
            <input type="number" id="cashPrice" class="form-control" name="cashPrice" placeholder="Indtast kontantpris">

            <label for="registrationFee">Anslået registreringsafgift</label>
            <input type="number" id="registrationFee" class="form-control" name="registrationFee"
                placeholder="Indtast anslået registreringsafgift">

            <label for="initialPrice">Nypris inkl. moms og afgift</label>
            <input type="number" id="initialPrice" class="form-control" name="initialPrice" placeholder="Indtast nypris">
        </section>

        <section>
            <h3>Kontraktoplysninger</h3>

            <label for="running-time">Løbetid (i måneder)</label>
            <input type="number" id="running-time" class="form-control" name="run-time"
                placeholder="Indtast løbetid i måneder">

            <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label>
            <input type="number" id="active-running-time" class="form-control" name="active-running-time"
                placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">

            <label for="interest-rate">Rente</label>
            <input type="number" id="interest-rate" class="form-control" name="interest-rate" placeholder="8.5%">

            <label for="contract-creation">Kontraktoprettelse</label>
            <input type="number" id="contract-creation" class="form-control" name="contract-creation" placeholder="0">

            <label for="one-time-benefit">Engangsydelse i procent, ex. moms (min. 20% - max. 30%)</label>
            <input type="number" id="one-time-benefit" class="form-control" name="one-time-benefit" placeholder="20">

            <label for="deposit">Depositum ex. moms (i procent)</label>
            <input type="number" id="deposit" class="form-control" name="deposit" placeholder="0">

            <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label>
            <input type="number" id="depreciation" class="form-control" name="depreciation"
                placeholder="Indtast afskrivning i procent">

            <label for="commission">Provision</label>
            <input type="number" id="commission" class="form-control" name="commission"
                placeholder="Indtast provision i kroner">

            <label for="private-share">Privat andel</label>
            <input type="number" id="private-share" class="form-control" name="private-share"
                placeholder="Indtast privat andel i procent">
        </section>
        <router-link :to="{ path: '/contract-preview' }"><button @click="sendData" class="makeContract">Lav
                tilbudskontrakt</button></router-link>
    </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useMyStore } from '@/store/myStore';

export default defineComponent({
    setup() {
        const myStore = useMyStore();
        const formData = ref({
            bipbip: '',
            customerType: '',
            contractType: '',
            name: '',
            email: '',
            vehicleType: '',
        });

        const sendData = () => {
            myStore.setData(formData);
        };

        return {
            formData,
            sendData,
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