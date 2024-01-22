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
            <!-- INPUT VALIDERING: Tjekker om kundetypen er valgt -->
            <!-- <span v-if="!isFormValid().customerType" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kunde typen skal vælges</span> -->
            

            <label for="contractType">Kontrakttype</label>
            <select name="contractType" v-model="formData.customer.contractType" @input="emitValue">
                <option value="" disabled selected hidden>Vælg kontrakttype</option>
                <option value="Nytegning">Nytegning</option>
                <option value="Genleasing">Genleasing</option>
                <option value="Pristjek">Pristjek</option>
                <option value="Stilstand">Stilstand</option>
            </select>
            <!-- INPUT VALIDERING: Tjekker om kontrakttypen er valgt -->
            <!-- <span v-if="!isFormValid().contractType" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kontrakttypen skal vælges</span> -->

            <!-- Sæson vises ikke hvis kundetype er 'Split' eller hvis kontrakttypen er 'Stilstand' -->
            <div v-show="formData.customer.customerType == 'Privat' || formData.customer.customerType == 'Erhverv' || formData.customer.contractType == 'Nytegning' || formData.customer.contractType == 'Genleasing' || formData.customer.contractType == 'Pristjek'">
                <div v-show="formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'"
                    class="contract-checkbox">
                    <label for="checkboxSeason">Sæson</label>
                    <input v-model="formData.customer.season" @input="emitValue" type="checkbox" id="checkboxSeason" name="checkbox">
                </div>
            </div>

            <!-- Hvis kontrakttype "Nytegning" er valgt - vis dette -->
            <div v-show="formData.customer.contractType == 'Nytegning'" class="contract-checkbox">
                <label for="checkboxImport">Import</label>
                <input v-model="formData.customer.import" @input="emitValue" type="checkbox" id="checkboxImport" name="checkbox">
            </div>
        </section>

        <section>
            <h3>Leasingtager</h3>
            
            <!-- Hvis kontrakttype "Genleasing" er valgt - vis dette -->
            <div v-show="formData.customer.contractType == 'Genleasing'">
            <label for="customerId">Kunde Id</label>
            <input v-model="formData.customerId" @input="emitValue" type="text" id="customerId" class="form-control" name="customerId" placeholder="Indtast kundens id">
            <button @click="fetchCustomerData">Søg</button>
            </div>

            <label for="name">Navn</label>
            <input v-model="formData.customer.name" @input="emitValue" type="text" id="name" class="form-control" name="name"
                placeholder="Indtast kundens navn">
                <!-- INPUT VALIDERING: Tjekker om kontrakttypen er valgt -->
                <!-- <span v-if="!isFormValid().customerName" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kunde navn skal udfyldes</span> -->

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

            <div v-show="formData.customer.contractType != 'Genleasing'" class="contract-checkbox">
                <label for="checkboxNewVehicle">Nyt køretøj</label>
                <input v-model="formData.vehicle.newVehicle" @input="emitValue" type="checkbox" id="checkboxNewVehicle" name="checkbox" value="1">
            </div>

            <!-- Hvis kontrakttype ikke er "Stilstand" - vis dette -->
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
            <!-- INPUT VALIDERING: Tjekker om Køretøjs Type er valgt -->
            <!-- <span v-if="!isFormValid().vehicleType" class="warning"><font-awesome-icon icon="circle-exclamation" /> Type køretøj skal vælges</span> -->

            <label for="vehicle">Køretøj</label>
            <input v-model="formData.vehicle.vehicle" @input="emitValue" type="text" id="vehicle" class="form-control" name="vehicle"
                placeholder="Indtast køretøj">
                <!-- INPUT VALIDERING: Tjekker om Køretøj er indtastet -->
                <!-- <span v-if="!isFormValid().vehicle" class="warning"><font-awesome-icon icon="circle-exclamation" /> Køretøj skal udfyldes</span> -->

            <label for="framenumber">Stelnummer</label>
            <input v-model="formData.vehicle.frameNumber" @input="emitValue" type="number" id="framenumber" class="form-control"
                name="framenumber" placeholder="Indtast stelnummer">

            <!-- Vises hvis det ikke er et nyt køretøj -->
            <div v-show="formData.vehicle.newVehicle == false">
                <label for="firstRegistrationDate">1. Indregistreringsdato</label>
                <input v-model="formData.vehicle.firstRegistrationDate" @input="checkDate" type="date" id="firstRegistrationDate"
                    name="firstRegistrationDate"/>
            </div>

            <label for="mileage">Kilometerstand</label>
            <input v-model="formData.vehicle.mileage" @input="emitValue" type="number" id="mileage" class="form-control"
                name="mileage" placeholder="Indtast kilometerstand">

            <!-- Vises hvis kontraktype ikke er "Stilstand"-->
            <div v-show="formData.customer.contractType != 'Stilstand'">
                <!-- *Hvis kontrakt type er "Nytegning" og import er true vises dette -->
                <div v-if="formData.customer.contractType == 'Nytegning' && formData.customer.import == true">
                    <label for="salePrice">Udsalgspris i €</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris i €">
                        <!-- INPUT VALIDERING: Tjekker om Udsalgspris er indtastet -->
                        <!-- <span v-if="!isFormValid().salePrice" class="warning"><font-awesome-icon icon="circle-exclamation" /> Udsalgspris i € skal udfyldes</span> -->
                </div>
                <!-- *Eller vises dette -->
                <div v-else>
                    <label for="salePrice">Udsalgspris</label>
                    <input v-model="formData.contractValues.salePrice" @input="emitValue" type="number" id="salePrice" class="form-control"
                        name="salePrice" placeholder="Indtast udsalgspris">
                        <!-- INPUT VALIDERING: Tjekker om Udsalgspris er indtastet -->
                        <!-- <span v-if="!isFormValid().salePrice" class="warning"><font-awesome-icon icon="circle-exclamation" /> Udsalgspris skal udfyldes</span> -->
                </div>
                
            </div>
            <!-- Vises hvis kundetypen er "Split" eller kontrakt typen er "Nytegning" -->
            <div v-show="formData.customer.customerType == 'Split' || formData.customer.contractType == 'Nytegning'">
                <!-- *Hvis Import er true vises dette -->
                <div v-if="formData.customer.import == true">
                    <label for="cost">Kostpris i €</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris i €">
                        <!-- INPUT VALIDERING: Tjekker om Kostpris er indtastet -->
                        <!-- <span v-if="!isFormValid().cost" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kostpris i € skal udfyldes</span> -->
                </div>
                <!-- *Ellers vises dette -->
                <div v-else>
                    <label for="cost">Kostpris</label>
                    <input v-model="formData.contractValues.cost" @input="emitValue" type="number" id="cost" class="form-control"
                        name="cost" placeholder="Indtast kostpris">
                        <!-- INPUT VALIDERING: Tjekker om Kostpris er indtastet -->
                        <!-- <span v-if="!isFormValid().cost" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kostpris skal udfyldes</span> -->
                </div>
            </div>
            
            <!-- Vises hvis kontrakttypen er "Genleasing" -->
            <div v-show="formData.customer.contractType == 'Genleasing'">
                <label for="estimatedMarketValue">Skønnet handelsværdi i DK</label>
                <input v-model="formData.contractValues.estimatedMarketValue" @input="emitValue" type="number" id="estimatedMarketValue"
                    class="form-control" name="estimatedMarketValue"
                    placeholder="Indtast handelsværdi inkl. moms og afgift">
            </div>

            <!-- Vises hvis kontrakttypen er "Genleasing" eller Stilstand -->
            <div v-show="formData.customer.contractType == 'Genleasing' || formData.customer.contractType == 'Stilstand'">
                <label for="residualValue">Restværdihæftelse ved kontraktstart</label>
                <input v-model="formData.contractValues.residualValue" @input="emitValue" type="number" id="residualValue"
                    class="form-control" name="residualValue" placeholder="Indtast restværdihæftelse">
                    <!-- <span v-if="!isFormValid().residualValue" class="warning"><font-awesome-icon icon="circle-exclamation" /> Restværdihæftelse skal udfyldes</span> -->
            </div>

            <!-- Vises hvis kontrakttypen er "Pristjek" -->
            <div v-show="formData.customer.contractType == 'Pristjek'">
                <label for="cashPrice">Kontantpris (i stedet for udsalgspris)</label>
                <input v-model="formData.contractValues.cashPrice" @input="emitValue" type="number" id="cashPrice" class="form-control"
                    name="cashPrice" placeholder="Indtast kontantpris">
                    <!-- INPUT VALIDERING: Tjekker om Kontantpris er indtastet -->
                    <!-- <span v-if="!isFormValid().cashPrice" class="warning"><font-awesome-icon icon="circle-exclamation" /> Kontantpris skal udfyldes</span> -->
            </div>

            <!-- Vises hvis kontrakttypen ikke er "Stilstand" og Fuld afgift ikke er betalt-->
            <div v-show="formData.customer.contractType != 'Stilstand' && formData.customer.contractType != '' && formData.vehicle.levyPaid == false">
                <label for="registrationFee">Anslået registreringsafgift</label>
                <input v-model="formData.contractValues.registrationFee" @input="emitValue" type="number" id="registrationFee"
                    class="form-control" name="registrationFee" placeholder="Indtast anslået registreringsafgift">
            </div>
            <!-- Viser 'Nypris inkl. moms og afgift' hvis showInitialPrice er true, kundetypen ikke er 'Split' og kontrakttypen ikke er 'Stilstand' -->
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
                <!-- INPUT VALIDERING: Tjekker om løbetid er indtastet -->
                <!-- <span v-if="!isFormValid().runningTime" class="warning"><font-awesome-icon icon="circle-exclamation" /> Løbetid skal udfyldes</span> -->

            <!-- Vises hvis kundetype ikke er false og ikke er split og kontrakttypen ikke er Stilstand-->
            <div v-show="formData.customer.season != false && formData.customer.customerType != 'Split' && formData.customer.contractType != 'Stilstand'">
                <label for="active-running-time">Aktiv periode i kontraktens løbetid (i måneder)</label>
                <input v-model="formData.contractValues.activeRunningTime" @input="emitValue" type="number" id="active-running-time"
                    class="form-control" name="active-running-time"
                    placeholder="Indtast aktiv periode i kontraktens løbetid i måneder">
                    <!-- INPUT VALIDERING: Tjekker om Aktiv periode er indstastet -->
                    <!-- <span v-if="!isFormValid().activeRunningTime" class="warning"><font-awesome-icon icon="circle-exclamation" /> Aktiv periode skal udfyldes</span> -->
            </div>

            <label for="interest-rate">Rente</label>
            <input v-model="formData.contractValues.interestRate" @input="emitValue" type="number" id="interest-rate" class="form-control"
                name="interest-rate" placeholder="8.5%" min="0" max="100">

            <label for="contract-creation">Kontraktoprettelse</label>
            <input v-model="formData.contractValues.contractCreation" @input="emitValue" type="number" id="contract-creation"
                class="form-control" name="contract-creation" placeholder="0">

            <!-- *Hvis kontrakttype ikke er Stilstand vises dette -->
            <div v-if="formData.customer.contractType != 'Stilstand'">
                <label for="one-time-benefit">Engangsydelse i procent, ex. moms (min. 20% - max. 30%)</label>
                <input v-model="formData.contractValues.oneTimeBenefit" @input="emitValue" type="number" id="one-time-benefit"
                    class="form-control" name="one-time-benefit" placeholder="20%" min="20" max="30">
            </div>
            <!-- *Ellers vises dette -->
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
        <button @click.prevent="sendData" class="makeContract">Lav tilbudskontrakt</button>
        <!-- <button @click.prevent="sendData" class="makeContract" :disabled="!isFormValid()">Lav tilbudskontrakt</button> -->
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

        // Pinia
        const router = useRouter();
        const myStore = useMyStore();

        // Startværdier for formData
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
        const showInitialPrice = ref(false);

        const isFormValid = () => {
            const customerTypeValid = formData.value.customer.customerType && (formData.value.customer.customerType === 'Privat' || formData.value.customer.customerType === 'Erhverv' || formData.value.customer.customerType === 'Split');
            const contractTypeValid = formData.value.customer.contractType && (formData.value.customer.contractType === 'Nytegning' || formData.value.customer.contractType === 'Genleasing' || formData.value.customer.contractType === 'Pristjek' || formData.value.customer.contractType === 'Stilstand');
            const customerNameValid = formData.value.customer.name && formData.value.customer.name.length >= 3;
            const vehicleValid = formData.value.vehicle.vehicle && formData.value.vehicle.vehicle.length >= 3;
            const vehicleTypeValid = formData.value.vehicle.vehicleType && (formData.value.vehicle.vehicleType === 'Motorcykel' || formData.value.vehicle.vehicleType === 'Bil');
            const salePriceValid = formData.value.contractValues.salePrice;
            const costValid = formData.value.contractValues.cost;
            const residualValueValid = formData.value.contractValues.residualValue;
            const cashPriceValid = formData.value.contractValues.cashPrice;
            const runningTimeValid = formData.value.contractValues.runningTime;
            const activeRunningTimeValid = formData.value.contractValues.activeRunningTime;

            const validationResults = {
                customerType: customerTypeValid,
                contractType: contractTypeValid,
                customerName: customerNameValid,
                vehicle: vehicleValid,
                vehicleType: vehicleTypeValid,
                salePrice: salePriceValid,
                cost: costValid,
                residualValue: residualValueValid,
                cashPrice: cashPriceValid,
                runningTime:runningTimeValid,
                activeRunningTime: activeRunningTimeValid,
            };

        return buttonClicked.value ? validationResults : { customerName: true, vehicle: true, vehicleType: true, customerType: true, contractType: true, salePrice: true, cost: true, residualValue: true, cashPrice: true, runningTime: true, activeRunningTime: true };
        };

        // Tjekker hvis 1.Indregistreringsdato er mere end 35 måneder siden
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
            // Pinia
            myStore.setData(formData.value);
            // Validering af input felter
            buttonClicked.value = true;
            // const validationResults = isFormValid();
            // if (!validationResults.customerType || !validationResults.contractType || !validationResults.customerName || !validationResults.vehicle ||
            //     !validationResults.vehicleType || !validationResults.salePrice || !validationResults.cost || !validationResults.residualValue ||
            //     !validationResults.cashPrice || !validationResults.runningTime || !validationResults.activeRunningTime){
            //     console.error('En eller flere felter er ikke udfyldt korrekt!');
            //     return;
            // }

            try {
                //  Opdaterer information i databasen
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
                    // Sender customer til det 1. API-endpoint og gemer den autoinkrementerede ID fra svaret
                    const responseFirstAPI = await axios.post('http://localhost:5174/api/vehicle/add', formData.value.vehicle);
                    const vehicleId = responseFirstAPI.data.insertId;

                    // Opdater formData contractValues med den opnåede veichle-ID, sender contractValues til det 2. API-endpoint og gem den autoinkrementerede ID fra svaret
                    formData.value.contractValues.Id_Køretøjdata = vehicleId;
                    const responseSecondAPI = await axios.post('http://localhost:5174/api/contractValues/add', formData.value.contractValues);
                    const contractValuesId = responseSecondAPI.data.insertId;
                        
                    // Opdater formData customer med den opnåede contractValues-ID, sender veichle til det 3. API-endpoint
                    formData.value.customer.Id_Kontraktværdier = contractValuesId;
                    const responseThirdAPI = await axios.post('http://localhost:5174/api/customer/add', formData.value.customer);
                    // Logger respons fra API end-points
                    console.log('Response from API 1:', responseFirstAPI.data);
                    console.log('Response from API 2:', responseSecondAPI.data);
                    console.log('Response from API 3:', responseThirdAPI.data);
                }

                // Hvis alle inputs er som de skal, push til /contract-preview
                if (isFormValid()) {
                    router.push('/contract-preview');
                }

            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

        // Metode til at fetch kundedata ud fra kunde ID
        const fetchCustomerData = async () => {
        try {
                // Tjekker om searchCustomerId ikke er tomt
                if (!formData.value.customerId) {
                    console.error('Please enter a Customer ID');
                    return;
                }

                // Sender en forespørgel til serveren om at fetche data baseret på det indtastede kunde ID
                const response = await axios.get(`http://localhost:5174/api/customer/${customerId.value}`);
            
                // Tjekker om reponse indeholder data
                if (response.data.length > 0) {
                    const fetchedData = response.data[0];

                    formData.value.customerId = formData.value.customerId;
                    // Opdaterer formData med det fetchede data fra 'leasingtager' tabellen
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
        // Kaldes hver gang input ændres og sender formData til HomeView.vue og videre til Calculation.vue
        emitValue() {
            this.$emit('input-updated', this.formData);
        },
    },
    // Kalder emitValue når komponentet bliver mounted
    mounted() {
        this.emitValue();
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
  background-color: #ffdddd;
  color: #8b0000;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
}
</style>