<template>
    <section class="contractForm col-7">
        <h1>Kontrakt</h1>
        <input v-model="inputValue" @input="emitValue" placeholder="bip bip" type="text">
        <section></section>
        <p>Kundetype</p>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Vælg kundetype
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Privat</a>
                <a class="dropdown-item" href="#">Erhverv</a>
                <a class="dropdown-item" href="#">Split</a>
            </div>
        </div>

        <p>Kontrakttype</p>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Vælg kontrakttype
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Nytegning</a>
                <a class="dropdown-item" href="#">Genleasing</a>
            </div>
        </div>

        <div class="contract-checkbox">
            <label for="checkboxSeason">Sæson</label>
            <input type="checkbox" id="checkboxSeason" name="checkbox" value="1">
        </div>

        <div class="contract-checkbox">
            <label for="checkboxImport">Import</label>
            <input type="checkbox" id="checkboxImport" name="checkbox" value="1">
        </div>

        <section>
            <h2>Leasingtager</h2>
            <label for="name">Navn</label><br>
            <input type="text" id="name" class="form-control" name="name" placeholder="Indtast kundens navn">
            <div class="contract-checkbox">
                <label for="demoCheckbox">Kunden er under 25 år</label>
                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1">
            </div>
            <label for="expectedStartDate">Forventet startdato</label><br>
            <input type="date" id="expectedStartDate" name="expectedStartDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" /><br>
        </section>
        <section>
            <h2>Bildata</h2>
            <div class="contract-checkbox">
                <label for="demoCheckbox">Ny bil</label>
                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1">
            </div>
            <label for="car">Køretøj</label><br>
            <input type="text" id="car" class="form-control" name="car" placeholder="Indtast køretøj">
            <label for="framenumber">Stelnummer</label><br>
            <input type="number" id="framenumber" class="form-control" name="framenumber" placeholder="Indtast stelnummer">
            <label for="firstRegistrationDate">1. indregistreringsdato</label><br>
            <input type="date" id="firstRegistrationDate" name="firstRegistrationDate" value="2018-07-22" min="2018-01-01"
                max="2018-12-31" /><br>
            <label for="mileage">Kilometerstand</label><br>
            <input type="number" id="mileage" class="form-control" name="mileage" placeholder="Indtast kilometerstand">
            <div class="contract-checkbox">
                <label for="demoCheckbox">Fuld afgift betalt</label>
                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1">
            </div>
            <div class="contract-checkbox">
                <label for="demoCheckbox">Momsdød</label>
                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1">
            </div>
            <label for="retailPrice">Udsalgspris</label><br>
            <input type="number" id="retailPrice" class="form-control" name="retailPrice" placeholder="Indtast Udsalgspris">
            <label for="costPrice">Kostpris</label><br>
            <input type="number" id="costPrice" class="form-control" name="costPrice" placeholder="Indtast kostpris">
            <label for="estimatedRegistrationFee">Anslået registreringsafgift</label><br>
            <input type="number" id="estimatedRegistrationFee" class="form-control" name="estimatedRegistrationFee"
                placeholder="Indtast anslået registreringsafgift">
            <label for="newPrice">Nypris inkl. moms og afgift</label><br>
            <input type="number" id="newPrice" class="form-control" name="newPrice"
                placeholder="Indtast nypris inkl. moms og afgift">
        </section>
        <section>
            <h2>Kontraktoplysninger</h2>
            <label for="running-time">Løbetid (i måneder)</label><br>
            <input type="number" id="running-time" class="form-control" name="run-time"
                placeholder="Indtast løbetid i måneder">
            <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label><br>
            <input type="number" id="active-running-time" class="form-control" name="active-running-time"
                placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">
            <label for="interest-rate">Rente</label><br>
            <input type="number" id="interest-rate" class="form-control" name="interest-rate" placeholder="Indtast rente">
            <label for="contract-creation">Kontraktoprettelse</label><br>
            <input type="number" id="contract-creation" class="form-control" name="contract-creation"
                placeholder="Her skal der stå et eller andet beløb">
            <label for="one-time-benefit">Engangsydelse, ex. moms (min. 20% - max. 30%)</label><br>
            <input type="number" id="one-time-benefit" class="form-control" name="one-time-benefit"
                placeholder="Her skal der stå 20% af en eller anden pris af bilen">
                <label for="deposit">Depositum ex. moms</label><br>
            <input type="number" id="deposit" class="form-control" name="deposit"
                placeholder="0">
                <label for="deposit">Depositum ex. moms</label><br>
            <input type="number" id="deposit" class="form-control" name="deposit"
                placeholder="0">
                <label for="depreciation">Afskrivning (anbefalet min. 15% p.a.)</label><br>
            <input type="number" id="depreciation" class="form-control" name="depreciation"
                placeholder="0">
                <label for="private-share">Privat andel</label><br>
            <input type="number" id="private-share" class="form-control" name="private-share"
                placeholder="Indtast privat andel">
       
        </section>
        <section>
            <h2>Genleasing</h2>
            <label for="residual-value-start">Restværdihæftelse ved kontraktstart</label><br>
            <input type="number" id="residual-value-start" class="form-control" name="residual-value-start"
                placeholder="Indtast restværdihæftelse">
            <label for="estimated-tax-trade">Skønnet afgiftsmæssig handelspris inkl. moms og afgift</label><br>
            <input type="number" id="estimated-tax-trade" class="form-control" name="estimated-tax-trade"
                placeholder="Indtast handelspris inkl. moms og afgift">
        </section>
        <section>
            <h2>Pristjek</h2>
            <label for="cash-price">Kontantpris (istedet for udsalgspris)</label><br>
            <input type="number" id="cash-price" class="form-control" name="cash-price"
                placeholder="Indtast restværdihæftelse">
            <label for="estimated-trade-value">Skønnet handelsværdi i DK (i stedet for kostpris)</label><br>
            <input type="number" id="estimated-trade-value" class="form-control" name="estimated-trade-value"
                placeholder="Indtast handelspris inkl. moms og afgift">
        </section>
        
    </section>
</template>

<script>
export default {
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
}
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