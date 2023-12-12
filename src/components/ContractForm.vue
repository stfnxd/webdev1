<template>
    <section class="contractForm col-7">
        <h1>Kontrakt</h1>
        <input v-model="inputValue" @input="emitValue" placeholder="bip bip" id="bipbip" type="text">
        <section></section>
        <p>Kundetype</p>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{ selectCustomerType ? selectCustomerType : 'Vælg kundetype' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" @click="selectCustomerType('Privat')">Privat</a>
                <a class="dropdown-item" @click="selectCustomerType('Erhverv')">Erhverv</a>
                <a class="dropdown-item" @click="selectCustomerType('Split')">Split</a>
            </div>
        </div>

        <p>Kontrakttype</p>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{ selectedContractType ? selectedContractType : 'Vælg kontrakttype' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" @click="selectContractType('Nytegning')">Nytegning</a>
                <a class="dropdown-item" @click="selectContractType('Genleasing')">Genleasing</a>
            </div>
        </div>

        <div class="contract-checkbox">
            <label for="checkboxSeason">Sæson</label>
            <input type="checkbox" v-model="checkboxSeason" @input="emitValue" id="checkboxSeason" name="checkboxSeason" :value="checkboxSeason ? 1 : 0">
        </div>

        <div class="contract-checkbox">
            <label for="checkboxImport">Import</label>
            <input type="checkbox" v-model="checkboxImport" @input="emitValue" id="checkboxImport" name="checkboxImport" :value="checkboxImport ? 1 : 0">
        </div>

        <section>
            <h2>Leasingtager</h2>
            <label for="Kundename">Navn</label><br>
            <input type="text" v-model="Kundename" @input="emitValue" id="Kundename" class="form-control" name="Kundename" placeholder="Indtast kundens navn">
            <div class="contract-checkbox">
                <label for="25Checkbox">Kunden er under 25 år</label>
                <input type="checkbox" v-model="FemOgTyveCheckbox" @input="emitValue" id="FemOgTyveCheckbox" name="FemOgTyveCheckbox" :value="FemOgTyveCheckbox ? 1 : 0">
            </div>
            <label for="expectedStartDate">Forventet startdato</label><br>
            <input type="date" v-model="expectedStartDate" @input="emitValue" id="expectedStartDate" name="expectedStartDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" /><br>
        </section>
        <section>
            <h2>Bildata</h2>
            <div class="contract-checkbox">
                <label for="NyBilCheckbox">Ny bil</label>
                <input type="checkbox" v-model="NyBilCheckbox" @input="emitValue" id="NyBilCheckbox" name="NyBilCheckbox" :value="NyBilCheckbox ? 1 : 0">
            </div>
            <label for="car">Køretøj</label><br>
            <input type="text" v-model="car" @input="emitValue" id="car" class="form-control" name="car" placeholder="Indtast køretøj">
            <label for="framenumber">Stelnummer</label><br>
            <input type="number" v-model="framenumber" @input="emitValue" id="framenumber" class="form-control" name="framenumber" placeholder="Indtast stelnummer">
            <label for="firstRegistrationDate">1. indregistreringsdato</label><br>
            <input type="date" v-model="firstRegistrationDate" @input="emitValue" id="firstRegistrationDate" name="firstRegistrationDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" /><br>
            <label for="mileage">Kilometerstand</label><br>
            <input type="number" v-model="mileage" @input="emitValue" id="mileage" class="form-control" name="mileage" placeholder="Indtast kilometerstand">
            <div class="contract-checkbox">
                <label for="afgiftCheckbox">Fuld afgift betalt</label>
                <input type="checkbox" v-model="afgiftCheckbox" @input="emitValue" id="afgiftCheckbox" name="afgiftcheckbox" :value="afgiftCheckbox ? 1 : 0">
            </div>
            <div class="contract-checkbox">
                <label for="momsdødCheckbox">Momsdød</label>
                <input type="checkbox" v-model="momsdødCheckbox" @input="emitValue" id="momsdødCheckbox" name="momsdødCheckbox" :value="momsdødCheckbox ? 1 : 0">
            </div>
            <label for="retailPrice">Udsalgspris</label><br>
            <input type="number" v-model="retailPrice" @input="emitValue" id="retailPrice" class="form-control" name="retailPrice" placeholder="Indtast Udsalgspris">
            <label for="costPrice">Kostpris</label><br>
            <input type="number" v-model="costPrice" @input="emitValue" id="costPrice" class="form-control" name="costPrice" placeholder="Indtast kostpris">
            <label for="estimatedRegistrationFee">Anslået registreringsafgift</label><br>
            <input type="number" v-model="estimatedRegistrationFee" @input="emitValue" id="estimatedRegistrationFee" class="form-control" name="estimatedRegistrationFee"
                placeholder="Indtast anslået registreringsafgift">
            <label for="newPrice">Nypris inkl. moms og afgift</label><br>
            <input type="number" v-model="estimatedRegistrationFee" id="newPrice" class="form-control" name="newPrice"
                placeholder="Indtast nypris inkl. moms og afgift">
        </section>
        <section>
            <h2>Kontraktoplysninger</h2>
            <label for="running-time">Løbetid (i måneder)</label><br>
            <input type="number" v-model="runningTime" @input="emitValue" id="running-time" class="form-control" name="run-time"
                placeholder="Indtast løbetid i måneder">
            <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label><br>
            <input type="number" v-model="activeRunningTime" @input="emitValue" id="active-running-time" class="form-control" name="active-running-time"
                placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">
            <label for="interest-rate">Rente</label><br>
            <input type="number" v-model="interestRate" @input="emitValue" id="interest-rate" class="form-control" name="interest-rate" placeholder="Indtast rente">
            <label for="contract-creation">Kontraktoprettelse</label><br>
            <input type="number" v-model="contractCreation" @input="emitValue" id="contract-creation" class="form-control" name="contract-creation"
                placeholder="Her skal der stå et eller andet beløb">
            <label for="one-time-benefit">Engangsydelse, ex. moms (min. 20% - max. 30%)</label><br>
            <input type="number" v-model="oneTimeBenefit" @input="emitValue" id="one-time-benefit" class="form-control" name="one-time-benefit"
                placeholder="Her skal der stå 20% af en eller anden pris af bilen">
                <label for="deposit">Depositum ex. moms</label><br>
                <input type="number" v-model="deposit" @input="emitValue" id="deposit" class="form-control" name="deposit"
                placeholder="0">
                <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label><br>
            <input type="number" v-model="depreciation" @input="emitValue" id="depreciation" class="form-control" name="depreciation"
                placeholder="0">
                <label for="private-share">Privat andel</label><br>
            <input type="number" v-model="privateShare" @input="emitValue" id="private-share" class="form-control" name="private-share"
                placeholder="Indtast privat andel">
       
        </section>
        <section>
            <h2>Genleasing</h2>
            <label for="residual-value-start">Restværdihæftelse ved kontraktstart</label><br>
            <input type="number" v-model="residualValueStart" @input="emitValue" id="residual-value-start" class="form-control" name="residual-value-start"
                placeholder="Indtast restværdihæftelse">
            <label for="estimated-tax-trade">Skønnet afgiftsmæssig handelspris inkl. moms og afgift</label><br>
            <input type="number" v-model="estimatedTaxTrade" @input="emitValue" id="estimated-tax-trade" class="form-control" name="estimated-tax-trade"
                placeholder="Indtast handelspris inkl. moms og afgift">
        </section>
        <section>
            <h2>Pristjek</h2>
            <label for="cash-price">Kontantpris (istedet for udsalgspris)</label><br>
            <input type="number" v-model="cashPrice" @input="emitValue" id="cash-price" class="form-control" name="cash-price"
                placeholder="Indtast restværdihæftelse">
            <label for="estimated-trade-value">Skønnet handelsværdi i DK (i stedet for kostpris)</label><br>
            <input type="number"  v-model="estimatedTradeValue" @input="emitValue" id="estimated-trade-value" class="form-control" name="estimated-trade-value"
                placeholder="Indtast handelspris inkl. moms og afgift">
        </section>
        
    </section>
</template>

<script>

export default {
  name: 'ContractForm',
  data() {
    return {
      //inputValue: '',  
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
      //køretøj data
      //framenumber: null,
      car: null,
      NyBilCheckbox: null,
      firstRegistrationDate: null,
      estimatedRegistrationFee: null,
      momsdødCheckbox: null,
      afgiftCheckbox: null,
      mileage: null,
      //leasingtager data
      Kundename: null,
      FemOgTyveCheckbox: null,
      selectCustomerType: null,
      selectContractType: null,  
      expectedStartDate: null,
      checkboxSeason: null,
      checkboxImport: null,
    };
  },
    methods: {
        emitValue() {
        const propertyToColumnMappingFirstAPI = {
            // Map your component property names to database column names
            //inputValue: 'inputValue',
            retailPrice: 'Udsalgspris',
            costPrice: 'Kostpris',
            estimatedTradeValue: 'Handelsværdi_DK',
            residualValueStart: 'Restværdihæftelse',
            cashPrice: 'Kontantpris',
            runningTime: 'Løbetid',
            activeRunningTime: 'Kontraktens_Løbetid',
            interestRate: 'Rente',
            contractCreation: 'Kontraktoprettelse',
            oneTimeBenefit: 'Engangsydelse',
            deposit: 'Depositum',
            depreciation: 'Afskrivning',
            privateShare: 'Privat_Andel',
            estimatedTaxTrade: 'Registeringsafgift'
        };

        const propertyToColumnMappingSecondAPI = {
            //framenumber: 'Id_Stelnummer',
            car: 'Køretøj',
            NyBilCheckbox: 'NytKøretøj',
            firstRegistrationDate: 'RegDato',
            estimatedRegistrationFee: 'Nypris',
            momsdødCheckbox: 'Momsdød',
            afgiftCheckbox: 'Fuld_Afgift',
            mileage: 'Kilometerafstand'
        };

        const propertyToColumnMappingThirdAPI = {
            Kundename: 'Navn',
            FemOgTyveCheckbox: 'Over_25',
            selectCustomerType: 'Kundetype',
            selectContractType: 'Kontrakttype',  
            expectedStartDate: 'Tilbudsdato',
            checkboxSeason: 'Sæson',
            checkboxImport: 'Import'
        };

        const formDataFirstAPI = {};
        const formDataSecondAPI = {};
        const formDataThirdAPI = {};

        for (const property in propertyToColumnMappingFirstAPI) {
            formDataFirstAPI[propertyToColumnMappingFirstAPI[property]] = this[property];
            }

        for (const property in propertyToColumnMappingSecondAPI) {
            formDataSecondAPI[propertyToColumnMappingSecondAPI[property]] = this[property];
            }

        for (const property in propertyToColumnMappingThirdAPI) {
            formDataThirdAPI[propertyToColumnMappingThirdAPI[property]] = this[property];
            }

            // Emit the form data for the first API call
            this.$emit('input-updated', formDataFirstAPI, formDataSecondAPI, formDataThirdAPI);
        
        },
            // Store the form data in the state to be sent to the server
            //this.$parent.state.formData = formData;

            selectDropdownValue(type, value) {
            console.log(`Selected ${type}:`, value);
            this[type] = value; // Store the selected value
            },

            selectContractType(value) {
            this.selectDropdownValue('selectContractType', value);
            },

            selectCustomerType(value) {
            this.selectDropdownValue('selectCustomerType', value);
        },
    
  },
};
</script>

<style>
.contractForm .dropdown {
    margin-bottom: 30px;
}

.contractForm #dropdownMenuButton {
    background-color: var(--light-grey);
    color: var(--dark-grey);
    width: 100%;
    text-align: left;
    border: 1px var(--medium-grey) solid;
}

.contractForm .dropdown-toggle::after {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.contractForm .dropdown-menu {
    width: 100%;
}

.contractForm h1,
h2 {
    padding-top: 30px;
}

.contractForm label,
.contractForm p {
    padding-top: 20px;
    margin-bottom: 5px;
}

.contractForm input[type="text"],
.contractForm input[type="number"], 
.contractForm input[type="date"] {
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
    padding-top: 15px;
    margin-bottom: 5px;
}

.contract-checkbox label {
    margin: 0; 
    padding: 0; 
}

</style>